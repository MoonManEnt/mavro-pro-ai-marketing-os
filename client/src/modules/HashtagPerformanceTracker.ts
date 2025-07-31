export const trackHashtagPerformance = (posts: any[]) => {
  const hashtagMap: Record<string, { totalEngagement: number; count: number }> = {};
  
  posts.forEach(post => {
    const hashtags = post.hashtags || [];
    hashtags.forEach((tag: string) => {
      if (!hashtagMap[tag]) {
        hashtagMap[tag] = { totalEngagement: 0, count: 0 };
      }
      hashtagMap[tag].totalEngagement += post.engagement || 0;
      hashtagMap[tag].count += 1;
    });
  });

  return Object.entries(hashtagMap)
    .map(([tag, data]) => ({
      tag,
      averageEngagement: data.totalEngagement / data.count,
      usageCount: data.count
    }))
    .sort((a, b) => b.averageEngagement - a.averageEngagement)
    .slice(0, 5);
};