# 🧱 Replit Build Prompt: Mavro OS - Campaigns Tab System (Sprint 16 Extended)

## 📦 MODULE: CAMPAIGNS TAB

Create the following components:

### 1. `CampaignFeedGrid.jsx`
- Render cards with:
  - Campaign title, timeframe, goal
  - Status tags (Draft, Live, Completed, Archived)
  - Metrics: # of posts, total reach, engagement, CTA snippet, platforms used
  - Tag for A/B Test status (if applicable)

### 2. `CampaignDetailDrawer.jsx`
- Slides open when a campaign is clicked
- Show:
  - Title, start/end, primary CTA, persona vertical
  - Content list with preview cards for each post
  - Inline editing for caption, media, hashtags (if not yet posted)
- Sync with:
  - `scheduledPosts.json`
  - `CampaignComposer.js`
  - `CRM.json` (if lead data exists)

### 3. `ViViABTestingPanel.jsx`
- Built-in for any campaign with A/B testing active
- Show:
  - Variant A vs. B: Caption, hashtag, audio, media
  - Trend velocity score
  - Projected engagement rate
  - “ViVi Suggests” callout

### 4. `CampaignComposer.js`
- Backend module that receives campaign input
- Writes into `campaigns.json`
- Adds post objects into `scheduledPosts.json` with a `campaignId` reference

### 5. `A/BTestingEngine.js`
- Compare two post variants:
  - Caption / Hashtags / Audio / Media
- Uses:
  - `TrendTap Pro`
  - `ViViSentimentScanner`
  - `SocialListeningEngine`
- Returns result within 5–10 min

---

## 🗂 Data Models

### `campaigns.json`
```json
{
  "campaignId": "cmp-001",
  "title": "Summer Facial Push",
  "status": "Live",
  "persona": "medspa",
  "posts": ["pst-101", "pst-102"],
  "startDate": "...",
  "endDate": "...",
  "primaryCTA": "Book Now"
}
```

### `scheduledPosts.json` (update each post with):
```json
{
  "campaignId": "cmp-001",
  "status": "scheduled",
  "boostLevel": 2,
  "scheduledAt": "...",
  "platform": "Instagram",
  "autoApproved": true
}
```

---

## 💡 UX BEHAVIOR

- Clicking “Add to Campaign” from Magic Studio triggers `CampaignComposer` logic
- Campaigns reflect automatically in Scheduler
- A/B test results update posts and write to `missionLog.json`

---

## 🧠 STRATEGIC LAYER (Optional)

- Add `ViViCampaignInsights.js` to analyze:
  - Total reach, engagement, pacing, format performance
- Add `ViViPerformanceNudgeEngine()`:
  - Suggests improvements (“Switch to Reels,” “Try new hashtags”)

---

## 🔧 Optional JSON Files
- `campaigns.json`
- `postVariants.json` (for A/B tests)
- `missionLog.json`
