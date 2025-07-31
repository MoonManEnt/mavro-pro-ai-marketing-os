
import React from "react";
import { forecastROI } from "../modules/ROIForecastEngine";
import { trackHashtagPerformance } from "../modules/HashtagPerformanceTracker";

const CampaignSuccessDashboard = ({ content, posts }) => {
  const roi = forecastROI(content);
  const tags = trackHashtagPerformance(posts || []);

  return (
    <div style={{ padding: "2rem", background: "#f7fff4", border: "1px solid #b6f2d5", borderRadius: "10px" }}>
      <h3>📊 Campaign Success Forecast</h3>
      <p><strong>Projected Views:</strong> {roi.views}</p>
      <p><strong>Estimated Clicks:</strong> {roi.clicks}</p>
      <p><strong>Projected Leads:</strong> {roi.leads}</p>
      <p><strong>Estimated Revenue:</strong> ${roi.projectedRevenue}</p>

      <h4>🏷️ Top Performing Hashtags</h4>
      <ul>
        {tags.map((tag, i) => (
          <li key={i}>{tag.tag}: Avg Engagement {Math.round(tag.averageEngagement)} (Used {tag.usageCount}x)</li>
        ))}
      </ul>
    </div>
  );
};

export default CampaignSuccessDashboard;
