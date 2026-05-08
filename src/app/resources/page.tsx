import Link from "next/link";

const resources = [
  {
    title: "FAQ — Cooperatives",
    description:
      "Common questions from cooperative administrators about onboarding, credit limits, repayment, and platform integration.",
    href: "/resources/faq-cooperatives",
  },
  {
    title: "FAQ — Merchants",
    description:
      "Everything merchants need to know about joining the MazeCard network, settlement timelines, and onboarding requirements.",
    href: "/resources/faq-merchants",
  },
  {
    title: "Risk & Repayment Policy",
    description:
      "Our full repayment schedule, default fee ladder, enforcement rules, and blacklist policy.",
    href: "/resources/risk-repayment-policy",
  },
];

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-primary text-primary">
      {/* Hero */}
      <section className="py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Resources</h1>
        <p className="text-lg text-muted max-w-2xl mx-auto">
          Everything you need to understand how MazeCard works.
        </p>
      </section>

      {/* Cards */}
      <section className="max-w-5xl mx-auto px-6 pb-24 grid gap-8 md:grid-cols-3">
        {resources.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            className="block rounded-2xl border border-color bg-card p-8 hover:border-maze-yellow transition-colors"
          >
            <h2 className="text-xl font-semibold mb-3 text-primary">
              {r.title}
            </h2>
            <p className="text-secondary text-sm leading-relaxed">
              {r.description}
            </p>
          </Link>
        ))}
      </section>
    </main>
  );
}
