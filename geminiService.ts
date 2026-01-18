
import { GoogleGenAI, Type } from "@google/genai";
import { DetectionResult, Verdict } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const analyzeNews = async (text: string): Promise<DetectionResult> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the following news text for authenticity. Provide a detailed breakdown including a verdict, confidence score, and key findings. 
      
      News Text: "${text}"`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            verdict: {
              type: Type.STRING,
              description: "The final verdict: Real, Mostly Real, Mixed, Mostly Fake, Fake, or Unverifiable",
            },
            confidenceScore: {
              type: Type.NUMBER,
              description: "A numeric score from 0-100 indicating how certain the AI is.",
            },
            analysis: {
              type: Type.STRING,
              description: "A summary of the overall analysis.",
            },
            keyFindings: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "A list of bullet points highlighting specific red flags or confirmations.",
            },
          },
          required: ["verdict", "confidenceScore", "analysis", "keyFindings"],
        },
      },
    });

    const resultData = JSON.parse(response.text || "{}");
    
    // Extract sources from grounding metadata
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources: any[] = groundingChunks
      .filter((chunk: any) => chunk.web)
      .map((chunk: any) => ({
        title: chunk.web.title,
        uri: chunk.web.uri,
      }));

    return {
      verdict: resultData.verdict as Verdict,
      confidenceScore: resultData.confidenceScore,
      analysis: resultData.analysis,
      keyFindings: resultData.keyFindings,
      sources: sources,
    };
  } catch (error) {
    console.error("Error analyzing news:", error);
    throw new Error("Failed to analyze the news text. Please try again.");
  }
};
