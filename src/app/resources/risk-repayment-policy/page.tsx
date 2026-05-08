"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import Link from "next/link";

export default function RiskRepaymentPolicyPage() {
  useEffect(() => {
    trackEvent("policy_viewed");
  }, []);

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
          Risk &amp; Repayment Policy
        </h1>
        <p className="text-muted mb-12">
          How MazeCard handles repayment, defaults, and credit enforcement.
        </p>

        <div className="space-y-10">
          {/* Repayment Date */}
          <div>
            <h2 className="text-xl font-semibold text-maze-yellow mb-2">
              Repayment Date
            </h2>
            <p className="text-secondary text-sm leading-relaxed">
              All monthly spend must be repaid before the 28th of each month.
            </p>
          </div>

          {/* Interest */}
          <div>
            <h2 className="text-xl font-semibold text-maze-yellow mb-2">
              Interest
            </h2>
            <p className="text-secondary text-sm leading-relaxed">
              Members pay 0% interest if repaid by the 28th.
            </p>
          </div>

          {/* Default Fee Ladder */}
          <div>
            <h2 className="text-xl font-semibold text-maze-yellow mb-2">
              Default Fee Ladder
            </h2>
            <ul className="space-y-2 text-secondary text-sm leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-maze-yellow shrink-0" />
                <span>
                  <strong className="text-primary">Flat fee:</strong> ₦5,000 on
                  default
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-maze-yellow shrink-0" />
                <span>
                  <strong className="text-primary">Month 1 after default:</strong>{" "}
                  1% of amount owed
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-maze-yellow shrink-0" />
                <span>
                  <strong className="text-primary">Month 2 after default:</strong>{" "}
                  2% of amount owed
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-maze-yellow shrink-0" />
                <span>
                  <strong className="text-primary">
                    Month 3+ after default:
                  </strong>{" "}
                  3% of amount owed
                </span>
              </li>
            </ul>
          </div>

          {/* Enforcement */}
          <div>
            <h2 className="text-xl font-semibold text-maze-yellow mb-2">
              Enforcement
            </h2>
            <ul className="space-y-2 text-secondary text-sm leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-maze-yellow shrink-0" />
                Credit is suspended immediately on default
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-maze-yellow shrink-0" />
                No further credit until the full amount is repaid
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-maze-yellow shrink-0" />
                After repayment post-default, credit limit is halved
              </li>
            </ul>
          </div>

          {/* Blacklist Policy */}
          <div>
            <h2 className="text-xl font-semibold text-maze-yellow mb-2">
              Blacklist Policy
            </h2>
            <p className="text-secondary text-sm leading-relaxed">
              Any member who defaults 3 times within a 6-month period is
              permanently blacklisted.
            </p>
          </div>

          {/* Configurable Portions */}
          <div>
            <h2 className="text-xl font-semibold text-maze-yellow mb-2">
              Configurable Portions
            </h2>
            <p className="text-secondary text-sm leading-relaxed">
              Eligibility criteria and credit limits may be customized via SLA
              between MazeCard and the cooperative.
            </p>
          </div>
        </div>

        {/* Trust line */}
        <div className="mt-16 pt-8 border-t border-color text-center">
          <p className="text-muted text-xs">
            This policy is enforced programmatically through the MazeCard
            platform. All terms are subject to the agreement between MazeCard
            and the cooperative.
          </p>
        </div>
      </section>
    </main>
  );
}
