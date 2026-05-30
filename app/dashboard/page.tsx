"use client";

import { useState } from "react";

export default function Dashboard() {
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
const [matchScore, setMatchScore] = useState<number | null>(null);
const [matchedSkills, setMatchedSkills] = useState<string[]>([]);
const [missingSkills, setMissingSkills] = useState<string[]>([]);
const [recommendations, setRecommendations] = useState<string[]>([]);
  const analyzeResume = async () => {
    if (!resumeFile) {
      alert("Please upload a resume first.");
      return;
    }

    try {
      const formData = new FormData();
formData.append("resume", resumeFile);
formData.append("jobDescription", jobDescription);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
        setScore(data.score);
        setFeedback(data.feedback);
      setMatchScore(data.matchScore);
setMatchedSkills(data.matchedSkills || []);
setMissingSkills(data.missingSkills || []);
setRecommendations(data.recommendations || []);

      if (!response.ok) {
        alert(data.error || "Analysis failed");
        return;
      }

    } catch (error) {
      console.error(error);
      alert("Resume analysis failed.");
    }
  };

  const strengths = feedback.filter(
    (item) => !item.startsWith("Add")
  );

  const improvements = feedback.filter(
    (item) => item.startsWith("Add")
  );

  const scoreColor =
    score && score >= 80
      ? "#22c55e"
      : score && score >= 60
      ? "#eab308"
      : "#ef4444";

  return (
    <main className="min-h-screen bg-black text-white">

      {/* Header */}
      <div className="border-b border-gray-800 px-8 py-6">
        <h1 className="text-3xl font-bold text-blue-500">
          CareerSync Dashboard
        </h1>
      </div>
      <p className="text-gray-400 mt-2 px-10">
  Analyze resumes and improve ATS performance.
</p>

      <div className="w-full px-8">

        {/* TOP ROW */}
        <div className="grid grid-cols-12 gap-8">
          

          {/* ATS CARD */}
<div className="col-span-5 bg-[#07142d] border border-gray-800 rounded-3xl p-8 flex flex-col">    
          <h2 className="text-2xl font-bold mb-8">
              ATS Score 
            </h2>

            <div className="flex flex-col items-center">

              <div className="relative w-56 h-56">

                <svg
                  className="w-56 h-56 -rotate-90"
                  viewBox="0 0 200 200"
                >
                  <circle
                    cx="100"
                    cy="100"
                    r="85"
                    stroke="#1f2937"
                    strokeWidth="12"
                    fill="none"
                  />

                  <circle
                    cx="100"
                    cy="100"
                    r="85"
                    stroke={scoreColor}
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="534"
                    strokeDashoffset={
                      534 - ((score || 0) / 100) * 534
                    }
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
<div className="text-5xl font-bold">
  {score === null ? "--" : `${score}%`}
</div>

<div
  className={`mt-2 text-lg font-medium ${
    score === null
      ? "text-gray-400"
      : score >= 80
      ? "text-green-400"
      : score >= 60
      ? "text-yellow-400"
      : "text-red-400"
  }`}
>
  {score === null
    ? "Upload Resume"
    : score >= 80
    ? "Excellent"
    : score >= 60
    ? "Good"
    : "Needs Work"}
</div>
<p className="text-sm text-gray-500 mt-3">
  {score === null
    ? "Awaiting Analysis"
    : score >= 85
    ? "Strong ATS Resume"
    : score >= 70
    ? "Good ATS Resume"
    : "Needs Improvement"}
</p>
                

                </div>

              </div>

              <p className="text-center text-gray-400 mt-3 max-w-sm">
                {score
                  ? "Your resume has a strong chance of passing ATS screening."
                  : "Upload a resume to generate your ATS score."}
              </p>

            </div>

          </div>

          {/* UPLOAD CARD */}
<div className="col-span-7 bg-[#07142d] border border-gray-800 rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-8">
              Upload Resume
            </h2>

<div className="border-2 border-dashed border-blue-500/50 rounded-2xl py-6 px-4 text-center bg-blue-950/20">
  <p className="text-lg font-medium text-white">
    {resumeFile
      ? resumeFile.name
      : "Drop your resume here"}
  </p>

  {resumeFile && (
  <p className="text-sm text-green-400">
    Selected Resume
  </p>
)}

         </div>

<label className="inline-block mt-4 cursor-pointer bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-white">
  Upload Resume
  <input
    type="file"
    accept=".txt,.docx,.pdf"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file) setResumeFile(file);
    }}
    className="hidden"
  />
</label>

<textarea
  placeholder="Paste Job Description here..."
  value={jobDescription}
  onChange={(e) => setJobDescription(e.target.value)}
  className="w-full mt-6 h-28 bg-gray-800 border border-gray-700 rounded-xl p-4 text-white resize-none"
></textarea>

<button
  onClick={analyzeResume}
  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 transition py-3 rounded-xl font-semibold text-lg"
>
  Analyze Resume
</button>

</div>

</div>     
      {matchScore !== null && (
  <div className="mt-8 bg-[#07142d] border border-gray-800 rounded-3xl p-8">
    <h2 className="text-2xl font-bold text-blue-400 mb-6">
      Job Description Match
    </h2>

    <div className="text-5xl font-bold text-green-400 mb-8">
      {matchScore}%
    </div>

    <h3 className="text-green-400 font-semibold mb-3">
      Matched Skills
    </h3>

    <div className="flex flex-wrap gap-3 mb-8">
      {matchedSkills.map((skill) => (
        <span
          key={skill}
          className="px-3 py-1 bg-green-900 text-green-300 rounded-lg"
        >
          {skill}
        </span>
      ))}
    </div>

    <h3 className="text-red-400 font-semibold mb-3">
      Missing Skills
    </h3>

    <div className="flex flex-wrap gap-3">
      {missingSkills.map((skill) => (
        <span
          key={skill}
          className="px-3 py-1 bg-red-900 text-red-300 rounded-lg"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
)}

{recommendations.length > 0 && (
  <div className="mt-8 bg-[#07142d] border border-gray-800 rounded-3xl p-8">
    <h2 className="text-2xl font-bold text-yellow-400 mb-6">
      Job Match Recommendations
    </h2>

    <div className="space-y-3">
      {recommendations.map((item, index) => (
        <div
          key={index}
          className="bg-gray-800 rounded-xl p-4"
        >
          ⚠️ {item}
        </div>
      ))}
    </div>
  </div>
)}

{score !== null && (
  <div className="grid md:grid-cols-2 gap-8 mt-8">

    {/* What To Improve */}
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-yellow-400 mb-6">
        What To Improve
      </h2>

      {improvements.length === 0 ? (
        <div className="bg-gray-800 rounded-xl p-4 text-green-400">
          ✅ No major improvements needed
        </div>
      ) : (
        <div className="space-y-4">
          {improvements.map((item, index) => (
            <div
              key={index}
              className="bg-gray-800 border border-yellow-600 rounded-xl p-4"
            >
              ⚠️ {item}
            </div>
          ))}
        </div>
      )}
    </div>

    {/* What's Strong */}
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-green-400 mb-6">
        What's Strong
      </h2>

      <div className="space-y-4">
        {strengths.map((item, index) => (
          <div
            key={index}
            className="bg-green-950 border border-green-700 rounded-xl p-4"
          >
            ✅ {item}
          </div>
        ))}
      </div>
    </div>

  </div>
)}
      </div>
    </main>
  );
}