# ♻️ Replit Build Prompt: Sprint 19 – ViVi Campaign Extension Engine

## 🎯 GOAL
Create a system that allows ViVi to autonomously:
- Extend live campaigns that are exceeding performance benchmarks
- End or pivot underperforming campaigns
- Re-schedule or clone high-performing posts into future sequences

---

## 🧠 MODULE FUNCTION

### `ViViCampaignExtensionEngine.js`

- Run as a logic loop that checks all `campaigns.json` entries marked as `Live`
- Evaluate:
  - Reach growth velocity
  - Engagement rate
  - ViViNudge impact logs
  - A/B test win ratios

### Actions ViVi may take:
- Extend campaign by adding 1–2 posts based on format that’s winning
- Pivot post style (e.g., switch from Story → Reels)
- Duplicate best-performing post and reboost
- Auto-archive failing campaigns and nudge user

---

## 🗂 FILES TO CREATE

| File | Description |
|------|-------------|
| `ViViCampaignExtensionEngine.js` | Core logic and scheduler loop |
| `campaignExtensionTriggers.json` | Define what “success” or “failure” means per persona |
| `extensionActivityLog.json` | Record of extensions made by ViVi |
| `CampaignExtensionNudge.jsx` | UI alert that campaign was auto-updated |

---

## 💾 SAMPLE TRIGGER LOGIC

```json
{
  "medspa": {
    "minEngagementRate": 0.025,
    "minReachVelocity": 1.1, // >10% increase per hour
    "maxPostSpacingHours": 6
  }
}
```

---

## 🔗 INTEGRATIONS

| System | Behavior |
|--------|----------|
| Scheduler | Newly added posts appear in upcoming view |
| Campaign Tab | Campaigns marked “Extended by ViVi” |
| Mission Log | Logged as extension event |
| ViViGPT | Accepts prompts: “Why did you extend that campaign?” |

---

## ✅ OUTPUT

ViVi will now manage campaigns like a strategist:
- Knows when to keep pushing
- Recycles wins
- Ends losers early
- Communicates actions to user clearly

