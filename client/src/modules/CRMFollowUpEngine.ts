import { generateWithViVi } from "../utils/viviClient";

export const generateFollowUpMessage = async (leadInfo: any, persona: any) => {
  const prompt = `Write a follow-up message for a lead named ${leadInfo.name} who showed interest in ${leadInfo.service}. Persona: ${persona.businessType}, tone: ${persona.tone}, goal: ${persona.goals}.`;
  const message = await generateWithViVi(prompt);
  return message;
};