"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

type CoopData = {
  name: string;
  address: string;
  state: string | null;
  lga: string | null;
  contactName: string;
  contactRole: string;
  email: string;
  phone: string;
  estimatedMemberCount: number;
  pilotCohortSize: number;
  preferredCardScheme: string;
  usesAkilaah: boolean;
  desiredLaunchTimeline: string;
  status: string;
};

const demoTopics = [
  "Platform overview",
  "Credit rules & SLA setup",
  "Card issuance process",
  "Collections & repayment",
  "Akilaah integration",
];

const demoChecklist = [
  "Learn how the MazeCard platform works end-to-end",
  "Discuss credit rules, limits, and SLA customization",
  "Review the card issuance process with partner banks",
  "Understand repayment enforcement and default policies",
  "Plan your pilot launch timeline",
];

export default function DashboardClient({ coop }: { coop: CoopData }) {
  const [showBooking, setShowBooking] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [preferredDate, setPreferredDate] = useState("");
  const [notes, setNotes] = useState("");
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState("");

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  function toggleTopic(topic: string) {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  }

  async function submitBooking() {
    if (!selectedTopics.length || !preferredDate) {
      setBookingError("Please select at least one topic and a preferred date.");
      return;
    }

    setBookingLoading(true);
    setBookingError("");
    trackEvent("schedule_demo_request_submitted");

    try {
      const res = await fetch("/api/demo-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topics: selectedTopics,
          preferred_date: preferredDate,
          timezone,
          notes: notes || undefined,
        }),
      });

      if (res.ok) {
        setBookingSubmitted(true);
      } else {
        const data = await res.json();
        setBookingError(data.error || "Failed to submit. Please try again.");
      }
    } catch {
      setBookingError("Network error. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  }

  const inputClass =
    "w-full bg-bg-primary border border-border-color rounded-lg px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-maze-yellow transition-colors";

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Welcome, {coop.contactName}
          </h1>
          <p className="text-text-secondary">
            {coop.name} — Cooperative Dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Summary */}
          <div className="lg:col-span-2 bg-bg-card border border-border-color rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Profile Summary</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <InfoRow label="Cooperative Name" value={coop.name} />
              <InfoRow label="Address" value={`${coop.address}${coop.state ? `, ${coop.state}` : ""}${coop.lga ? ` (${coop.lga})` : ""}`} />
              <InfoRow label="Contact" value={`${coop.contactName} (${coop.contactRole})`} />
              <InfoRow label="Email" value={coop.email} />
              <InfoRow label="Phone" value={coop.phone} />
              <InfoRow label="Estimated Members" value={String(coop.estimatedMemberCount)} />
              <InfoRow label="Pilot Cohort" value={String(coop.pilotCohortSize)} />
              <InfoRow label="Card Scheme" value={coop.preferredCardScheme} />
              <InfoRow label="Uses Akilaah" value={coop.usesAkilaah ? "Yes" : "No"} />
              <InfoRow label="Launch Timeline" value={coop.desiredLaunchTimeline} />
            </div>

            <div className="mt-4 pt-4 border-t border-border-color">
              <button className="text-sm text-text-muted cursor-not-allowed" disabled>
                Edit Profile — Coming Soon
              </button>
            </div>
          </div>

          {/* Next Steps */}
          <div className="space-y-6">
            <div className="bg-bg-card border border-border-color rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-text-primary mb-4">Next Steps</h2>
              <Button
                className="w-full mb-4"
                onClick={() => {
                  setShowBooking(true);
                  trackEvent("schedule_demo_open");
                }}
              >
                Book a Demo
              </Button>

              <h3 className="text-sm font-medium text-text-secondary mb-2">
                What to expect on the demo
              </h3>
              <ul className="space-y-2">
                {demoChecklist.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-text-muted">
                    <span className="text-maze-yellow mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Demo Booking Modal */}
        {showBooking && !bookingSubmitted && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="bg-bg-card border border-border-color rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-text-primary mb-4">Book a Demo</h2>

              {bookingError && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-sm text-red-400 mb-4">
                  {bookingError}
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Topics (select all that apply) *
                  </label>
                  <div className="space-y-2">
                    {demoTopics.map((topic) => (
                      <label key={topic} className="flex items-center gap-2 text-sm text-text-primary cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedTopics.includes(topic)}
                          onChange={() => toggleTopic(topic)}
                          className="accent-[var(--maze-yellow)]"
                        />
                        {topic}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">
                    Preferred Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    className={inputClass}
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">
                    Timezone
                  </label>
                  <input className={inputClass} value={timezone} disabled />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">
                    Notes (optional)
                  </label>
                  <textarea
                    className={inputClass}
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Anything specific you'd like to discuss?"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button variant="outline" onClick={() => setShowBooking(false)}>Cancel</Button>
                  <Button onClick={submitBooking} disabled={bookingLoading}>
                    {bookingLoading ? "Submitting..." : "Submit Request"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Booking Confirmation */}
        {bookingSubmitted && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="bg-bg-card border border-border-color rounded-2xl p-8 max-w-md w-full text-center">
              <div className="w-16 h-16 maze-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-bg-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-text-primary mb-2">Demo Request Submitted</h2>
              <p className="text-text-secondary text-sm mb-6">
                Our team will review your request and confirm the demo schedule. You&apos;ll hear from us soon.
              </p>
              <Button onClick={() => { setShowBooking(false); setBookingSubmitted(false); }}>
                Back to Dashboard
              </Button>
            </div>
          </div>
        )}

        <p className="text-center text-xs text-text-muted mt-8">
          Cards are issued by partner banks. MazeCard provides the platform for eligibility, limits, repayment, and collections.
        </p>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-text-muted text-xs">{label}</p>
      <p className="text-text-primary">{value}</p>
    </div>
  );
}
