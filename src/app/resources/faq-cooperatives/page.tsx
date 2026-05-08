"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import Button from "@/components/ui/Button";
import Link from "next/link";

const faqs = [
  {
    question: "Is MazeCard a bank?",
    answer:
      "No. MazeCard is not a bank. Cards are issued by partner commercial banks who hold funds and white-label the cards to MazeCard. MazeCard provides the platform for eligibility, credit limits, repayment, and collections.",
  },
  {
    question: "How are credit limits determined?",
    answer:
      "Limits are based on member contribution history and a minimum threshold of consecutive monthly contributions. Limits can also be customized via SLA between MazeCard and the cooperative.",
  },
  {
    question: "Do members pay interest?",
    answer:
      "Members pay 0% interest if their monthly spend is repaid before the 28th of each month.",
  },
  {
    question: "What happens if a member defaults?",
    answer:
      "A flat \u20A65,000 default fee applies, plus 1% of the amount owed in the first month after default, 2% in the second month, and 3% in the third month and beyond. Credit is suspended until the member fully repays. After repayment, their credit limit is halved. 3 defaults within a 6-month period results in blacklisting.",
  },
  {
    question: "Can we use our existing cooperative platform?",
    answer:
      "Yes. MazeCard supports integration with cooperative management platforms like Akilaah for collections, repayments, and KYC where applicable.",
  },
];

export default function FaqCooperativesPage() {
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
          FAQ — Cooperatives
        </h1>
        <p className="text-muted mb-12">
          Common questions from cooperative administrators.
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
