import { pushNotification } from './ViViNotificationEngine';

export function simulateMockAlerts() {
  // Initial notifications on app load
  setTimeout(() => {
    pushNotification({
      type: "campaign",
      message: "ViVi launched a regional campaign targeting ZIP 90210.",
      actionLink: "/campaigns/auto-90210"
    });
  }, 2000);

  setTimeout(() => {
    pushNotification({
      type: "post",
      message: "AutoPoster published your Reel to Instagram 6 mins ago.",
      actionLink: "/scheduler"
    });
  }, 4000);

  setTimeout(() => {
    pushNotification({
      type: "crm",
      message: "5 leads have gone cold for over 10 days. Want to follow up?",
      actionLink: "/crm"
    });
  }, 6000);

  setTimeout(() => {
    pushNotification({
      type: "trend",
      message: "#GlowUp is surging in Austin. Schedule a post today?",
      actionLink: "/trends"
    });
  }, 8000);

  // Continue with periodic notifications
  setInterval(() => {
    const randomNotifications = [
      {
        type: "campaign",
        message: "ViVi optimized your Houston campaign - ROI increased 23%",
        actionLink: "/campaigns/houston-opt"
      },
      {
        type: "post",
        message: "Your LinkedIn post received 47 new engagement actions",
        actionLink: "/analytics/linkedin"
      },
      {
        type: "crm",
        message: "New lead Sarah M. showed high interest in your fitness program",
        actionLink: "/crm/lead/sarah-m"
      },
      {
        type: "trend",
        message: "#WellnessWednesday is trending - perfect for your content strategy",
        actionLink: "/content/trends"
      }
    ];

    const randomNotif = randomNotifications[Math.floor(Math.random() * randomNotifications.length)];
    pushNotification(randomNotif);
  }, 30000); // Every 30 seconds
}