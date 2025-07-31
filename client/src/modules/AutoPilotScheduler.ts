import { generateWithViVi } from "../utils/viviClient";

export const generateMonthlyPlan = async (persona: any) => {
  const days = 30;
  const scheduled = [];

  for (let i = 1; i <= days; i++) {
    const prompt = `Generate a social media caption for a ${persona.businessType} targeting ${persona.audience}, focused on goal: ${persona.goals}. This is for Day ${i}.`;
    const content = await generateWithViVi(prompt);

    scheduled.push({
      day: i,
      content,
      platform: "instagram",
      time: "10:00 AM"
    });
  }

  return scheduled;
};