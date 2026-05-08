import Button from "@/components/ui/Button";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-bg-primary">
      {/* Hero */}
      <section className="px-6 pt-32 pb-16 text-center">
        <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight text-text-primary sm:text-5xl">
          Built to help cooperatives lend responsibly at scale.
        </h1>
      </section>

      {/* Narrative */}
      <section className="mx-auto max-w-3xl space-y-8 px-6 pb-20">
        <p className="text-lg leading-relaxed text-text-secondary">
          MazeCard is Credit Card as a Service—purpose-built for cooperatives.
          We provide the platform, the card rails, and the enforcement logic so
          cooperatives can offer structured monthly credit to their members
          without building banking infrastructure.
        </p>

        <p className="text-lg leading-relaxed text-text-secondary">
          Our platform handles eligibility, credit limits, card issuance (via
          partner banks), repayment tracking, default management, and
          collections. Whether you&apos;re a cooperative of 50 members or
          50,000, MazeCard scales with you.
        </p>

        <p className="text-lg leading-relaxed text-text-secondary">
          We believe cooperative credit should be transparent, fair, and
          recoverable. That&apos;s why every rule—from 0% interest on timely
          repayment to default fee escalation—is designed to protect both the
          cooperative and its members.
        </p>
      </section>

      {/* Trust line */}
      <section className="border-t border-border-color px-6 py-12">
        <p className="mx-auto max-w-2xl text-center text-sm text-text-muted">
          Cards are issued by partner banks. MazeCard provides the platform for
          eligibility, limits, repayment, and collections.
        </p>
      </section>

      {/* CTA */}
      <section className="px-6 pb-32 text-center">
        <Button href="/cooperative/create">Create Cooperative Profile</Button>
      </section>
    </main>
  );
}
