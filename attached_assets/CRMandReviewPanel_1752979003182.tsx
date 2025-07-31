
import React, { useState } from "react";
import { generateReviewResponse } from "../modules/ReviewResponseEngine";
import { generateFollowUpMessage } from "../modules/CRMFollowUpEngine";
import { loadPersonaProfile } from "../modules/ViViPersonaProfile";

const CRMandReviewPanel = () => {
  const persona = loadPersonaProfile();
  const [review, setReview] = useState("");
  const [lead, setLead] = useState({ name: "", service: "" });
  const [response, setResponse] = useState("");
  const [followup, setFollowup] = useState("");

  return (
    <div style={{ padding: "2rem" }}>
      <h2>💬 Review Response</h2>
      <textarea placeholder="Paste customer review..." value={review} onChange={(e) => setReview(e.target.value)} />
      <button onClick={async () => {
        const res = await generateReviewResponse(review, persona);
        setResponse(res);
      }}>Generate Response</button>
      <pre>{response}</pre>

      <h2>📧 Lead Follow-Up</h2>
      <input placeholder="Lead Name" onChange={(e) => setLead({ ...lead, name: e.target.value })} />
      <input placeholder="Interested Service" onChange={(e) => setLead({ ...lead, service: e.target.value })} />
      <button onClick={async () => {
        const msg = await generateFollowUpMessage(lead, persona);
        setFollowup(msg);
      }}>Generate Follow-Up</button>
      <pre>{followup}</pre>
    </div>
  );
};

export default CRMandReviewPanel;
