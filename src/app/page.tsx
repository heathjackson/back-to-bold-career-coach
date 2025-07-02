import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[--color-bg-primary] text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-transparent">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-900/30 text-blue-200 text-sm font-medium mb-8 backdrop-blur-sm border border-blue-700">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              AI-Powered Career Coaching
            </div>
            <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-4 tracking-wide text-center">
                BACK TO BOLD CAREER COACH
            </h1>
            <div className="max-w-2xl mx-auto text-center text-blue-200 text-2xl font-semibold mb-10">
                We built Back to Bold for moms like us — returning to work after time away can feel overwhelming. This toolkit is here to help you start strong, one step at a time.
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/career-path">
                <span className="group relative inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                  Get Started
                </span>
              </Link>
              <Link href="/resume">
                <span className="inline-flex items-center px-8 py-4 bg-white/10 border border-blue-400 text-blue-200 font-semibold rounded-xl hover:bg-blue-900/30 hover:text-white transition-all duration-200">
                  Learn More
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-[--color-bg-primary]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Everything You Need to Land Your Dream Job
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Our AI-powered tools work together to create a comprehensive job search strategy tailored to your unique career goals.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Resume Card */}
            <div className="bg-blue-900/40 rounded-2xl p-8 flex flex-col items-center text-center shadow border border-blue-800">
              <div className="text-4xl mb-4">📄</div>
              <h3 className="text-xl font-bold text-white mb-2">Resume Help</h3>
              <p className="text-blue-200 mb-6">Get an AI-optimized resume that highlights your strengths and gets noticed by employers.</p>
              <Link href="/resume">
                <span className="inline-flex items-center px-6 py-3 bg-blue-600 font-semibold rounded-lg text-white hover:bg-blue-700 transition-all duration-200">
                  Get Resume Help
                </span>
              </Link>
            </div>
            {/* Cover Letter Card */}
            <div className="bg-blue-900/40 rounded-2xl p-8 flex flex-col items-center text-center shadow border border-blue-800">
              <div className="text-4xl mb-4">✉️</div>
              <h3 className="text-xl font-bold text-white mb-2">Cover Letter</h3>
              <p className="text-blue-200 mb-6">Craft a personalized cover letter that tells your story and connects you to the job you want.</p>
              <Link href="/cover-letter">
                <span className="inline-flex items-center px-6 py-3 bg-blue-600 font-semibold rounded-lg text-white hover:bg-blue-700 transition-all duration-200">
                  Write My Cover Letter
                </span>
              </Link>
            </div>
            {/* LinkedIn Card */}
            <div className="bg-blue-900/40 rounded-2xl p-8 flex flex-col items-center text-center shadow border border-blue-800">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-bold text-white mb-2">LinkedIn</h3>
              <p className="text-blue-200 mb-6">Update your LinkedIn profile to attract recruiters and showcase your professional brand.</p>
              <Link href="/linkedin">
                <span className="inline-flex items-center px-6 py-3 bg-blue-600 font-semibold rounded-lg text-white hover:bg-blue-700 transition-all duration-200">
                  Update My LinkedIn
                </span>
              </Link>
            </div>
            {/* Career Path Card */}
            <div className="bg-blue-900/40 rounded-2xl p-8 flex flex-col items-center text-center shadow border border-blue-800">
              <div className="text-4xl mb-4">🧭</div>
              <h3 className="text-xl font-bold text-white mb-2">Career Path</h3>
              <p className="text-blue-200 mb-6">Discover your next step with AI-powered guidance tailored to your skills and goals.</p>
              <div className="mb-6" />
              <Link href="/career-path">
                <span className="inline-flex items-center px-6 py-3 bg-blue-600 font-semibold rounded-lg text-white hover:bg-blue-700 transition-all duration-200">
                  Find My Next Step
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-[--color-bg-primary] border-t border-brand-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-blue-200 mb-12 max-w-2xl mx-auto">
            Start your journey with our AI-powered career tools and take the first step toward your dream job.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/career-path">
              <span className="group inline-flex items-center px-8 py-4 bg-blue-600 font-semibold rounded-xl text-white shadow-lg hover:bg-blue-700 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                Start Your Assessment
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            <Link href="/resume">
              <span className="inline-flex items-center px-8 py-4 bg-white/10 border border-blue-400 text-blue-200 font-semibold rounded-xl hover:bg-blue-900/30 hover:text-white transition-all duration-200">
                Rewrite My Resume
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
