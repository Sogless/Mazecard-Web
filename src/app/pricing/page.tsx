import Button from "@/components/ui/Button";

const pricingComponents = [
  {
    title: "Program Setup",
    description: "One-time onboarding and configuration fee.",
  },
  {
    title: "Card Issuance",
    description:
      "Per-card issuance cost for physical Mastercard or Verve cards.",
  },
  {
    title: "Platform Usage",
    description:
      "Monthly platform fee based on active members and transaction volume.",
  },
  {
    title: "Merchant Network Services",
    description:
      "Fees associated with merchant settlement and network operations.",
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen text-text-primary">
      {/* Hero */}
      <section className="bg-primary px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            Pricing that matches cooperative scale.
          </h1>
          <p className="mt-6 text-lg text-text-secondary">
            MazeCard pricing is tailored to each cooperative through a
            structured SLA. No hidden fees.
          </p>
        </div>
      </section>

      {/* Pricing Components */}
      <section className="bg-secondary px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold">
            Pricing Components
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {pricingComponents.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border-color bg-card p-6 transition-colors hover:bg-card-hover"
              >
                <h3 className="text-xl font-semibold text-maze-yellow">
                  {item.title}
                </h3>
                <p className="mt-4 text-text-secondary">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Note */}
      <section className="bg-primary px-6 py-16 text-center">
        <div className="mx-auto max-w-3xl">
          <p className="text-lg text-text-secondary">
            Final pricing is defined in your SLA. Book a demo to discuss
            pricing tailored to your cooperative.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary px-6 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <Button href="/cooperative/create">Book a Demo</Button>
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
