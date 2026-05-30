import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-12 py-6 border-b border-gray-800">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-blue-500 bg-clip-text text-transparent">
          CareerSync
        </h1>
<div className="flex gap-8 items-center text-lg">
  <Link href="/dashboard" className="hover:text-blue-400">
    Dashboard
  </Link>

  <Link
    href="/dashboard"
    className="bg-blue-600 px-6 py-3 rounded-xl hover:bg-blue-700"
  >
    Get Started
  </Link>
</div>
        
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-32 px-6">

        <h1 className="text-7xl font-extrabold mb-8 bg-gradient-to-r from-white to-blue-500 bg-clip-text text-transparent">
  AI-Powered Job Matching Platform
</h1>

<p className="text-gray-400 text-2xl max-w-3xl mb-10">
  Find internships and jobs smarter with AI-powered resume
  analysis and skill matching.
</p>

<div className="flex gap-6">

  <Link
    href="/dashboard"
    className="bg-blue-600 px-8 py-4 rounded-xl text-xl hover:bg-blue-700 transition"
  >
    Get Started
  </Link>
<Link
  href="/dashboard"
  className="border border-gray-700 px-8 py-4 rounded-xl text-xl hover:border-blue-500 transition"
>
  Analyze Resume
</Link>
  
</div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8 px-12 pb-20">

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-blue-500 mb-4">
            AI Resume Analysis
          </h2>

          <p className="text-gray-400">
            Analyze resumes instantly with ATS scoring and
            improvement suggestions.
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-blue-500 mb-4">
            Smart Job Matching
          </h2>

          <p className="text-gray-400">
            Match candidates with jobs based on skills,
            experience, and interests.
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-blue-500 mb-4">
            Career Dashboard
          </h2>

          <p className="text-gray-400">
            Track applications, improve resumes, and
            discover new opportunities.
          </p>
        </div>

      </section>

    </main>
  );
}