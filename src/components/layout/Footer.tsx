import Link from "next/link";

const footerSections = [
  {
    title: "Product",
    links: [
      { label: "For Cooperatives", href: "/cooperatives" },
      { label: "For Merchants", href: "/merchants" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQ — Cooperatives", href: "/resources/faq-cooperatives" },
      { label: "FAQ — Merchants", href: "/resources/faq-merchants" },
      { label: "Risk & Repayment Policy", href: "/resources/risk-repayment-policy" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/company/about" },
      { label: "Contact", href: "/company/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border-color">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold text-text-primary mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-muted hover:text-maze-yellow transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border-color">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 maze-gradient rounded" />
              <span className="text-sm font-bold text-text-primary">
                Maze<span className="text-maze-yellow">Card</span>
              </span>
            </div>
            <p className="text-xs text-text-muted text-center">
              Cards are issued by partner banks. MazeCard provides the platform for eligibility, limits, repayment, and collections.
            </p>
            <p className="text-xs text-text-muted">&copy; {new Date().getFullYear()} MazeCard. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
