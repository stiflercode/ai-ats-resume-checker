"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface Step {
  number: number;
  title: string;
  description: string;
}

export const HowItWorks = ({
  steps,
  className,
}: {
  steps: Step[];
  className?: string;
}) => {
  return (
    <section className={cn("py-20", className)} id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get your resume ATS-ready in just a few simple steps
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 dark:bg-blue-900 hidden md:block"></div>
          
          <div className="space-y-12 relative">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={cn(
                  "flex flex-col md:flex-row items-center",
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                )}
              >
                <div className="md:w-1/2 p-6">
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg mr-4">
                        {step.number}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </div>
                
                <div className="md:w-1/2 flex justify-center py-6">
                  <div className="w-10 h-10 rounded-full bg-blue-600 border-4 border-white dark:border-gray-900 z-10"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
