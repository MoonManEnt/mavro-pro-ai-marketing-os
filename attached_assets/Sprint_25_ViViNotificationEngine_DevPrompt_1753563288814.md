# 🔔 Replit Build Prompt: Sprint 25 – ViVi Notification Engine

## 🎯 GOAL
Create a global notification engine that surfaces key ViVi activities and system actions (auto-posts, campaign launches, CRM re-engagements, trend alerts) to the user in real-time.

---

## 🧱 COMPONENTS

### 1. `ViViNotificationEngine.js`
- Centralized logic hub to trigger notifications
- Input sources:
  - ViViAutoPoster
  - ViViAutoCampaignLauncher
  - CRMFollowUpEngine
  - ViViSentryMode

### 2. `ViViNotificationPanel.jsx`
- Sticky popup panel or floating bell icon
- Displays stack of most recent notifications
- Actionable where possible:
  - View campaign
  - Snooze
  - Dismiss
  - Schedule follow-up

### 3. `ViViNotificationStore.json`
- Stores most recent 25–50 messages
- Logs timestamp, category, description, action link

---

## 📁 NOTIFICATION TYPES

| Type | Example |
|------|---------|
| Campaign | “ViVi launched a regional campaign in 90210” |
| Post | “Your Reel was posted automatically 6 mins ago” |
| CRM | “5 leads have been cold for 10 days. Want to follow up?” |
| Trend | “#GlowUp is trending in Austin. Schedule a post now?” |

---

## 🔗 INTEGRATIONS

| Source Module | Behavior |
|---------------|----------|
| ViViAutoPoster | Logs post push with time/platform |
| CampaignComposer | Logs auto-launches |
| CRMFollowUpEngine | Triggers dormant lead alerts |
| ViViGPT | Can summarize latest nudges when asked |
| MissionLog | Logs all auto-actions for review

---

## ✅ OUTCOME

- Live system alerting
- Integrated nudge delivery
- Keeps user aware of ViVi’s automation activity
