
export const forecastROI = (content, avgCTR = 0.04, conversionRate = 0.2, valuePerLead = 120) => {
  const estimatedViews = 1000 + Math.floor(Math.random() * 2000); // Mock
  const clicks = Math.floor(estimatedViews * avgCTR);
  const leads = Math.floor(clicks * conversionRate);
  const projectedRevenue = leads * valuePerLead;

  return {
    views: estimatedViews,
    clicks,
    leads,
    projectedRevenue
  };
};
