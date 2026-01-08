import { GoogleGenAI, Type } from "@google/genai";
import { PropertyDetails, AppraisalResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAppraisal = async (details: PropertyDetails): Promise<AppraisalResult> => {
  const modelId = "gemini-3-flash-preview";

  const prompt = `
    Act as a senior real estate appraiser in the Philippines. 
    Perform a valuation analysis for the following property:
    - Type: ${details.propertyType}
    - Location: ${details.location}
    - Size: ${details.sizeSqm} sqm
    - Bedrooms: ${details.bedrooms}
    - Bathrooms: ${details.bathrooms}
    - Furnishing: ${details.furnishing}

    Provide a realistic estimated market value range in Philippine Pesos (PHP). 
    Consider current market trends in the Philippines (e.g., POGO exodus effects, post-pandemic recovery, infrastructure projects like Subway/MRT-7).
    
    Also generate a hypothetical 5-year price trend history based on general area performance.
    Provide 3 key highlights or factors affecting this specific valuation.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: "You are Pinoy Appraiser, a helpful and accurate real estate AI assistant.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            minPrice: { type: Type.NUMBER, description: "Minimum estimated value in PHP" },
            maxPrice: { type: Type.NUMBER, description: "Maximum estimated value in PHP" },
            averagePrice: { type: Type.NUMBER, description: "Average estimated value in PHP" },
            currency: { type: Type.STRING, description: "Always PHP" },
            analysis: { type: Type.STRING, description: "A comprehensive market analysis paragraph (approx 100 words)." },
            priceTrend: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  year: { type: Type.STRING },
                  price: { type: Type.NUMBER }
                }
              },
              description: "5 year historical trend data"
            },
            comparableHighlights: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of 3 key factors influencing this price"
            }
          },
          required: ["minPrice", "maxPrice", "averagePrice", "currency", "analysis", "priceTrend", "comparableHighlights"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AppraisalResult;
    } else {
      throw new Error("No data returned from AI");
    }
  } catch (error) {
    console.error("Gemini Appraisal Error:", error);
    throw error;
  }
};