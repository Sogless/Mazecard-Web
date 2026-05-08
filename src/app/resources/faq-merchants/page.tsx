"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import Button from "@/components/ui/Button";
import Link from "next/link";

const faqs = [
  {
    question: "How do I join the MazeCard merchant network?",
    answer:
      "The merchant network is invite-based. You can apply to join by submitting an application. Our team will review your profile and reach out if approved.",
  },
  {
    question: "When do I get settled?",
    answer:
      "Merchant settlement window is T+40 to T+60 from the date of transaction.",
  },
  {
    question: "What do I need for onboarding?",
    answer:
      "You\u2019ll need to provide basic business details (business name, category, address, contact information) and complete KYC verification.",
  },
];

export default function FaqMerchantsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    trackEvent("faq_viewed");
  }, []);

  const toggle = (i: number) =>
    setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <main className="min-h-screen bg-primary text-primary">
      <section className="max-w-3xl mx-auto px-6 py-20">
        <Link
          href="/resources"
          className="text-sm text-muted hover:text-maze-yellow mb-8 inline-block"
        >
          &larr; Back to Resources
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          FAQ — Merchants
        </h1>
        <p className="text-muted mb-12">
          Everything merchants need to know about the MazeCard network.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-color bg-card overflow-hidden"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left font-medium text-primary hover:text-maze-yellow transition-colors"
              >
                <span>{faq.question}</span>
                <span className="ml-4 text-xl leading-none">
                  {openIndex === i ? "−" : "+"}
                </span>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5 text-secondary text-sm leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
