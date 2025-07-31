export const behaviorProfiles = {
  medspa: {
    tone: "friendly",
    offers: ["Hydrafacials", "Botox", "Acne Treatments"],
    exampleHashtags: ["#glowup", "#selfcare", "#rejuvenate"]
  },
  real_estate: {
    tone: "professional",
    offers: ["Free Home Valuation", "Open Houses", "Pre-Approvals"],
    exampleHashtags: ["#justlisted", "#dreamhome", "#closingday"]
  },
  cleaning: {
    tone: "witty",
    offers: ["Deep Cleaning Specials", "Move-Out Clean", "Recurring Service"],
    exampleHashtags: ["#sparkleteam", "#cleanhousehappyhouse", "#spotless"]
  }
};

export const applyAgentPack = (persona: any, packId: string) => {
  const pack = behaviorProfiles[packId as keyof typeof behaviorProfiles];
  if (!pack) return persona;

  return {
    ...persona,
    tone: pack.tone,
    goals: "Promote " + pack.offers.join(", "),
    hashtags: pack.exampleHashtags.join(" ")
  };
};