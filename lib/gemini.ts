import { GoogleGenAI, Type } from "@google/genai";
import { MarketIntelligence } from "@/types";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || "" });

export async function generateMarketIntelligence(input: {
  businessName: string;
  productService: string;
  valueProp: string;
  targetMarket?: string;
  priceRange?: string;
}): Promise<MarketIntelligence> {
  const model = "gemini-3.1-pro-preview";

  const prompt = `
    SYSTEM ROLE: Senior B2B market intelligence analyst and GTM strategist.
    OBJECTIVE: Generate a structured dataset for precise B2B targeting and outreach.
    
    INPUT DATA:
    Business Name: ${input.businessName}
    Product / Service: ${input.productService}
    Primary Value Proposition: ${input.valueProp}
    Target Market: ${input.targetMarket || "Not specified"}
    Price Range: ${input.priceRange || "Not specified"}

    Follow these steps:
    STEP 1: Analyze the business and define the optimal ICP.
    STEP 2: Identify 10-15 real companies matching the ICP.
    STEP 3: Identify key decision-makers for each company (CEO, CTO, COO, Head of Ops, etc.).
    STEP 4: Analyze behavioral intelligence for these roles.
    STEP 5: Recommend tailored outreach strategies.

    QUALITY RULES:
    1. Prioritize REAL companies and REAL executives.
    2. Do not fabricate emails — use patterns when exact emails are unknown.
    3. Ensure LinkedIn Profile URLs are valid and follow the format: https://www.linkedin.com/in/[username]/
    4. Prefer widely recognized business databases.
    5. Ensure all outputs remain structured and consistent.
    6. If a LinkedIn URL is unknown, use a search link: https://www.google.com/search?q=linkedin+[FullName]+[Company]
  `;

  const response = await ai.models.generateContent({
    model,
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          icp: {
            type: Type.OBJECT,
            properties: {
              profile: {
                type: Type.OBJECT,
                properties: {
                  primaryIndustries: { type: Type.ARRAY, items: { type: Type.STRING } },
                  secondaryIndustries: { type: Type.ARRAY, items: { type: Type.STRING } },
                  idealCompanySize: { type: Type.STRING },
                  idealRevenueRange: { type: Type.STRING },
                  geographicFocus: { type: Type.STRING },
                  businessMaturity: { type: Type.STRING },
                  operationalComplexity: { type: Type.STRING },
                  technologyAdoption: { type: Type.STRING },
                },
                required: ["primaryIndustries", "secondaryIndustries", "idealCompanySize", "idealRevenueRange", "geographicFocus", "businessMaturity", "operationalComplexity", "technologyAdoption"]
              },
              painPoints: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    category: { type: Type.STRING },
                    description: { type: Type.STRING },
                  },
                  required: ["category", "description"]
                }
              },
              currentSolutions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    category: { type: Type.STRING },
                    examples: { type: Type.ARRAY, items: { type: Type.STRING } },
                  },
                  required: ["category", "examples"]
                }
              },
              buyingTriggers: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    event: { type: Type.STRING },
                    description: { type: Type.STRING },
                  },
                  required: ["event", "description"]
                }
              },
              budgetProfile: {
                type: Type.OBJECT,
                properties: {
                  allocation: { type: Type.STRING },
                  cycleLength: { type: Type.STRING },
                },
                required: ["allocation", "cycleLength"]
              },
              successMetrics: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    kpi: { type: Type.STRING },
                    impact: { type: Type.STRING },
                  },
                  required: ["kpi", "impact"]
                }
              },
            },
            required: ["profile", "painPoints", "currentSolutions", "buyingTriggers", "budgetProfile", "successMetrics"]
          },
          companies: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                website: { type: Type.STRING },
                industry: { type: Type.STRING },
                headquarters: { type: Type.STRING },
                employees: { type: Type.STRING },
                revenue: { type: Type.STRING },
                fundingStatus: { type: Type.STRING },
                techStack: { type: Type.STRING },
                growthSignals: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ["name", "website", "industry", "headquarters", "employees", "revenue", "fundingStatus", "techStack", "growthSignals"]
            }
          },
          decisionMakers: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                fullName: { type: Type.STRING },
                jobTitle: { type: Type.STRING },
                company: { type: Type.STRING },
                linkedinUrl: { type: Type.STRING },
                background: { type: Type.STRING },
                authorityLevel: { type: Type.STRING },
                responsibilities: { type: Type.STRING },
                priorities: { type: Type.STRING },
                kpis: { type: Type.STRING },
                email: { type: Type.STRING },
                emailPattern: { type: Type.STRING },
              },
              required: ["id", "fullName", "jobTitle", "company", "linkedinUrl", "background", "authorityLevel", "responsibilities", "priorities", "kpis"]
            }
          },
          behavioralIntelligence: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                decisionMakerId: { type: Type.STRING },
                activityLevel: { type: Type.STRING },
                contentTopics: { type: Type.ARRAY, items: { type: Type.STRING } },
                interests: { type: Type.ARRAY, items: { type: Type.STRING } },
                strategicInitiatives: { type: Type.STRING },
                communicationStyle: { type: Type.STRING },
              },
              required: ["decisionMakerId", "activityLevel", "contentTopics", "interests", "strategicInitiatives", "communicationStyle"]
            }
          },
          outreachStrategies: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                decisionMakerId: { type: Type.STRING },
                bestChannel: { type: Type.STRING },
                timingTrigger: { type: Type.STRING },
                messagingAngle: { type: Type.STRING },
                personalizationHook: { type: Type.STRING },
                exampleMessage: { type: Type.STRING },
              },
              required: ["decisionMakerId", "bestChannel", "timingTrigger", "messagingAngle", "personalizationHook", "exampleMessage"]
            }
          },
        },
        required: ["icp", "companies", "decisionMakers", "behavioralIntelligence", "outreachStrategies"]
      }
    }
  });

  if (!response.text) {
    throw new Error("No response from Gemini");
  }

  return JSON.parse(response.text);
}
