
import React, { useState } from "react";
import { generateMonthlyPlan } from "../modules/AutoPilotScheduler";
import { loadPersonaProfile } from "../modules/ViViPersonaProfile";

const AutoPilotDashboard = () => {
  const [plan, setPlan] = useState([]);
  const [loading, setLoading] = useState(false);
  const persona = loadPersonaProfile();

  const handleGenerate = async () => {
    setLoading(true);
    const posts = await generateMonthlyPlan(persona);
    setPlan(posts);
    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🚀 AutoPilot Monthly Plan</h2>
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate My 30-Day Plan"}
      </button>
      <ul>
        {plan.map((post, i) => (
          <li key={i}>
            <strong>Day {post.day}</strong>: {post.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AutoPilotDashboard;
