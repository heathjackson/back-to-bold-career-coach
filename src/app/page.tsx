import Link from "next/link";
import { colorClasses } from "@/lib/colors";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-brand-primary">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-accent text-brand-accent text-sm font-medium mb-8 backdrop-blur-sm border border-brand-secondary">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              AI-Powered Career Coaching
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-brand-primary mb-8 leading-tight">
              Redefine Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-purple-400">
                Career Comeback
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-brand-secondary mb-12 max-w-4xl mx-auto leading-relaxed">
              Transform your job search with AI-powered tools that help you craft compelling resumes, 
              write standout cover letters, and discover your ideal career path.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/career-path">
                <span className="group relative inline-flex items-center px-8 py-4 btn-primary font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                  Start Your Assessment
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              <Link href="/resume">
                <span className="inline-flex items-center px-8 py-4 btn-secondary font-semibold rounded-xl hover:border-brand-accent transition-all duration-200">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Rewrite Resume
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-900 border-b border-brand-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">
              Why Choose Our AI-Powered Tools?
            </h2>
            <p className="text-xl text-brand-secondary max-w-3xl mx-auto">
              Professional-grade assistance to help you stand out in today's competitive job market.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-brand-accent rounded-2xl flex items-center justify-center mx-auto backdrop-blur-sm border border-brand-secondary">
                <svg className="w-8 h-8 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-brand-primary">AI-Powered</h3>
              <p className="text-brand-secondary">Leverage advanced AI technology to create professional, tailored content for your job search.</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-brand-accent rounded-2xl flex items-center justify-center mx-auto backdrop-blur-sm border border-brand-secondary">
                <svg className="w-8 h-8 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-brand-primary">Secure & Private</h3>
              <p className="text-brand-secondary">Your personal information and documents are kept secure and confidential.</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-brand-accent rounded-2xl flex items-center justify-center mx-auto backdrop-blur-sm border border-brand-secondary">
                <svg className="w-8 h-8 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-brand-primary">Professional Quality</h3>
              <p className="text-brand-secondary">Get polished, industry-standard documents that help you make a strong impression.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-primary mb-6">
              Everything You Need to Land Your Dream Job
            </h2>
            <p className="text-xl text-brand-secondary max-w-3xl mx-auto">
              Our AI-powered tools work together to create a comprehensive job search strategy tailored to your unique career goals.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Resume Service */}
            <div className="group bg-brand-secondary rounded-2xl p-8 backdrop-blur-sm border border-brand-primary hover:border-brand-secondary transition-all duration-300">
              <div className="flex items-start mb-6">
                <div className="flex-shrink-0 w-14 h-14 bg-brand-accent rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 border border-brand-secondary">
                  <svg className="w-7 h-7 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-brand-primary mb-2">Resume Rewriting</h3>
                  <p className="text-brand-secondary leading-relaxed">
                    Transform your resume with AI-powered optimization that highlights your achievements, 
                    matches job descriptions, and passes ATS systems.
                  </p>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-brand-secondary">
                  <svg className="w-4 h-4 text-brand-accent mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  ATS-optimized formatting
                </div>
                <div className="flex items-center text-sm text-brand-secondary">
                  <svg className="w-4 h-4 text-brand-accent mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Achievement-focused content
                </div>
                <div className="flex items-center text-sm text-brand-secondary">
                  <svg className="w-4 h-4 text-brand-accent mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Keyword optimization
                </div>
              </div>
              <Link href="/resume">
                <span className="inline-flex items-center px-6 py-3 btn-primary font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                  Rewrite My Resume
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </div>

            {/* Cover Letter Service */}
            <div className="group bg-brand-secondary rounded-2xl p-8 backdrop-blur-sm border border-brand-primary hover:border-brand-secondary transition-all duration-300">
              <div className="flex items-start mb-6">
                <div className="flex-shrink-0 w-14 h-14 bg-brand-accent rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 border border-brand-secondary">
                  <svg className="w-7 h-7 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-brand-primary mb-2">Cover Letters</h3>
                  <p className="text-brand-secondary leading-relaxed">
                    Create compelling cover letters that tell your unique story and connect your experience 
                    directly to the role you're applying for.
                  </p>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-brand-secondary">
                  <svg className="w-4 h-4 text-brand-accent mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Personalized storytelling
                </div>
                <div className="flex items-center text-sm text-brand-secondary">
                  <svg className="w-4 h-4 text-brand-accent mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Role-specific customization
                </div>
                <div className="flex items-center text-sm text-brand-secondary">
                  <svg className="w-4 h-4 text-brand-accent mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Professional tone & structure
                </div>
              </div>
              <Link href="/cover-letter">
                <span className="inline-flex items-center px-6 py-3 btn-primary font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                  Write Cover Letter
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </div>

            {/* LinkedIn Service */}
            <div className="group bg-brand-secondary rounded-2xl p-8 backdrop-blur-sm border border-brand-primary hover:border-brand-secondary transition-all duration-300">
              <div className="flex items-start mb-6">
                <div className="flex-shrink-0 w-14 h-14 bg-brand-accent rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 border border-brand-secondary">
                  <svg className="w-7 h-7 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-brand-primary mb-2">LinkedIn Profile</h3>
                  <p className="text-brand-secondary leading-relaxed">
                    Optimize your LinkedIn profile to attract recruiters and showcase your professional 
                    brand with compelling headlines and summaries.
                  </p>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-brand-secondary">
                  <svg className="w-4 h-4 text-brand-accent mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Compelling headline optimization
                </div>
                <div className="flex items-center text-sm text-brand-secondary">
                  <svg className="w-4 h-4 text-brand-accent mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Professional summary writing
                </div>
                <div className="flex items-center text-sm text-brand-secondary">
                  <svg className="w-4 h-4 text-brand-accent mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Keyword optimization
                </div>
              </div>
              <Link href="/linkedin">
                <span className="inline-flex items-center px-6 py-3 btn-primary font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                  Optimize Profile
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </div>

            {/* Career Path Service */}
            <div className="group bg-brand-secondary rounded-2xl p-8 backdrop-blur-sm border border-brand-primary hover:border-brand-secondary transition-all duration-300">
              <div className="flex items-start mb-6">
                <div className="flex-shrink-0 w-14 h-14 bg-brand-accent rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 border border-brand-secondary">
                  <svg className="w-7 h-7 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-brand-primary mb-2">Career Path Assessment</h3>
                  <p className="text-brand-secondary leading-relaxed">
                    Discover your ideal career path with AI-powered guidance based on your skills, 
                    interests, and professional goals.
                  </p>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-brand-secondary">
                  <svg className="w-4 h-4 text-brand-accent mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Personalized career recommendations
                </div>
                <div className="flex items-center text-sm text-brand-secondary">
                  <svg className="w-4 h-4 text-brand-accent mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Skill gap analysis
                </div>
                <div className="flex items-center text-sm text-brand-secondary">
                  <svg className="w-4 h-4 text-brand-accent mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Industry insights & trends
                </div>
              </div>
              <Link href="/career-path">
                <span className="inline-flex items-center px-6 py-3 btn-primary font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                  Find My Path
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-brand-gradient backdrop-blur-sm border-t border-brand-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-primary mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-brand-secondary mb-12 max-w-2xl mx-auto">
            Start your journey with our AI-powered career tools and take the first step toward your dream job.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/career-path">
              <span className="group inline-flex items-center px-8 py-4 btn-primary font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                Start Your Assessment
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            <Link href="/resume">
              <span className="inline-flex items-center px-8 py-4 btn-secondary font-semibold rounded-xl hover:border-brand-accent transition-all duration-200">
                Rewrite My Resume
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
