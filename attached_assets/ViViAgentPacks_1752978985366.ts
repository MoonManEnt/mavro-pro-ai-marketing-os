
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

export const applyAgentPack = (persona, packId) => {
  const pack = behaviorProfiles[packId];
  if (!pack) return persona;

  return {
    ...persona,
    tone: pack.tone,
    goals: "Promote " + pack.offers.join(", "),
    hashtags: pack.exampleHashtags.join(" ")
  };
};
