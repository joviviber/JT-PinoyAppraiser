import { GoogleGenAI, Type } from "@google/genai";
import { PropertyDetails, AppraisalResult, MarketTrendsData, HeatmapData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_ID = "gemini-3-flash-preview";

export const getAppraisal = async (details: PropertyDetails): Promise<AppraisalResult> => {
  const prompt = `
    Act as a senior real estate appraiser in the Philippines. 
    Perform a valuation analysis for the following property:
    - Type: ${details.propertyType}
    - City/Location: ${details.city}
    - Building/Subdivision: ${details.buildingName || "N/A"}
    - Size: ${details.sizeSqm} sqm
    - Bedrooms: ${details.bedrooms}
    - Bathrooms: ${details.bathrooms}

    Provide a realistic estimated market value range in Philippine Pesos (PHP). 
    Consider current market trends in the Philippines, specifically for the city of ${details.city} and the development ${details.buildingName ? details.buildingName : ""}.
    
    Also generate a hypothetical 5-year price trend history based on general area performance.
    Provide 3 key highlights or factors affecting this specific valuation.
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_ID,
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

export const getMarketTrends = async (): Promise<MarketTrendsData> => {
  const today = new Date().toLocaleDateString('en-PH');
  const yesterday = new Date(Date.now() - 86400000).toLocaleDateString('en-PH');

  const prompt = `
    Find the 7 most recent and significant real estate news stories in the Philippines.
    
    Target Sources: Real Estate PH, Colliers Philippines, Leechiu Property Consultants, Inquirer Business, DHSUD, Department of Finance (DOF), BusinessWorld Philippines, PhilStar Property.
    
    Timeframe: Prioritize news from YESTERDAY (${yesterday}) or within the last 24-48 hours.
    
    Task:
    1. Search for the latest articles from these specific sources.
    2. Select the top 7 most impactful stories.
    3. Summarize each into a concise paragraph.
    4. Provide the direct URL to the source.

    Current Date: ${today}
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_ID,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            date: { type: Type.STRING, description: "Date of the digest (e.g. October 25, 2023)" },
            items: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  summary: { type: Type.STRING, description: "2-3 sentence summary" },
                  source: { type: Type.STRING, description: "Name of the publisher (e.g. Inquirer)" },
                  url: { type: Type.STRING, description: "Direct link to the article" }
                }
              }
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as MarketTrendsData;
    } else {
      throw new Error("No trend data returned");
    }
  } catch (error) {
    console.error("Market Trends Error:", error);
    throw error;
  }
};

export const getPriceHeatmap = async (location: string): Promise<HeatmapData> => {
  const prompt = `
    Generate a property price heatmap overview for: ${location}, Philippines.
    
    Task:
    1. Break down "${location}" into 6-9 key distinct sub-areas, villages, or districts (e.g. for Makati: Salcedo, Legaspi, Rockwell, etc.).
    2. For each sub-area, estimate the CURRENT average market value per square meter (PHP/sqm) for prime residential/condo properties.
    3. Categorize each area as: "Budget", "Mid-End", "High-End", or "Luxury".
    4. Provide a very short description (10 words) of the area's vibe.
    5. Estimate a Year-on-Year growth rate (e.g. "+5%", "Stable").
    6. Write a brief 2-sentence summary of the overall market status for ${location}.

    Ensure data is realistic based on current Philippine real estate market standards.
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_ID,
      contents: prompt,
      config: {
        systemInstruction: "You are an expert real estate data analyst for the Philippines.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            location: { type: Type.STRING },
            lastUpdated: { type: Type.STRING, description: "Current Month Year" },
            summary: { type: Type.STRING },
            zones: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  areaName: { type: Type.STRING },
                  avgPriceSqm: { type: Type.NUMBER },
                  priceLevel: { type: Type.STRING, enum: ["Budget", "Mid-End", "High-End", "Luxury"] },
                  description: { type: Type.STRING },
                  growthRate: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as HeatmapData;
    } else {
      throw new Error("No heatmap data returned");
    }
  } catch (error) {
    console.error("Heatmap Error:", error);
    throw error;
  }
};