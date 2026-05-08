"use client";

import Button from "@/components/ui/Button";

const steps = [
  {
    number: 1,
    title: "Cooperative Setup",
    description:
      "Register your cooperative and define credit program parameters.",
  },
  {
    number: 2,
    title: "Member Eligibility",
    description:
      "Members are assessed based on contribution history and consecutive monthly contributions.",
  },
  {
    number: 3,
    title: "Limit Assignment",
    description:
      "Credit limits are set using MazeCard\u2019s model or custom SLA-defined rules.",
  },
  {
    number: 4,
    title: "Card Issuance",
    description:
      "Physical Mastercard or Verve cards are issued by partner banks.",
  },
  {
    number: 5,
    title: "Monthly Spend",
    description:
      "Members use cards at approved merchants within the MazeCard network.",
  },
  {
    number: 6,
    title: "Repayment & Enforcement",
    description:
      "Monthly repayment by the 28th at 0% interest. Defaults trigger transparent fee escalation and enforcement.",
  },
];

const controls = [
  {
    title: "Suspend on Default",
    description:
      "Credit is suspended immediately on default until fully repaid.",
  },
  {
    title: "Limit Halving",
    description:
      "After repayment post-default, the credit limit is halved.",
  },
  {
    title: "Blacklist Policy",
    description:
      "3 defaults within a 6-month period triggers permanent blacklisting.",
  },
  {
    title: "Multi-channel Collections",
    description:
      "Repayments via MazeCard app or cooperative platforms like Akilaah.",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen text-text-primary">
      {/* Hero */}
      <section className="bg-primary px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            A complete credit cycle—built for cooperative lending.
          </h1>
        </div>
      </section>

      {/* Flow */}
      <section className="bg-secondary px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold">How It Works</h2>
          <div className="mt-12 space-y-0">
            {steps.map((step, i) => (
              <div key={step.number} className="relative flex gap-6">
                {/* Connector line */}
                <div className="flex flex-col items-center">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-maze-yellow font-bold text-black">
                    {step.number}
                  </span>
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 bg-border-color" />
                  )}
                </div>
                {/* Content */}
                <div className="pb-10">
                  <h3 className="text-xl font-semibold text-maze-yellow">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-text-secondary">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="bg-primary px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold">
            Built-in Controls
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {controls.map((control) => (
              <div
                key={control.title}
                className="rounded-xl border border-border-color bg-card p-6 transition-colors hover:bg-card-hover"
              >
                <h3 className="text-xl font-semibold text-maze-yellow">
                  {control.title}
                </h3>
                <p className="mt-4 text-text-secondary">
                  {control.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary px-6 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <Button href="/cooperative/create">
            Create Cooperative Profile
          </Button>
        </div>
      </section>

      {/* Trust Line */}
      <section className="bg-primary px-6 py-10">
        <p className="mx-auto max-w-3xl text-center text-sm text-text-muted">
          Cards are issued by partner banks. MazeCard provides the platform for
          eligibility, limits, repayment, and collections.
        </p>
      </section>
    </main>
  );
}
