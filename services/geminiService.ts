import { GoogleGenAI, Type } from "@google/genai";
import { PropertyDetails, AppraisalResult, MarketTrendsData, HeatmapData } from "../types";

// Initialize AI only if API key is present
const apiKey = process.env.API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const MODEL_ID = "gemini-3-flash-preview";

// --- MOCK DATA GENERATORS ---

const generateMockAppraisal = (details: PropertyDetails): AppraisalResult => {
  // Approximate base rates per city for simulation
  const cityRates: Record<string, number> = {
    "makati": 250000,
    "taguig": 240000,
    "bgc": 280000,
    "pasay": 210000,
    "mandaluyong": 180000,
    "ortigas": 190000,
    "pasig": 170000,
    "quezon city": 160000,
    "manila": 150000,
    "paranaque": 140000,
    "cebu": 145000,
    "davao": 135000
  };

  const normalizedCity = details.city.toLowerCase();
  let baseRate = 120000; // Default base rate
  
  // Find matching rate
  for (const [key, rate] of Object.entries(cityRates)) {
    if (normalizedCity.includes(key)) {
      baseRate = rate;
      break;
    }
  }

  // Adjustments based on property type
  if (details.propertyType === "House and Lot") baseRate = baseRate * 0.75; 
  if (details.propertyType === "Townhouse") baseRate = baseRate * 0.85;
  if (details.propertyType === "Vacant Lot") baseRate = baseRate * 0.60;
  if (details.propertyType === "Commercial Space") baseRate = baseRate * 1.4;

  const totalValue = baseRate * details.sizeSqm;
  // Add some randomness +/- 12%
  const variance = totalValue * 0.12; 
  
  const averagePrice = Math.round(totalValue);
  const minPrice = Math.round(totalValue - variance);
  const maxPrice = Math.round(totalValue + variance);

  return {
    minPrice,
    maxPrice,
    averagePrice,
    currency: "PHP",
    analysis: `(Simulated Analysis) Based on current market trends for ${details.propertyType} properties in ${details.city}, the market remains stable with a positive outlook. The location ${details.buildingName ? 'at ' + details.buildingName : ''} suggests good potential for value appreciation due to accessibility and demand in the area. Prices in ${details.city} have shown resilience compared to the previous quarter.`,
    priceTrend: [
      { year: "2020", price: Math.round(averagePrice * 0.82) },
      { year: "2021", price: Math.round(averagePrice * 0.86) },
      { year: "2022", price: Math.round(averagePrice * 0.91) },
      { year: "2023", price: Math.round(averagePrice * 0.96) },
      { year: "2024", price: averagePrice }
    ],
    comparableHighlights: [
      "Proximity to key business districts enhances value.",
      "Consistent demand for this property type in the area.",
      "Comparable sales indicate a 5-10% year-on-year growth."
    ]
  };
};

const mockNewsItems = [
  {
    title: "Metro Manila Residential Market Stable in Q4",
    summary: "Property values in key business districts have maintained stability despite global economic shifts, with luxury segments leading the growth.",
    source: "Real Estate PH",
    url: "#"
  },
  {
    title: "Infrastructure Projects Driving Provincial Growth",
    summary: "New expressways and railway projects are boosting land values in Pampanga, Cavite, and Laguna areas.",
    source: "BusinessWorld",
    url: "#"
  },
  {
    title: "Demand for Green Buildings on the Rise",
    summary: "Tenants and investors are increasingly prioritizing sustainability-certified buildings, commanding higher rental yields.",
    source: "Inquirer Property",
    url: "#"
  },
  {
    title: "BPO Sector Fuels Office Space Recovery",
    summary: "Renewed leasing activity from IT-BPM companies is reducing vacancy rates in PEZA-accredited zones.",
    source: "Colliers PH",
    url: "#"
  },
  {
    title: "Tourism Rebound Boosts Hotel & Resort Investments",
    summary: "Increased tourist arrivals are encouraging developers to expand leisure portfolios in Cebu and Palawan.",
    source: "PhilStar",
    url: "#"
  },
  {
    title: "Mid-Income Segment Dominates Housing Loan Takeout",
    summary: "Banks report a surge in housing loans for mid-market condominium units and house-and-lot packages.",
    source: "Manila Bulletin",
    url: "#"
  },
  {
    title: "REITs Provide Stable Outlook for Property Investors",
    summary: "Real Estate Investment Trusts continue to offer attractive dividend yields amidst market volatility.",
    source: "DOF News",
    url: "#"
  }
];

const getMockHeatmap = (location: string): HeatmapData => {
  return {
    location: location,
    lastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    summary: `(Simulated) The market in ${location} shows healthy activity with specific zones outperforming the general average.`,
    zones: [
      { areaName: "Central Business District", avgPriceSqm: 280000, priceLevel: "Luxury", description: "Prime commercial and residential core.", growthRate: "+6%" },
      { areaName: "North Sector", avgPriceSqm: 180000, priceLevel: "Mid-End", description: "Emerging mixed-use developments.", growthRate: "+4%" },
      { areaName: "West Executive Village", avgPriceSqm: 220000, priceLevel: "High-End", description: "Established exclusive subdivision.", growthRate: "+3%" },
      { areaName: "East Residential", avgPriceSqm: 140000, priceLevel: "Budget", description: "Affordable density housing.", growthRate: "+2%" },
      { areaName: "South Commercial Hub", avgPriceSqm: 250000, priceLevel: "High-End", description: "New retail and lifestyle centers.", growthRate: "+8%" },
      { areaName: "Heritage District", avgPriceSqm: 160000, priceLevel: "Mid-End", description: "Traditional housing area.", growthRate: "Stable" }
    ]
  };
};

// --- API FUNCTIONS ---

export const getAppraisal = async (details: PropertyDetails): Promise<AppraisalResult> => {
  // 1. Fallback if no API key is configured
  if (!ai) {
    console.warn("API Key missing. Returning simulated valuation data.");
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
    return generateMockAppraisal(details);
  }

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
    // 2. Fallback if API call fails
    return generateMockAppraisal(details);
  }
};

export const getMarketTrends = async (): Promise<MarketTrendsData> => {
  // Fallback if no API key
  if (!ai) {
    console.warn("API Key missing. Returning simulated market trends.");
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      date: new Date().toLocaleDateString('en-PH', { month: 'long', day: 'numeric', year: 'numeric' }),
      items: mockNewsItems
    };
  }

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
    // Fallback on error
    return {
      date: today,
      items: mockNewsItems
    };
  }
};

export const getPriceHeatmap = async (location: string): Promise<HeatmapData> => {
  // Fallback if no API key
  if (!ai) {
    console.warn("API Key missing. Returning simulated heatmap data.");
    await new Promise(resolve => setTimeout(resolve, 1200));
    return getMockHeatmap(location);
  }

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
    // Fallback on error
    return getMockHeatmap(location);
  }
};