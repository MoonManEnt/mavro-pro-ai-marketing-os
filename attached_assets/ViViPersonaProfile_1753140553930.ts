
export const defaultPersonaProfile = {
  businessType: "",
  location: "",
  audience: "",
  tone: "friendly",
  goals: "",
  services: "",
  competitors: "",
  contentTypes: [],
  frequency: "",
  platforms: [],
  hashtags: "",
  objections: "",
  topOffers: ""
};

export const savePersonaProfile = (profile) => {
  localStorage.setItem("viviPersonaProfile", JSON.stringify(profile));
};

export const loadPersonaProfile = () => {
  const stored = localStorage.getItem("viviPersonaProfile");
  return stored ? JSON.parse(stored) : defaultPersonaProfile;
};
