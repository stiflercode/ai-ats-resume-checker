"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  buttonText: string;
}

export const PricingSection = ({
  tiers,
  className,
}: {
  tiers: PricingTier[];
  className?: string;
}) => {
  return (
    <section className={cn("py-20 bg-gray-50 dark:bg-gray-900", className)} id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose the plan that works best for your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <div 
              key={index}
              className={cn(
                "rounded-2xl overflow-hidden transition-all duration-300",
                tier.highlighted 
                  ? "bg-white dark:bg-gray-800 shadow-xl scale-105 border-2 border-blue-500 dark:border-blue-400" 
                  : "bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl"
              )}
            >
              {tier.highlighted && (
                <div className="bg-blue-500 text-white text-center py-2 font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {tier.name}
                </h3>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {tier.price}
                  </span>
                  {tier.price !== "Free" && (
                    <span className="text-gray-500 dark:text-gray-400 ml-2">
                      /month
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  {tier.description}
                </p>
                
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <svg 
                        className="w-5 h-5 text-green-500 mr-2 mt-0.5" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      <span className="text-gray-600 dark:text-gray-400">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  className={cn(
                    "w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200",
                    tier.highlighted 
                      ? "bg-blue-600 hover:bg-blue-700 text-white" 
                      : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
                  )}
                >
                  {tier.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
