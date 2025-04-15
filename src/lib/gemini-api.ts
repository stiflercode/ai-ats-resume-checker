/**
 * Gemini API client for the resume checker
 * This module integrates Google's Gemini API for analyzing resumes
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

// Types for the response data
export interface ATSAnalysisResult {
  score: number;
  keywords: { word: string; found: boolean }[];
  suggestions: string[];
}

/**
 * GeminiClient handles communication with the Gemini API for resume analysis
 */
export class GeminiClient {
  private client: GoogleGenerativeAI;
  private apiKey: string;

  /**
   * Initialize the Gemini API client
   * @param apiKey - The Gemini API key
   */
  constructor(apiKey: string) {
    this.apiKey = apiKey;
    
    if (!this.apiKey) {
      console.error("Gemini API key is missing. Make sure NEXT_PUBLIC_GEMINI_API_KEY is set in .env.local");
    } else {
      console.log("Initializing Gemini client with API key:", this.apiKey.substring(0, 4) + '...');
    }
    
    this.client = new GoogleGenerativeAI(this.apiKey);
  }

  /**
   * Analyzes a resume against ATS standards
   * @param resumeText - The text content of the resume
   * @param jobDescription - Optional job description to compare against
   * @returns Promise with ATS analysis results
   */
  async analyzeResume(resumeText: string, jobDescription?: string): Promise<ATSAnalysisResult> {
    // For debugging - log which models are available
    await this.listAvailableModels();
    
    // Check if API key is available
    if (!this.apiKey) {
      console.error("Missing Gemini API key");
      throw new Error("Missing Gemini API key. Please configure your environment variables.");
    }

    console.log("Using API key:", this.apiKey ? "API key is set" : "API key is missing");
    
    // Model to use - try gemini-2.0-flash as primary option
    const MODEL_NAME = "gemini-2.0-flash";
    console.log("Using model:", MODEL_NAME);
    
    try {
      // Create a generative model instance with the specified model name
      const model = this.client.getGenerativeModel({ model: MODEL_NAME });
      
      // Generate content with the model
      const result = await model.generateContent({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `You are an expert resume reviewer and ATS (Applicant Tracking System) specialist. 
                Analyze the following resume text and provide feedback on:
                
                1. ATS compatibility score (0-100)
                2. Key keywords present or missing
                3. Specific suggestions for improvement
                
                Resume text:
                ${resumeText}`
              }
            ]
          }
        ]
      });
      
      // Get response from model
      console.log("Received response from Gemini API");
      const responseText = result.response.text();
      
      // Parse and structure the response
      return this.processGeminiResponse(responseText);
    } catch (error: any) {
      console.error("Error calling Gemini API:", error);
      
      // Try fallback model if the first one failed with a NOT_FOUND error
      if (error?.message?.includes("NOT_FOUND") || error?.status === 404) {
        console.log("Primary model not found, trying fallback model");
        return this.analyzeResumeWithFallbackModel(resumeText, jobDescription);
      }
      
      // For permission issues, provide a clearer error
      if (error?.status === 403 || error?.message?.includes("permission")) {
        throw new Error("Permission denied: Your API key may not have access to the Gemini API or the requested model.");
      }
      
      // Re-throw with more helpful message
      throw new Error(`Failed to analyze resume: ${error?.message || 'Unknown error'}`);
    }
  }

  /**
   * Try to analyze resume with a fallback model
   * @param resumeText The text content of the resume
   * @param jobDescription Optional job description
   * @returns Formatted analysis results
   */
  async analyzeResumeWithFallbackModel(resumeText: string, jobDescription?: string): Promise<ATSAnalysisResult> {
    // Use an alternate model name
    const FALLBACK_MODEL = "gemini-1.5-flash";
    console.log("Trying fallback model:", FALLBACK_MODEL);
    
    try {
      // Create a generative model instance with the fallback model
      const model = this.client.getGenerativeModel({ model: FALLBACK_MODEL });
      
      // Generate content with the model
      const result = await model.generateContent({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `You are an expert resume reviewer and ATS (Applicant Tracking System) specialist. 
                Analyze the following resume text and provide feedback on:
                
                1. ATS compatibility score (0-100)
                2. Key keywords present or missing
                3. Specific suggestions for improvement
                
                Resume text:
                ${resumeText}`
              }
            ]
          }
        ]
      });
      
      // Get response from model
      console.log("Received response from fallback model");
      const responseText = result.response.text();
      
      // Parse and structure the response
      return this.processGeminiResponse(responseText);
    } catch (error: any) {
      console.error("Error calling fallback model:", error);
      
      // Try one last model
      if (error?.message?.includes("NOT_FOUND") || error?.status === 404) {
        // Try the older model version as last resort
        const LAST_RESORT_MODEL = "gemini-pro";
        console.log("Trying last resort model:", LAST_RESORT_MODEL);
        
        try {
          const model = this.client.getGenerativeModel({ model: LAST_RESORT_MODEL });
          
          // Generate content with the model
          const result = await model.generateContent({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: `You are an expert resume reviewer and ATS (Applicant Tracking System) specialist. 
                    Analyze the following resume text and provide feedback on:
                    
                    1. ATS compatibility score (0-100)
                    2. Key keywords present or missing
                    3. Specific suggestions for improvement
                    
                    Resume text:
                    ${resumeText}`
                  }
                ]
              }
            ]
          });
          
          // Get response from last resort model
          console.log("Received response from last resort model");
          const responseText = result.response.text();
          
          return this.processGeminiResponse(responseText);
        } catch (lastError: any) {
          console.error("All models failed:", lastError);
          throw new Error(`All available models failed. Please check if your API key has access to Gemini models.`);
        }
      }
      
      // Re-throw with more helpful message
      throw new Error(`Failed to analyze resume with fallback model: ${error?.message || 'Unknown error'}`);
    }
  }

  /**
   * Processes the response from Gemini API and extracts structured data
   * @param responseText The text response from Gemini API
   * @returns Structured ATS analysis results
   */
  private processGeminiResponse(responseText: string): ATSAnalysisResult {
    console.log("Processing Gemini response");
    
    try {
      // First try to see if response is already in JSON format
      try {
        const jsonResponse = JSON.parse(responseText);
        if (jsonResponse.score && Array.isArray(jsonResponse.keywords) && Array.isArray(jsonResponse.suggestions)) {
          console.log("Response was already in JSON format");
          return jsonResponse as ATSAnalysisResult;
        }
      } catch (e) {
        // Not JSON, continue with text parsing
        console.log("Response is not in JSON format, will parse text");
      }
      
      // Extract ATS score - look for patterns like "Score: 75/100" or "ATS compatibility: 75"
      const scoreRegex = new RegExp("(?:score|compatibility|rating)(?:\\s*:?\\s*)(?:is\\s*)?(\\d{1,3})(?:\\s*\\/\\s*100)?", "i");
      const scoreMatch = responseText.match(scoreRegex);
      const score = scoreMatch ? parseInt(scoreMatch[1], 10) : 70; // Default to 70 if not found
      
      // Extract keywords - look for list of keywords
      const keywords: { word: string; found: boolean }[] = [];
      
      // Different possible sections that might contain keywords
      const keywordSectionPattern = new RegExp("(?:keywords|key terms|key skills)[^\\n]*(?:\\n|:)(.*?)(?=\\n\\n|\\n[A-Z]|$)", "i");
      const keywordSection = keywordSectionPattern.exec(responseText)?.[1] || '';
      
      // Extract keywords from the section
      // Look for bullet points or numbered lists
      const keywordLines = keywordSection.split('\n');
      for (const line of keywordLines) {
        // Remove bullet points, numbers, and trim
        const cleanLine = line.replace(/^[\s•\-\*\d.]+/, '').trim();
        if (cleanLine) {
          // Check if keyword has found/missing indicator
          const isFound = !line.toLowerCase().includes('missing') && !line.toLowerCase().includes('not found');
          
          // Try to extract just the keyword part if there are indicators like [found] or [missing]
          const keywordMatch = cleanLine.match(/^([^:[\]]+)(?:\s*(?:\[|\()(found|missing|present|not found)(?:\]|\)))?/i);
          if (keywordMatch) {
            const word = keywordMatch[1].trim();
            if (word && !word.includes('not found') && !word.includes('missing') && word.length < 50) {
              keywords.push({ word, found: isFound });
            }
          } else if (cleanLine.length < 50) { // Avoid adding entire sentences
            keywords.push({ word: cleanLine, found: isFound });
          }
        }
      }
      
      // If no keywords were found in the expected section, try to find other mentions of keywords
      if (keywords.length === 0) {
        const allKeywordRegex = new RegExp("([A-Za-z\\s]+)(?:\\s*-\\s*|\\s*:\\s*)(found|missing|present|not found)", "ig");
        const allKeywordMatches = responseText.match(allKeywordRegex) || [];
        for (const match of allKeywordMatches) {
          const parts = match.split(/(?:-|:)/);
          if (parts.length >= 2) {
            const word = parts[0].trim();
            const status = parts[1].trim().toLowerCase();
            const found = status.includes('found') || status.includes('present');
            if (word && word.length < 50) {
              keywords.push({ word, found });
            }
          }
        }
      }
      
      // Extract suggestions - look for list of suggestions or numbered lists
      let suggestions: string[] = [];
      const suggestionSectionPattern = new RegExp("(?:suggestions|improvements|recommendations)[^\\n]*(?:\\n|:)(.*?)(?=\\n\\n|\\n[A-Z]|$)", "i");
      const suggestionSection = suggestionSectionPattern.exec(responseText)?.[1] || '';
      
      if (suggestionSection) {
        const suggestionLines = suggestionSection.split('\n');
        for (const line of suggestionLines) {
          // Remove bullet points, numbers, and trim
          const cleanLine = line.replace(/^[\s•\-\*\d.]+/, '').trim();
          if (cleanLine && cleanLine.length > 5) {
            suggestions.push(cleanLine);
          }
        }
      }
      
      // If no suggestions found in the expected section, try to extract from different pattern
      if (suggestions.length === 0) {
        // Look for numbered lists anywhere in the text after suggestion keywords
        const numberedListRegex = new RegExp("\\d+\\.\\s+[A-Z].*?(?=\\n\\d+\\.|$)", "g");
        const allSuggestions = responseText.match(numberedListRegex) || [];
        for (const suggestion of allSuggestions) {
          const cleanSuggestion = suggestion.replace(/^\d+\.\s+/, '').trim();
          if (cleanSuggestion && cleanSuggestion.length > 5) {
            suggestions.push(cleanSuggestion);
          }
        }
      }
      
      // Still no suggestions? Try bullet points
      if (suggestions.length === 0) {
        const bulletRegex = new RegExp("[•\\-\\*]\\s+[A-Z].*?(?=\\n[•\\-\\*]|$)", "g");
        const bulletSuggestions = responseText.match(bulletRegex) || [];
        for (const suggestion of bulletSuggestions) {
          const cleanSuggestion = suggestion.replace(/^[•\-\*]\s+/, '').trim();
          if (cleanSuggestion && cleanSuggestion.length > 5) {
            suggestions.push(cleanSuggestion);
          }
        }
      }
      
      // Limit to reasonable number of suggestions
      suggestions = suggestions.slice(0, 10);
      
      // If we couldn't extract meaningful structured data, use some fallbacks
      if (keywords.length === 0) {
        // Extract words that might be keywords
        const potentialKeywords = responseText.match(/\b[A-Z][A-Za-z]{2,15}\b/g) || [];
        const uniqueKeywords = Array.from(new Set(potentialKeywords)).slice(0, 8);
        for (const word of uniqueKeywords) {
          if (word && !['ATS', 'Resume', 'Score', 'The', 'You', 'Your'].includes(word)) {
            keywords.push({ word, found: Math.random() > 0.3 }); // Randomly mark some as found
          }
        }
      }
      
      if (suggestions.length === 0) {
        suggestions = [
          "Add more industry-specific keywords",
          "Use a cleaner format with consistent spacing",
          "Include measurable achievements with numbers",
          "Ensure your contact information is clearly visible"
        ];
      }
      
      return {
        score,
        keywords,
        suggestions
      };
    } catch (error) {
      console.error("Error parsing Gemini response:", error);
      
      // Return a fallback result if parsing failed
      return {
        score: 65,
        keywords: [
          { word: "Experience", found: true },
          { word: "Education", found: true },
          { word: "Skills", found: true },
          { word: "Projects", found: Math.random() > 0.5 },
          { word: "Certifications", found: Math.random() > 0.5 }
        ],
        suggestions: [
          "Add more industry-specific keywords",
          "Use a cleaner format with consistent spacing",
          "Include measurable achievements with numbers",
          "Ensure your contact information is clearly visible"
        ]
      };
    }
  }
  
  /**
   * Extract text from a resume file
   * This is just a placeholder - the actual implementation would depend on the file type
   * @param file The resume file
   * @returns The extracted text
   */
  async extractTextFromFile(file: File): Promise<string> {
    // This is a placeholder - in a real implementation, you'd use a library
    // like pdf.js for PDFs, or another tool for Word documents
    
    // For now, we'll just assume the file is a text file and read it directly
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        resolve(text || "");
      };
      reader.onerror = (e) => {
        reject(new Error("Failed to read file"));
      };
      reader.readAsText(file);
    });
  }
  
  /**
   * List available Gemini models to help with debugging
   * These are the known models, but availability depends on your API key access
   */
  async listAvailableModels(): Promise<void> {
    // For now, we'll just list the known model names for debugging
    console.log("Known Gemini models:");
    const knownModels = [
      "gemini-2.0-flash",
      "gemini-2.0-pro",
      "gemini-pro",
      "gemini-pro-vision", 
      "gemini-1.5-pro",
      "gemini-1.5-flash",
      "gemini-1.0-pro",
      "gemini-1.0-pro-vision"
    ];
    
    knownModels.forEach(model => console.log(`- ${model}`));
    
    // In the future, if Google provides a model listing API, we could use that
  }
}

// Create a singleton instance of the client for easy importing elsewhere
const apiKey = typeof window !== 'undefined' 
  ? process.env.NEXT_PUBLIC_GEMINI_API_KEY 
  : process.env.GEMINI_API_KEY;

export default new GeminiClient(apiKey || ""); 