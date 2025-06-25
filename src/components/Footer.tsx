import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full mt-12 border-t border-white/10 bg-gray-900 py-6 text-center text-sm text-gray-300">
      <div className="container mx-auto flex flex-col items-center gap-2 md:flex-row md:justify-between md:gap-0 px-4">
        <div>
          © {new Date().getFullYear()} Back to Bold Career Coach. All rights reserved.
        </div>
        <div className="text-xs text-gray-400">
          AI-powered tools for your career journey
        </div>
      </div>
    </footer>
  );
} 