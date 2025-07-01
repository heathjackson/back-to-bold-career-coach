import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="bg-brand-primary/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Back to Bold Logo"
                width={48}
                height={48}
                className="mr-4 bg-white border border-white/20 rounded-lg"
                priority
              />
            </Link>
          </div>
          <div className="flex-1 flex justify-end items-center">
            <div className="flex space-x-10">
              <Link href="/resume" className="text-white hover:text-blue-300 transition font-semibold text-lg">Resume</Link>
              <Link href="/cover-letter" className="text-white hover:text-blue-300 transition font-semibold text-lg">Cover Letter</Link>
              <Link href="/linkedin" className="text-white hover:text-blue-300 transition font-semibold text-lg">LinkedIn</Link>
              <Link href="/career-path" className="text-white hover:text-blue-300 transition font-semibold text-lg">Career Path</Link>
              <a
                href="https://www.notion.so/Back-to-Bold-AI-Resume-Prompt-Pack-1f02ec42493f80008008cbf7250372a9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-300 transition font-semibold text-lg"
              >
                Free Toolkit
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-4 ml-8">
              <Link href="/signin" className="px-5 py-2 border border-blue-400 text-blue-400 rounded-lg font-semibold hover:bg-blue-900 hover:text-white transition">Sign In</Link>
              <Link href="/signup" className="px-5 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition shadow">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 