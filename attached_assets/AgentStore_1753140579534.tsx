
import React from "react";

const AgentStore = ({ onInstall }) => {
  const packs = [
    { id: "real_estate", name: "Real Estate Growth Pack" },
    { id: "gym_owner", name: "Fitness Funnel Toolkit" },
    { id: "hvac", name: "HVAC Smart Leads Pack" },
  ];

  return (
    <div style={{ padding: "1rem" }}>
      <h3>🧩 ViVi Agent Store</h3>
      <ul>
        {packs.map((pack) => (
          <li key={pack.id}>
            {pack.name}
            <button onClick={() => onInstall(pack.id)}>Install</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgentStore;
