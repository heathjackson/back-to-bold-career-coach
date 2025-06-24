import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] bg-white px-4">
      <div className="max-w-3xl w-full text-center py-24">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          Career Break to <span className="text-purple-800">Comeback</span>
          <br />
          We Got You
        </h1>
        <p className="text-lg sm:text-xl text-gray-500 mb-10">
          AI-powered tools to help you land your next role: resume rewriting, cover letters, LinkedIn, and career path guidance.
        </p>
        
        <div className="flex justify-center">
          <Link href="/career-path">
            <span className="inline-block px-8 py-4 rounded-full bg-purple-800 text-white font-bold text-xl shadow hover:bg-purple-900 transition">
              Career Path Assessment
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
