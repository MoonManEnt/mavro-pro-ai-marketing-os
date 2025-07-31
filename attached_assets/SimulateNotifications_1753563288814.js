import { pushNotification } from './ViViNotificationEngine';

export function simulateMockAlerts() {
  pushNotification({
    type: "campaign",
    message: "ViVi launched a regional campaign targeting ZIP 90210.",
    actionLink: "/campaigns/auto-90210"
  });

  pushNotification({
    type: "post",
    message: "AutoPoster published your Reel to Instagram 6 mins ago.",
    actionLink: "/scheduler"
  });

  pushNotification({
    type: "crm",
    message: "5 leads have gone cold for over 10 days. Want to follow up?",
    actionLink: "/crm"
  });

  pushNotification({
    type: "trend",
    message: "#GlowUp is surging in Austin. Schedule a post today?",
    actionLink: "/trends"
  });
}
