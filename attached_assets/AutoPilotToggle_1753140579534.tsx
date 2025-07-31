
import React, { useState } from "react";

const AutoPilotToggle = ({ onToggle }) => {
  const [enabled, setEnabled] = useState(false);

  const handleToggle = () => {
    setEnabled(!enabled);
    onToggle(!enabled);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h3>🚀 AutoPilot Mode</h3>
      <label>
        <input type="checkbox" checked={enabled} onChange={handleToggle} />
        Enable ViVi to run your marketing automatically
      </label>
    </div>
  );
};

export default AutoPilotToggle;
