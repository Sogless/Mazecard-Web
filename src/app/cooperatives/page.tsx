"use client";

import Button from "@/components/ui/Button";

const pillars = [
  {
    title: "Card-based Credit Disbursement",
    description:
      "Issue physical Mastercard or Verve cards to eligible members. Funds are disbursed directly to cards—no cash handling, no bank transfers.",
  },
  {
    title: "Credit Rules that Match Cooperative Reality",
    description:
      "Limits are based on contribution history and consecutive monthly contributions. Rules can be customized via SLA between MazeCard and your cooperative.",
  },
  {
    title: "Recovery Built In",
    description:
      "Default fees are transparent: ₦5,000 flat + 1% (month 1), 2% (month 2), 3% (month 3+). Credit is suspended on default and halved after repayment. 3 defaults in 6 months triggers blacklisting.",
  },
];

const defaultFees = [
  { label: "Repayment date", value: "28th of each month" },
  { label: "Interest if repaid by 28th", value: "0%" },
  {
    label: "Default fees",
    value: "₦5,000 flat + 1% month 1, 2% month 2, 3% month 3+",
  },
  { label: "On default", value: "No more credit until fully repaid" },
  {
    label: "After repayment post-default",
    value: "Credit limit is halved",
  },
  {
    label: "3 defaults within 6 months",
    value: "Member is blacklisted",
  },
];

const onboardingSteps = [
  "Create your cooperative profile",
  "Schedule a demo with MazeCard",
  "Define credit rules and SLA",
  "Onboard members and issue cards",
  "Go live with card-based credit",
];

export default function CooperativesPage() {
  return (
    <main className="min-h-screen text-text-primary">
      {/* Hero */}
      <section className="bg-primary px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            Give your members credit—without building banking infrastructure.
          </h1>
          <p className="mt-6 text-lg text-text-secondary">
            Card-based disbursement. Contribution-based limits. Automated
            enforcement. MazeCard handles the full credit cycle so your
            cooperative can focus on growth.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/cooperative/create">
              Create Cooperative Profile
            </Button>
            <Button href="/cooperative/create" variant="outline">
              Book a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="bg-secondary px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold">What you get</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-xl border border-border-color bg-card p-6 transition-colors hover:bg-card-hover"
              >
                <h3 className="text-xl font-semibold text-maze-yellow">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-text-secondary">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility & Limits */}
      <section className="bg-primary px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold">
            Eligibility &amp; Limits
          </h2>
          <ul className="mt-10 space-y-4 text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-maze-yellow" />
              Credit limits determined by member contribution history
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-maze-yellow" />
              Minimum threshold of consecutive monthly contributions required
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-maze-yellow" />
              Limits can be defined/customized via SLA between MazeCard and the
              cooperative
            </li>
          </ul>
        </div>
      </section>

      {/* Repayment & Defaults */}
      <section className="bg-secondary px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold">
            Repayment &amp; Defaults
          </h2>
          <div className="mt-10 space-y-4">
            {defaultFees.map((item) => (
              <div
                key={item.label}
                className="flex flex-col justify-between gap-1 rounded-lg border border-border-color bg-card p-4 sm:flex-row sm:items-center sm:gap-4"
              >
                <span className="font-medium text-text-primary">
                  {item.label}
                </span>
                <span className="text-text-secondary">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operations & Integrations */}
      <section className="bg-primary px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold">
            Operations &amp; Integrations
          </h2>
          <ul className="mt-10 space-y-4 text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-maze-yellow" />
              MazeCard app for repayments and collections
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-maze-yellow" />
              Akilaah integration supported (flag-based)
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-maze-yellow" />
              KYC via MazeCard app or platforms like Akilaah
            </li>
          </ul>
        </div>
      </section>

      {/* Member Experience */}
      <section className="bg-secondary px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold">Member Experience</h2>
          <p className="mt-6 text-lg text-text-secondary">
            Members receive a physical debit card linked to their cooperative
            credit line. They can spend at any Mastercard or Verve terminal
            nationwide. Repayments happen through the MazeCard app, and members
            always have visibility into their limits, balances, and repayment
            schedules—no surprises, no hidden fees.
          </p>
        </div>
      </section>

      {/* Onboarding Steps */}
      <section className="bg-primary px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold">
            Get Started in 5 Steps
          </h2>
          <ol className="mt-12 space-y-6">
            {onboardingSteps.map((step, i) => (
              <li key={i} className="flex items-center gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-maze-yellow font-bold text-black">
                  {i + 1}
                </span>
                <span className="text-lg text-text-secondary">{step}</span>
              </li>
            ))}
          </ol>
          <div className="mt-12 text-center">
            <Button href="/cooperative/create">
              Create Cooperative Profile
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Line */}
      <section className="bg-secondary px-6 py-10">
        <p className="mx-auto max-w-3xl text-center text-sm text-text-muted">
          Cards are issued by partner banks. MazeCard provides the platform for
          eligibility, limits, repayment, and collections.
        </p>
      </section>
    </main>
  );
}
