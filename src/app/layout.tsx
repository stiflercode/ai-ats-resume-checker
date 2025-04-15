import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ResumeAI - ATS Resume Checker",
  description: "Optimize your resume for ATS systems and land more interviews with our AI-powered resume checker",
  viewport: "width=device-width, initial-scale=1",
  keywords: "resume checker, ATS, applicant tracking system, resume optimization, job application, resume scanner",
  authors: [{ name: "ResumeAI Team" }],
  creator: "ResumeAI",
  publisher: "ResumeAI",
  openGraph: {
    title: "ResumeAI - ATS Resume Checker",
    description: "Optimize your resume for ATS systems and land more interviews with our AI-powered resume checker",
    url: "https://resumeai.com",
    siteName: "ResumeAI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ResumeAI - ATS Resume Checker",
    description: "Optimize your resume for ATS systems and land more interviews with our AI-powered resume checker",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100`}
      >
        {children}
      </body>
    </html>
  );
}
