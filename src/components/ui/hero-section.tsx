"use client";
import React from "react";
import { WavyBackground } from "./wavy-background";
import { cn } from "@/lib/utils";

export const HeroSection = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <WavyBackground
      className={cn("max-w-5xl mx-auto pb-40 pt-32", className)}
      colors={["#3b82f6", "#8b5cf6", "#ec4899", "#06b6d4", "#14b8a6"]}
      waveOpacity={0.6}
      blur={10}
    >
      <div className="space-y-8">
        <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold text-center leading-tight tracking-tight">
          Optimize Your Resume <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-pink-200">for ATS</span>
        </h1>
        <p className="text-xl md:text-2xl text-blue-100 font-medium text-center max-w-3xl mx-auto">
          Get your resume past the Applicant Tracking Systems and into the hands of recruiters
        </p>
        {children}
      </div>
    </WavyBackground>
  );
};
