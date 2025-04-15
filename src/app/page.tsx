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
import { ATSAnalysisResult } from "@/lib/gemini-api";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [sampleResults, setSampleResults] = useState<ATSAnalysisResult>({
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
  });
  const [jobDescription, setJobDescription] = useState('');

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

  const handleFileUpload = (file: File) => {
    console.log("File uploaded:", file.name);
    setUploadStatus('uploading');
    
    try {
      // Validate file size
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        throw new Error("File size exceeds 10MB limit");
      }
      
      // Validate file type if needed
      const fileType = file.type;
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      
      if (!validTypes.includes(fileType) && !file.name.endsWith('.pdf') && !file.name.endsWith('.doc') && 
          !file.name.endsWith('.docx') && !file.name.endsWith('.txt')) {
        throw new Error("Invalid file type. Please upload PDF, DOC, DOCX, or TXT file");
      }
      
      // Simulate file processing delay
      setTimeout(() => {
        setUploadedFile(file);
        setUploadStatus('success');
      }, 500);
    } catch (error) {
      console.error("Error handling file upload:", error);
      setUploadStatus('error');
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Failed to process the file. Please try again.");
      }
    }
  };

  const handleAnalyzeResume = async () => {
    if (!uploadedFile) {
      alert("Please upload a resume file first.");
      return;
    }

    // Show loading state
    setIsLoading(true);

    try {
      // Check if API key is configured
      if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
        throw new Error("Missing Gemini API key. Please make sure NEXT_PUBLIC_GEMINI_API_KEY is set in your environment variables.");
      }
      
      // Import the geminiClient here to use it
      const geminiClient = await import('@/lib/gemini-api').then(module => module.default);

      console.log("API key available:", !!process.env.NEXT_PUBLIC_GEMINI_API_KEY);

      // Extract text from file
      const textContent = await geminiClient.extractTextFromFile(uploadedFile);

      try {
        // Try to analyze resume with Gemini API
        const results = await geminiClient.analyzeResume(textContent, jobDescription || undefined);
        
        // Set results and show results section
        setIsLoading(false);
        setShowResults(true);
        
        // Replace sample results with actual results from Gemini
        setSampleResults(results);
        
        // Scroll to results section
        setTimeout(() => {
          document.getElementById('results-section')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      } catch (error) {
        console.error("Gemini API error, using default analysis:", error);
        
        // Create a basic analysis if API fails
        const basicAnalysis: ATSAnalysisResult = {
          score: calculateBasicScore(textContent, jobDescription || ""),
          keywords: extractBasicKeywords(textContent, jobDescription || ""),
          suggestions: generateBasicSuggestions(textContent, jobDescription || "")
        };
        
        // Still show results but using our basic analysis
        setIsLoading(false);
        setShowResults(true);
        setSampleResults(basicAnalysis);
        
        // Scroll to results section
        setTimeout(() => {
          document.getElementById('results-section')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
        
        // Log error details but proceed with basic analysis
        console.warn("Using basic analysis due to API error:", error);
      }
    } catch (error) {
      console.error("Error processing resume:", error);
      setIsLoading(false);
      
      // Show appropriate error message to user
      if (error instanceof Error) {
        if (error.message.includes("API key")) {
          alert("API Key Error: " + error.message);
        } else if (error.message.includes("403") || error.message.includes("permission")) {
          alert("Authentication Error: Your API key may be invalid or missing required permissions.");
        } else {
          alert("Error processing your resume: " + error.message);
        }
      } else {
        alert("Error processing your resume. Please try again.");
      }
    }
  };
  
  // Simple text analysis functions to use as fallback when API fails
  const calculateBasicScore = (resumeText: string, jobDescription: string): number => {
    // Count words in resume
    const resumeWordCount = resumeText.split(/\s+/).length;
    
    // Basic length check (too short or too long)
    if (resumeWordCount < 200) return 50;
    if (resumeWordCount > 1000) return 65;
    
    // Check if resume contains common sections
    let score = 70; // Base score
    
    // Check for common resume sections
    if (resumeText.toLowerCase().includes("experience")) score += 5;
    if (resumeText.toLowerCase().includes("education")) score += 5;
    if (resumeText.toLowerCase().includes("skills")) score += 5;
    
    // Check for job description match if provided
    if (jobDescription) {
      const jobKeywords = jobDescription
        .toLowerCase()
        .split(/\s+/)
        .filter(word => word.length > 5)
        .filter(word => !["about", "would", "should", "could", "their"].includes(word));
      
      // Check how many job keywords appear in resume
      const matchCount = jobKeywords.filter(keyword => 
        resumeText.toLowerCase().includes(keyword)
      ).length;
      
      // Add points based on keyword matches
      score += Math.min(15, matchCount);
    }
    
    return Math.min(95, score); // Cap at 95
  };
  
  const extractBasicKeywords = (resumeText: string, jobDescription: string): { word: string; found: boolean }[] => {
    // Common keywords that should be in most resumes
    const commonKeywords = [
      "experience", "skills", "education", "project", "achievement", 
      "leadership", "team", "management", "development", "responsible"
    ];
    
    // If job description provided, extract some keywords from it
    const jobKeywords = jobDescription
      ? jobDescription
          .toLowerCase()
          .split(/\s+/)
          .filter(word => word.length > 5)
          .filter(word => !["about", "would", "should", "could", "their"].includes(word))
          .slice(0, 10)
      : [];
    
    // Combine and deduplicate keywords
    const allKeywords = [...new Set([...commonKeywords, ...jobKeywords])];
    
    // Check which keywords are found in the resume
    return allKeywords.map(word => ({
      word: word.charAt(0).toUpperCase() + word.slice(1),
      found: resumeText.toLowerCase().includes(word)
    })).slice(0, 10); // Limit to 10 keywords
  };
  
  const generateBasicSuggestions = (resumeText: string, jobDescription: string): string[] => {
    const suggestions = [];
    
    // Check resume length
    if (resumeText.split(/\s+/).length < 300) {
      suggestions.push("Your resume appears to be too short. Consider adding more details about your experience and skills.");
    }
    
    // Check for common resume sections
    if (!resumeText.toLowerCase().includes("experience")) {
      suggestions.push("Add a dedicated 'Experience' section to highlight your work history.");
    }
    
    if (!resumeText.toLowerCase().includes("education")) {
      suggestions.push("Include an 'Education' section with your academic background.");
    }
    
    if (!resumeText.toLowerCase().includes("skills")) {
      suggestions.push("Add a 'Skills' section to highlight your technical and soft skills.");
    }
    
    // Check for action verbs
    const actionVerbs = ["managed", "led", "created", "developed", "implemented", "achieved"];
    const hasActionVerbs = actionVerbs.some(verb => resumeText.toLowerCase().includes(verb));
    if (!hasActionVerbs) {
      suggestions.push("Use more action verbs (like 'managed', 'led', 'developed') to describe your achievements.");
    }
    
    // Check for quantifiable achievements
    const hasNumbers = /\d+%|\d+ percent|\d+ years|\d+K|\$\d+|\d+ people/i.test(resumeText);
    if (!hasNumbers) {
      suggestions.push("Quantify your achievements with numbers (e.g., 'increased sales by 20%' or 'managed a team of 5 people').");
    }
    
    // Job description specific suggestions
    if (jobDescription) {
      const jobKeywords = jobDescription
        .toLowerCase()
        .split(/\s+/)
        .filter(word => word.length > 5)
        .filter(word => !["about", "would", "should", "could", "their"].includes(word));
      
      // Find missing keywords
      const missingKeywords = jobKeywords.filter(keyword => 
        !resumeText.toLowerCase().includes(keyword)
      ).slice(0, 5); // Take top 5 missing
      
      if (missingKeywords.length > 0) {
        suggestions.push(`Try to include these keywords from the job description: ${missingKeywords.join(", ")}.`);
      }
    }
    
    // Add general suggestions if we don't have enough
    if (suggestions.length < 3) {
      suggestions.push("Ensure your resume is free of spelling and grammatical errors.");
      suggestions.push("Use a clean, professional format that is easy for ATS systems to parse.");
      suggestions.push("Tailor your resume for each job application by matching keywords from the job description.");
    }
    
    return suggestions;
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
          <div className="container max-w-6xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-center mb-10">
              Check Your Resume ATS Compatibility
            </h2>
            <div className="max-w-xl mx-auto mb-8">
              <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                Upload your resume to analyze its compatibility with Applicant Tracking Systems.
                For a more targeted analysis, paste the job description as well.
              </p>
              
              {/* Job Description Input */}
              <div className="mb-6">
                <label 
                  htmlFor="jobDescription" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Job Description (Optional)
                </label>
                <textarea
                  id="jobDescription"
                  rows={4}
                  className="block w-full rounded-md border-gray-300 dark:border-gray-600 
                    shadow-sm focus:border-blue-500 focus:ring-blue-500 
                    dark:bg-gray-700 dark:text-white sm:text-sm p-3"
                  placeholder="Paste the job description here for a more targeted analysis..."
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>
              
              <FileUpload onFileChange={handleFileUpload} className="z-10" />
              
              {/* File Upload Status */}
              {uploadStatus === 'uploading' && (
                <div className="mt-3 text-center text-sm text-blue-600 dark:text-blue-400">
                  <svg className="w-5 h-5 inline-block mr-1 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  Processing your resume...
                </div>
              )}
              
              {uploadStatus === 'success' && uploadedFile && (
                <div className="mt-3 text-center text-sm text-green-600 dark:text-green-400">
                  <svg className="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Resume "{uploadedFile.name}" uploaded successfully. Click "Check My Resume" to analyze.
                </div>
              )}
              
              {uploadStatus === 'error' && (
                <div className="mt-3 text-center text-sm text-red-600 dark:text-red-400">
                  <svg className="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Error processing your resume. Please try again.
                </div>
              )}
              
              <div className="flex justify-center mt-6">
                <button
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full font-medium text-lg transition-all duration-300 z-10 shadow-lg hover:shadow-xl hover:-translate-y-1 transform disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:transform-none"
                  onClick={handleAnalyzeResume}
                  disabled={isLoading || !uploadedFile || uploadStatus !== 'success'}
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
            </div>
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
