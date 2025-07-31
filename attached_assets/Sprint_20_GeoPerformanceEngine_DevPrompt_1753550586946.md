# 🧠 Replit Build Prompt: Sprint 20 – GeoPerformanceEngine

## 🎯 GOAL
Develop `GeoPerformanceEngine.js`, a data analysis engine that feeds ViVi real-time regional insights used by:

- ViViAutoCampaignLauncher
- GeoSmartHeatmap
- CampaignExtensionEngine
- ViViGPT (region prompts)

---

## 🧠 MODULE FUNCTION

### `getGeoPerformanceSnapshot(persona)`
Returns array of regions with:
- zip
- city/state
- reach
- avgEngagement
- trendVelocity
- engagementSpike (% change vs. past week)
- topTrendingTag
- topTrendingAudio

---

## 🗂 FILES TO CREATE

| File | Description |
|------|-------------|
| `GeoPerformanceEngine.js` | Core logic module |
| `geoPostPerformance.json` | Mock regional content data |
| `geoTrendFeed.json` | Simulated TrendTap output per region |
| `geoRegionMap.json` | Maps post IDs → ZIP → Region

---

## 📁 SAMPLE DATA FORMAT

### geoPostPerformance.json
```json
{
  "90210": {
    "reach": 3250,
    "engagement": 140,
    "trendVelocity": 0.86,
    "engagementSpike": 36,
    "city": "Beverly Hills",
    "state": "CA",
    "topTrendingTag": "#luxuryfacial",
    "topTrendingAudio": "SZA - Saturn"
  },
  "78704": {
    "reach": 1980,
    "engagement": 75,
    "trendVelocity": 0.72,
    "engagementSpike": 18,
    "city": "Austin",
    "state": "TX",
    "topTrendingTag": "#atxmedspa",
    "topTrendingAudio": "Khalid - Skyline"
  }
}
```

---

## 🔗 INTEGRATIONS

| System | Behavior |
|--------|----------|
| ViViAutoCampaignLauncher | Detects which ZIPs to launch in |
| GeoSmartHeatmap | Visualizes this snapshot as regional heat layer |
| Scheduler | Flags regions with 2x/3x boost potential |
| Campaign Tab | Shows region-level breakout under each campaign |

---

## ✅ OUTPUT

ViVi now receives:
- Real-time regional signal scores
- Trending content by ZIP
- Boost triggers by geography

