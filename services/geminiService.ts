
import { GoogleGenAI, Type } from "@google/genai";
import type { CampaignOutput } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const campaignSchema = {
  type: Type.OBJECT,
  properties: {
    coreMessaging: {
      type: Type.OBJECT,
      properties: {
        taglines: { type: Type.ARRAY, items: { type: Type.STRING } },
        valuePropositions: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
    },
    targetPersona: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING },
        demographics: { type: Type.STRING },
        goals: { type: Type.ARRAY, items: { type: Type.STRING } },
        challenges: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
    },
    socialMediaStrategy: {
      type: Type.OBJECT,
      properties: {
        platform: { type: Type.STRING },
        contentPillars: { type: Type.ARRAY, items: { type: Type.STRING } },
        samplePosts: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              platform: { type: Type.STRING },
              text: { type: Type.STRING },
              imagePrompt: { type: Type.STRING },
            },
          },
        },
      },
    },
    emailMarketing: {
      type: Type.OBJECT,
      properties: {
        subjectLines: { type: Type.ARRAY, items: { type: Type.STRING } },
        sampleEmail: {
          type: Type.OBJECT,
          properties: {
            subject: { type: Type.STRING },
            body: { type: Type.STRING },
          },
        },
      },
    },
    blogStrategy: {
      type: Type.OBJECT,
      properties: {
        postIdeas: { type: Type.ARRAY, items: { type: Type.STRING } },
        sampleOutline: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            outline: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
        },
      },
    },
  },
};

export const generateCampaign = async (
  productName: string,
  productDescription: string,
  targetAudience: string,
  goal: string
): Promise<CampaignOutput> => {
  const prompt = `
    Generate a comprehensive marketing campaign strategy for the following product/service.
    
    Product Name: ${productName}
    Description: ${productDescription}
    Target Audience: ${targetAudience}
    Primary Goal: ${goal}

    Create a detailed plan covering these key areas:
    1.  **Core Messaging:** Develop catchy taglines and clear value propositions.
    2.  **Target Persona:** Create a detailed profile of the ideal customer.
    3.  **Social Media Strategy:** Recommend a primary platform, define content pillars, and provide 3 sample posts with text and AI image generation prompts.
    4.  **Email Marketing:** Suggest compelling subject lines and draft a sample email.
    5.  **Blog Strategy:** Propose relevant blog post ideas and create a sample outline for one.

    Your response must be a valid JSON object that strictly adheres to the provided schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: campaignSchema,
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as CampaignOutput;

  } catch (error) {
    console.error("Error generating campaign from Gemini:", error);
    throw new Error("Failed to generate marketing campaign. The model may be unavailable or the request could not be processed.");
  }
};
