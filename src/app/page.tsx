"use client";

import { useEffect } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import Button from "@/components/ui/Button";

export default function HomePage() {
  useEffect(() => {
    trackEvent("view_home");
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
            Credit Card as a Service<br />
            <span className="text-maze-yellow">for Cooperatives</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto mb-10">
            MazeCard empowers cooperatives with branded credit card programs that drive member engagement, increase revenue, and build financial inclusion across Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/cooperative/create" onClick={() => trackEvent("click_cta_cooperative")}>
              Register Your Cooperative
            </Button>
            <Button href="/merchant/apply" variant="secondary" onClick={() => trackEvent("click_cta_merchant")}>
              Become a Merchant
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Line */}
      <section className="py-12 px-6 border-t border-border-color">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-text-muted">
            Powered by Verve &amp; Mastercard networks &bull; PCI-DSS compliant &bull; CBN licensed partner
          </p>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-20 px-6 bg-bg-secondary">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-text-primary text-center mb-12">Why Cooperatives Choose MazeCard</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Member Engagement", desc: "Offer members a tangible benefit that increases loyalty and participation in cooperative activities." },
              { title: "New Revenue Streams", desc: "Earn interchange revenue on every transaction made by your members at partner merchants." },
              { title: "Financial Inclusion", desc: "Bring formal credit access to underserved communities through your trusted cooperative network." },
            ].map((item, i) => (
              <div key={i} className="bg-bg-card border border-border-color rounded-2xl p-8 hover:border-border-hover transition-colors card-glow">
                <h3 className="text-xl font-semibold text-maze-yellow mb-3">{item.title}</h3>
                <p className="text-text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-text-primary mb-6">Simple, Transparent Process</h2>
          <p className="text-text-secondary mb-10 max-w-2xl mx-auto">
            From registration to card issuance, we guide you through every step with dedicated support.
          </p>
          <Button href="/how-it-works" variant="outline">
            See How It Works
          </Button>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-text-primary mb-4">Ready to Transform Your Cooperative?</h2>
          <p className="text-text-secondary mb-8">
            Join the growing network of cooperatives leveraging MazeCard to serve their members better.
          </p>
          <Button href="/cooperative/create" onClick={() => trackEvent("click_cta_cooperative")}>
            Get Started Today
          </Button>
        </div>
      </section>
    </div>
  );
}
