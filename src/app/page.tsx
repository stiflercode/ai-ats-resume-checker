"use client";

import { useState } from "react";
import { Navbar, NavBody, NavItems, MobileNav, MobileNavHeader, MobileNavMenu, MobileNavToggle, NavbarLogo, NavbarButton } from "@/components/ui/resizable-navbar";
import { HeroSection } from "@/components/ui/hero-section";
import { FileUpload } from "@/components/ui/file-upload";
import { ATSResults } from "@/components/ui/ats-results";
import { FeaturesSection } from "@/components/ui/features-section";
import { HowItWorks } from "@/components/ui/how-it-works";
import { PricingSection } from "@/components/ui/pricing-section";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Footer } from "@/components/ui/footer";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sample data for features
  const features = [
    {
      title: "AI-Powered Analysis",
      description: "Our advanced AI analyzes your resume against industry standards and job descriptions to ensure maximum compatibility with ATS systems.",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
        </svg>
      ),
    },
    {
      title: "Keyword Optimization",
      description: "Identify missing keywords and phrases that are crucial for your resume to pass through ATS filters and reach human recruiters.",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"></path>
        </svg>
      ),
    },
    {
      title: "Format Checker",
      description: "Ensure your resume format is ATS-friendly with proper headings, sections, and formatting that won't confuse applicant tracking systems.",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
      ),
    },
    {
      title: "Personalized Suggestions",
      description: "Get tailored recommendations to improve your resume based on your industry, experience level, and target positions.",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
        </svg>
      ),
    },
    {
      title: "Real-Time Feedback",
      description: "Receive instant feedback on your resume with a detailed score and actionable improvements you can implement right away.",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
    },
    {
      title: "Job Match Analysis",
      description: "Compare your resume against specific job descriptions to see how well you match and what improvements you need to make.",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
        </svg>
      ),
    },
  ];

  // Sample data for how it works steps
  const steps = [
    {
      number: 1,
      title: "Upload Your Resume",
      description: "Upload your resume in PDF, DOCX, or TXT format. Our system accepts all common resume file types.",
    },
    {
      number: 2,
      title: "AI Analysis",
      description: "Our AI engine analyzes your resume for ATS compatibility, keywords, formatting, and content quality.",
    },
    {
      number: 3,
      title: "Get Detailed Results",
      description: "Receive a comprehensive report with your ATS compatibility score and specific improvement suggestions.",
    },
    {
      number: 4,
      title: "Optimize Your Resume",
      description: "Follow our personalized recommendations to improve your resume and increase your chances of getting interviews.",
    },
  ];

  // Sample data for pricing tiers
  const pricingTiers = [
    {
      name: "Free",
      price: "Free",
      description: "Basic ATS check for casual job seekers",
      features: [
        "Basic ATS compatibility check",
        "Limited keyword analysis",
        "Format validation",
        "1 resume scan per day",
      ],
      buttonText: "Get Started",
    },
    {
      name: "Professional",
      price: "$19",
      description: "Complete solution for serious job seekers",
      features: [
        "Advanced ATS compatibility check",
        "Comprehensive keyword analysis",
        "Format optimization",
        "Unlimited resume scans",
        "Job-specific recommendations",
        "Resume templates library",
      ],
      highlighted: true,
      buttonText: "Try Pro",
    },
    {
      name: "Enterprise",
      price: "$49",
      description: "For teams and career services",
      features: [
        "All Professional features",
        "Multiple user accounts",
        "API access",
        "Custom branding",
        "Priority support",
        "Analytics dashboard",
      ],
      buttonText: "Contact Sales",
    },
  ];

  // Sample data for testimonials
  const testimonials = [
    {
      quote: "After using this ATS checker, I finally started getting interview calls. The keyword suggestions were spot on for my industry!",
      name: "Sarah Johnson",
      title: "Marketing Professional",
    },
    {
      quote: "I was skeptical at first, but this tool helped me understand why my resume wasn't getting through. Now I have a job at my dream company!",
      name: "Michael Chen",
      title: "Software Engineer",
    },
    {
      quote: "As a career coach, I recommend this tool to all my clients. It's the most accurate ATS simulator I've found on the market.",
      name: "Jennifer Williams",
      title: "Career Coach",
    },
    {
      quote: "The detailed feedback helped me improve not just the ATS compatibility but also the overall quality of my resume.",
      name: "David Rodriguez",
      title: "Finance Analyst",
    },
    {
      quote: "After 6 months of job searching with no results, I used this tool and landed 3 interviews in just 2 weeks!",
      name: "Emily Parker",
      title: "HR Specialist",
    },
  ];

  // Sample data for ATS results
  const sampleResults = {
    score: 78,
    keywords: [
      { word: "Project Management", found: true },
      { word: "Team Leadership", found: true },
      { word: "Strategic Planning", found: false },
      { word: "Budget Management", found: true },
      { word: "Stakeholder Communication", found: false },
      { word: "Risk Assessment", found: true },
      { word: "Agile Methodology", found: false },
    ],
    suggestions: [
      "Add more industry-specific keywords like 'Strategic Planning' and 'Agile Methodology'",
      "Improve the formatting of your work experience section for better ATS readability",
      "Use more action verbs at the beginning of your bullet points",
      "Quantify your achievements with specific metrics and results",
      "Remove graphics and complex formatting that may confuse ATS systems",
    ],
  };

  const handleFileUpload = (file: File) => {
    // In a real application, you would process the file here
    console.log("File uploaded:", file.name);

    // Show loading state
    setIsLoading(true);

    // Simulate processing delay
    setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);

      // Scroll to results section after a short delay
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }, 2000);
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems
            items={[
              { name: "Home", link: "/" },
              { name: "Features", link: "#features" },
              { name: "How It Works", link: "#how-it-works" },
              { name: "Testimonials", link: "#testimonials" },
              { name: "Pricing", link: "#pricing" },
            ]}
          />
          <div className="relative z-20 flex items-center justify-end gap-2">
            <NavbarButton variant="secondary">Sign In</NavbarButton>
            <NavbarButton>Get Started</NavbarButton>
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </MobileNavHeader>
          <MobileNavMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
            <div className="flex flex-col space-y-4 w-full">
              <a
                href="/"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#features"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </a>
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </a>
              <a
                href="#pricing"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </a>
              <div className="pt-4 flex flex-col space-y-4">
                <NavbarButton variant="secondary">Sign In</NavbarButton>
                <NavbarButton>Get Started</NavbarButton>
              </div>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-16">
        <HeroSection>
          <div className="flex flex-col items-center mt-12 space-y-8">
            <FileUpload onFileChange={handleFileUpload} className="z-10" />
            <button
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full font-medium text-lg transition-all duration-300 z-10 shadow-lg hover:shadow-xl hover:-translate-y-1 transform disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:transform-none"
              onClick={() => setShowResults(true)}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </span>
              ) : (
                "Check My Resume"
              )}
            </button>
          </div>
        </HeroSection>
      </section>

      {/* Results Section (conditionally rendered) */}
      {showResults && (
        <section id="results-section" className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Your Resume Analysis
            </h2>
            <ATSResults
              score={sampleResults.score}
              keywords={sampleResults.keywords}
              suggestions={sampleResults.suggestions}
            />
          </div>
        </section>
      )}

      {/* Features Section */}
      <FeaturesSection features={features} />

      {/* How It Works Section */}
      <HowItWorks steps={steps} />

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900" id="testimonials">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Join thousands of job seekers who have improved their resume and landed interviews
            </p>
          </div>
          <InfiniteMovingCards items={testimonials} />
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection tiers={pricingTiers} />

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Optimize Your Resume?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Don't let ATS systems reject your resume. Get started today and increase your chances of landing interviews.
          </p>
          <button className="px-8 py-4 bg-white text-blue-600 hover:bg-blue-50 rounded-lg font-bold text-lg transition-colors duration-200">
            Start Your Free ATS Check
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
