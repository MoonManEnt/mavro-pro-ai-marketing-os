
import { generateWithViVi } from "../utils/viviClient";

export const generateReviewResponse = async (review, persona) => {
  const prompt = `You are a helpful assistant responding to a customer review for a ${persona.businessType} in ${persona.location}. Tone: ${persona.tone}. Review: "${review}"`;
  const response = await generateWithViVi(prompt);
  return response;
};
