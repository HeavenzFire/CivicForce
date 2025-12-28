import { GoogleGenAI } from "@google/genai";
import { DeliverableType, CampaignState } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDeliverable = async (
  type: DeliverableType,
  campaign: CampaignState
): Promise<string> => {
  
  let systemInstruction = "You are a strategic legal and communications expert for a nonviolent civic action group. Your tone is clear, fierce, uncompromising, yet dignified and legally grounded. You protect life and hold profit accountable.";
  
  let prompt = "";

  const context = `
    Target: ${campaign.target}
    Industry: ${campaign.industry}
    Harm/Issue: ${campaign.harm}
    Specific Demand: ${campaign.demand}
  `;

  switch (type) {
    case DeliverableType.DECLARATION:
      prompt = `Draft a one-page **Public Declaration of Nonviolence and Purpose**.
      ${context}
      
      Requirements:
      1. Assert leadership and moral authority.
      2. Explicitly pledge nonviolence to preserve legal cover.
      3. List 3 concrete demands based on the harm and demand provided.
      4. Tone: Resolute, no threats, only consequences.
      `;
      break;

    case DeliverableType.CHARTER:
      prompt = `Draft a **One-Page Charter** for a core team (The 144).
      ${context}
      
      Requirements:
      1. Define membership rules (strict adherence to nonviolence).
      2. Define governance (transparent, mission-first).
      3. Define ethics (truthfulness, legal compliance).
      `;
      break;

    case DeliverableType.PLAN:
      prompt = `Create a **30-Day Campaign Plan** tailored to this specific target.
      ${context}
      
      Requirements:
      1. Break down into Week 1 (Foundation), Week 2 (Narrative), Week 3 (Pressure), Week 4 (Escalation).
      2. Include specific tactics relevant to the ${campaign.industry} industry.
      3. Define a "Metric to hit" by day 30.
      `;
      break;

    case DeliverableType.EVIDENCE:
      prompt = `Create an **Evidence Packet Template** structure for this target.
      ${context}
      
      Requirements:
      1. Outline sections for "Incident Reports", "Regulatory Filings", and "Witness Statements".
      2. Provide placeholder text where the user should insert specific dates and data points regarding ${campaign.harm}.
      3. specific questions to ask whistleblowers.
      `;
      break;
    
    case DeliverableType.RESOLUTION:
      prompt = `Draft a **Shareholder Resolution** or **Regulatory Complaint** summary.
      ${context}
      
      Requirements:
      1. Use formal legal/corporate language.
      2. Cite general principles of fiduciary duty or safety regulations relevant to ${campaign.industry}.
      3. clearly state the financial liability of the lethal negligence.
      `;
      break;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        thinkingConfig: { thinkingBudget: 0 } 
      }
    });

    return response.text || "Failed to generate content.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to the strategic engine. Please check your API key.";
  }
};