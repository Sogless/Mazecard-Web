"use client";

import { useEffect } from "react";
import Button from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

const benefits = [
  {
    title: "Structured Cooperative Spending Power",
    description:
      "Gain access to a growing base of cooperative members with pre-approved spending limits directed toward your business.",
  },
  {
    title: "Predictable Settlement Window",
    description:
      "Settlements are processed within a T+40 to T+60 window, giving you clear visibility into cash flow timelines.",
  },
  {
    title: "Growing Network of Cooperative Members",
    description:
      "As more cooperatives join MazeCard, your merchant profile reaches a wider pool of consistent spenders.",
  },
  {
    title: "No POS Setup Costs",
    description:
      "MazeCard works with your existing payment infrastructure. No new hardware or integration required.",
  },
];

const categories = [
  "Retail",
  "Grocery",
  "Fuel Stations",
  "Healthcare",
  "Education",
  "Agriculture Inputs",
];

const steps = [
  { number: 1, title: "Submit Application", description: "Fill out the merchant application form with your business details." },
  { number: 2, title: "Profile Review", description: "MazeCard reviews your business profile and eligibility." },
  { number: 3, title: "KYC Verification", description: "Complete the Know Your Customer verification process." },
  { number: 4, title: "Approval & Onboarding", description: "Get approved and onboarded into the merchant network." },
  { number: 5, title: "Start Accepting Payments", description: "Begin accepting MazeCard payments from cooperative members." },
];

export default function MerchantsPage() {
  useEffect(() => {
    trackEvent("view_merchants_page");
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-primary py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Get invited into a network designed to drive consistent spend.
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-10">
            MazeCard operates an invite-based merchant network with a predictable
            settlement window of T+40 to T+60.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/merchant/apply">Apply to Join the Network</Button>
            <Button href="/company/contact" variant="secondary">
              Talk to Sales
            </Button>
          </div>
        </div>
      </section>

      {/* How the Network Works */}
      <section className="bg-secondary py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">
            How the Network Works
          </h2>
          <div className="space-y-6 text-text-secondary text-base leading-relaxed">
            <p>
              MazeCard operates an <span className="text-maze-yellow font-semibold">invite-based merchant network</span>.
              Merchants are selectively onboarded to ensure quality, reliability, and alignment
              with the cooperative spending model.
            </p>
            <p>
              When a cooperative member makes a purchase at an approved merchant, the transaction
              is captured and settled within a <span className="text-maze-yellow font-semibold">T+40 to T+60 window</span>.
              This predictable settlement cycle allows merchants to plan cash flow with confidence
              while MazeCard manages repayment and collections on the member side.
            </p>
          </div>
        </div>
      </section>

      {/* Why Merchants Join */}
      <section className="bg-primary py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-text-primary mb-12 text-center">
            Why Merchants Join
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="bg-card border border-border-color rounded-xl p-6 hover:bg-card-hover transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {b.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Should Apply */}
      <section className="bg-secondary py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Who Should Apply
          </h2>
          <p className="text-text-secondary mb-10">
            We work with merchants across a range of essential categories, including but not limited to:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <span
                key={cat}
                className="border border-border-color text-text-secondary rounded-full px-5 py-2 text-sm hover:border-maze-yellow hover:text-maze-yellow transition-colors duration-200"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Merchant Onboarding Steps */}
      <section className="bg-primary py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-text-primary mb-12 text-center">
            Merchant Onboarding
          </h2>
          <div className="space-y-8">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-5 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-maze-yellow text-bg-primary font-bold flex items-center justify-center text-sm">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-text-primary font-semibold mb-1">
                    {step.title}
                  </h3>
                  <p className="text-text-muted text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button href="/merchant/apply">Apply to Join the Network</Button>
          </div>
        </div>
      </section>

      {/* Trust Line */}
      <section className="bg-secondary py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-text-muted text-sm">
            Cards are issued by partner banks. MazeCard provides the platform for
            eligibility, limits, repayment, and collections.
          </p>
        </div>
      </section>
    </main>
  );
}
