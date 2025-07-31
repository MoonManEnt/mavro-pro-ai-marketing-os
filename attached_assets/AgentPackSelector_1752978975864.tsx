
import React from "react";
import { loadPersonaProfile, savePersonaProfile } from "../modules/ViViPersonaProfile";
import { applyAgentPack } from "../modules/ViViAgentPacks";

const AgentPackSelector = () => {
  const handleSelect = (packId) => {
    const profile = loadPersonaProfile();
    const updated = applyAgentPack(profile, packId);
    savePersonaProfile(updated);
    alert("ViVi Pack installed for " + packId);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h3>🧠 Install a ViVi Agent Pack</h3>
      <button onClick={() => handleSelect("medspa")}>MedSpa</button>
      <button onClick={() => handleSelect("real_estate")}>Real Estate</button>
      <button onClick={() => handleSelect("cleaning")}>Cleaning</button>
    </div>
  );
};

export default AgentPackSelector;
