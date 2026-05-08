type AnalyticsEvent =
  | "view_home"
  | "view_cooperatives_page"
  | "view_merchants_page"
  | "click_cta_cooperative"
  | "click_cta_merchant"
  | "cooperative_registration_started"
  | "cooperative_registration_completed"
  | "merchant_application_submitted"
  | "demo_scheduled"
  | "submit_coop_profile"
  | "submit_merchant_application"
  | "submit_contact_form"
  | "schedule_demo_request_submitted"
  | "schedule_demo_open"
  | "faq_viewed"
  | "policy_viewed";

export function trackEvent(event: AnalyticsEvent, properties?: Record<string, unknown>) {
  // Console logging for development; replace with PostHog/GA in production
  console.log("[Analytics]", event, properties || {});

  // Example PostHog integration (uncomment when ready):
  // if (typeof window !== 'undefined' && window.posthog) {
  //   window.posthog.capture(event, properties);
  // }
}
