
export const fetchAvailableSounds = async (platform) => {
  const trendingSounds = {
    instagram: [
      { id: "ig1", name: "Chill Wave", usageCount: 1423 },
      { id: "ig2", name: "Glow Up Loop", usageCount: 2019 }
    ],
    tiktok: [
      { id: "tt1", name: "FYP Anthem", usageCount: 5130 },
      { id: "tt2", name: "Viral Snap", usageCount: 3867 }
    ]
  };
  return trendingSounds[platform] || [];
};

export const suggestSoundByContentType = (contentType) => {
  const mapping = {
    reel: ["FYP Anthem", "Glow Up Loop"],
    story: ["Chill Wave", "Viral Snap"],
    video: ["Glow Up Loop", "Chill Wave"]
  };
  return mapping[contentType.toLowerCase()] || [];
};
