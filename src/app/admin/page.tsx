"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Stats {
  cooperatives: number;
  merchants: number;
  bookings: number;
  messages: number;
}

const cards = [
  { key: "cooperatives", label: "Cooperatives", href: "/admin/cooperatives", color: "text-yellow-400" },
  { key: "merchants", label: "Merchant Applications", href: "/admin/merchants", color: "text-blue-400" },
  { key: "bookings", label: "Demo Bookings", href: "/admin/bookings", color: "text-green-400" },
  { key: "messages", label: "Contact Messages", href: "/admin/messages", color: "text-purple-400" },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch");
        return r.json();
      })
      .then(setStats)
      .catch(() => {});
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <Link key={c.key} href={c.href} className="bg-bg-card border border-border-color rounded-2xl p-6 hover:border-border-hover transition-colors card-glow">
            <p className="text-sm text-text-secondary mb-1">{c.label}</p>
            <p className={`text-3xl font-bold ${c.color}`}>
              {stats ? stats[c.key as keyof Stats] : "—"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
