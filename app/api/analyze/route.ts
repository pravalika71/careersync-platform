import { NextResponse } from "next/server";
import mammoth from "mammoth";
const skills = [
"java",
"python",
"sql",
"react",
"javascript",
"html",
"css",
"dsa",
"node",
"next.js",
"git",
"tailwind",
];

export async function POST(req: Request) {
try {
const formData = await req.formData();


const file = formData.get("resume") as File;
const jobDescription =
  (formData.get("jobDescription") as string) || "";

if (!file) {
  return NextResponse.json(
    { error: "No file uploaded" },
    { status: 400 }
  );
}

const bytes = await file.arrayBuffer();
const buffer = Buffer.from(bytes);

let resumeText = "";

// DOCX
if (
  file.type ===
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
) {
  const result = await mammoth.extractRawText({
    buffer,
  });

  resumeText = result.value;
}

// PDF
// PDF
else if (file.type === "application/pdf") {
  return NextResponse.json(
    {
      error: "PDF uploads are temporarily unavailable. Please upload a DOCX file.",
    },
    { status: 400 }
  );
}
 
const lowerText = resumeText.toLowerCase();
const lowerJD = jobDescription.toLowerCase();

let score = 0;
const foundSkills: string[] = [];
const feedback: string[] = [];
const matchedSkills: string[] = [];
const missingSkills: string[] = [];
const recommendations: string[] = [];
console.log("JD:", lowerJD);
console.log("Matched:", matchedSkills);
console.log("Missing:", missingSkills);
skills.forEach((skill) => {
  if (lowerText.includes(skill)) {
    foundSkills.push(skill);
  }
});
skills.forEach((skill) => {
  if (lowerJD.includes(skill)) {
    if (lowerText.includes(skill)) {
      matchedSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  }
});

// Positive feedback
if (foundSkills.length >= 5) {
  feedback.push("Strong technical skill coverage");
}

if (
  lowerText.includes("experience") ||
  lowerText.includes("internship")
) {
  feedback.push(
    "Relevant internship or work experience found"
  );
}

if (lowerText.includes("projects")) {
  feedback.push("Well-defined projects section");
}

if (lowerText.includes("github")) {
  feedback.push("GitHub profile included");
}

if (lowerText.includes("linkedin")) {
  feedback.push("LinkedIn profile included");
}

// Skills (max 35)
score += Math.min(foundSkills.length * 3, 35);

// Projects
if (lowerText.includes("projects")) {
  score += 15;
} else {
  feedback.push("Add a Projects section");
}

// Experience
if (
  lowerText.includes("experience") ||
  lowerText.includes("internship")
) {
  score += 15;
} else {
  feedback.push(
    "Add internship or work experience"
  );
}

// Education
if (lowerText.includes("education")) {
  score += 10;
} else {
  feedback.push("Add an Education section");
}

// Certifications
if (lowerText.includes("certifications")) {
  score += 5;
} else {
  feedback.push("Add certifications");
}

// Achievements
if (lowerText.includes("achievements")) {
  score += 5;
} else {
  feedback.push("Add achievements section");
}

// GitHub
if (lowerText.includes("github")) {
  score += 5;
}

// LinkedIn
if (lowerText.includes("linkedin")) {
  score += 5;
}

// Cap score
score = Math.min(score, 95);

if (score >= 90) {
  feedback.unshift(
    "Excellent ATS resume structure"
  );
} else if (score >= 75) {
  feedback.unshift(
    "Good ATS compatibility"
  );
} else if (score >= 60) {
  feedback.unshift(
    "Fair ATS compatibility"
  );
} else {
  feedback.unshift(
    "Resume needs ATS improvements"
  );
}
if (jobDescription) {
  skills.forEach((skill) => {
    const inResume = lowerText.includes(skill);
    const inJD = jobDescription.includes(skill);

    if (inJD && inResume) {
      matchedSkills.push(skill);
    }

    if (inJD && !inResume) {
      missingSkills.push(skill);
    }
  });
}

let matchScore = 0;

if (matchedSkills.length + missingSkills.length > 0) {
  matchScore = Math.round(
    (matchedSkills.length /
      (matchedSkills.length + missingSkills.length)) *
      100
  );
}
missingSkills.forEach((skill) => {
  switch (skill) {
    case "node":
      recommendations.push(
        "Add Node.js skills or backend projects"
      );
      break;

    case "react":
      recommendations.push(
        "Highlight React development experience"
      );
      break;

    case "git":
      recommendations.push(
        "Mention Git/GitHub workflow experience"
      );
      break;

    case "sql":
      recommendations.push(
        "Include database or SQL project experience"
      );
      break;

    default:
      recommendations.push(
        `Add ${skill} related skills or projects`
      );
  }
});
return NextResponse.json({
  score,
  foundSkills,
  feedback,
  matchScore,
  matchedSkills,
  missingSkills,
  recommendations,
});


} catch (error) {
console.log(error);


return NextResponse.json(
  { error: "Resume analysis failed" },
  { status: 500 }
);


}
}
