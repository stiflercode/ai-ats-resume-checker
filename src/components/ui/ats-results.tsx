"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ATSResultsProps {
  score: number;
  keywords: { word: string; found: boolean }[];
  suggestions: string[];
  className?: string;
}

export const ATSResults = ({
  score,
  keywords,
  suggestions,
  className,
}: ATSResultsProps) => {
  // Calculate the color based on the score
  const getScoreColor = () => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className={cn("w-full max-w-3xl mx-auto p-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg", className)}>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">ATS Analysis Results</h2>
        <div className="flex items-center">
          <div className="text-4xl font-bold mr-2 transition-colors duration-500 ease-in-out">
            <span className={getScoreColor()}>{score}%</span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            ATS<br />Compatibility
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Keywords Analysis</h3>
          <div className="space-y-2">
            {keywords.map((keyword, index) => (
              <div key={index} className="flex items-center">
                <div className={cn(
                  "w-4 h-4 rounded-full mr-2",
                  keyword.found ? "bg-green-500" : "bg-red-500"
                )}></div>
                <span className={cn(
                  "text-sm",
                  keyword.found ? "text-gray-800 dark:text-gray-200" : "text-gray-500 dark:text-gray-400"
                )}>
                  {keyword.word}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Improvement Suggestions</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Next Steps</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
            Download Report
          </button>
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200">
            Get Detailed Analysis
          </button>
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200">
            AI Resume Optimization
          </button>
        </div>
      </div>
    </div>
  );
};
