# 📊 Replit Build Prompt: Sprint 23 – Reports Page (FourSIGHT v2) in Mavro OS

## 🎯 GOAL
Design and implement the new `ReportsPage.jsx` inside Mavro OS. This page replaces the original FourSIGHT module and acts as the central analytics hub for all ViVi and user-driven performance data.

---

## 🧱 PAGE STRUCTURE

### Main File:
- `ReportsPage.jsx`: Full-page container with modular, scrollable layout

### Key Components to Build:

| Component | Purpose |
|-----------|---------|
| `OverviewMetricsCard.jsx` | High-level KPIs: reach, leads, boost usage, top platform |
| `PlatformPerformanceCard.jsx` | Bar/donut chart: reach, CTR, engagement by platform |
| `PostFormatEfficacyCard.jsx` | Shows which formats convert best (Reel, Story, etc.) |
| `CampaignOutcomeCard.jsx` | Displays all campaigns, ViVi grades, conversion stats |
| `GeoRegionBreakoutCard.jsx` | Top ZIPs, heatmap logic from GeoSmart |
| `LeadPipelineCard.jsx` | Lead status and performance funnel (from CRM) |
| `ViViImpactCard.jsx` | Tracks how ViVi’s decisions improved performance |
| `ViViRecommendationsPanel.jsx` | Context-aware insights powered by ViVi |
| `reportExportService.js` | PDF/CSV generation logic |
| `useReportData.js` | Aggregates JSON from campaigns, CRM, ViVi logs |

---

## 🔗 DATA SOURCES

- `scheduledPosts.json` – For post-level platform/format/boost data
- `campaigns.json` – For campaign analytics
- `leads.json` – For CRM/funnel insights
- `geoPostPerformance.json` – For ZIP-level trend data
- `missionLog.json` – For ViVi actions (boosts, captions, campaigns)
- `TrendTap Pro` – To show trend-based performance
- `ViViStrategyMemory.js` – For historic format/tone effectiveness
- `ViViABTestEngine.js` – For win/loss analysis of variants

---

## 🧠 FUNCTIONAL REQUIREMENTS

- Collapsible data cards
- Live filtering: Date range, persona, format, platform
- All visual cards must be exportable (CSV or PDF)
- Each ViVi-related module should link to source (e.g., click a nudge → show post or lead it affected)

---

## 🛠 DESIGN REQUIREMENTS

- Responsive grid layout (desktop/tablet/mobile)
- Tailwind style: `rounded-2xl`, `bg-white`, `shadow-md`, `text-gray-900`
- Card titles in `text-lg font-semibold mb-2`
- Consistent spacing: `p-4`, `gap-4`, etc.

---

## ✅ OUTPUT

A highly visual, deeply integrated Reports tab that gives SMBs total oversight and proves ViVi’s strategic impact.

