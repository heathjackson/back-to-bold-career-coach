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
              <Link href="/toolkit" className="text-white hover:text-blue-300 transition font-semibold text-lg">
                Free Toolkit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 