import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="bg-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Back to Bold Logo"
                width={48}
                height={48}
                className="mr-4 bg-white border border-black"
                priority
              />
            </Link>
          </div>
          <div className="flex-1 flex justify-end">
            <div className="flex space-x-10">
              <Link href="/resume" className="text-gray-700 hover:text-purple-800 transition font-medium text-lg">Resume</Link>
              <Link href="/cover-letter" className="text-gray-700 hover:text-purple-800 transition font-medium text-lg">Cover Letter</Link>
              <Link href="/linkedin" className="text-gray-700 hover:text-purple-800 transition font-medium text-lg">LinkedIn</Link>
              <Link href="/career-path" className="text-gray-700 hover:text-purple-800 transition font-medium text-lg">Career Path</Link>
              <a
                href="https://www.notion.so/Back-to-Bold-AI-Resume-Prompt-Pack-1f02ec42493f80008008cbf7250372a9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-purple-800 transition font-medium text-lg"
              >
                Free Toolkit
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 