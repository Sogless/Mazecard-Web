"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Coop {
  id: string;
  name: string;
  contactName: string;
  email: string;
  state: string;
  status: string;
  createdAt: string;
}

const statusColor: Record<string, string> = {
  CREATED: "bg-yellow-500/10 text-yellow-400",
  IN_REVIEW: "bg-blue-500/10 text-blue-400",
  APPROVED: "bg-green-500/10 text-green-400",
  REJECTED: "bg-red-500/10 text-red-400",
};

export default function AdminCooperatives() {
  const [items, setItems] = useState<Coop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/cooperatives")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch");
        return r.json();
      })
      .then((d) => { setItems(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">Cooperatives</h1>
      <div className="bg-bg-card border border-border-color rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-color text-left text-text-secondary">
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Contact</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">State</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-text-muted">Loading...</td></tr>
              ) : items.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-text-muted">No cooperatives yet</td></tr>
              ) : (
                items.map((c) => (
                  <tr key={c.id} className="border-b border-border-color hover:bg-bg-card-hover transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/admin/cooperatives/${c.id}`} className="text-maze-yellow hover:underline font-medium">{c.name}</Link>
                    </td>
                    <td className="px-6 py-4 text-text-secondary">{c.contactName}</td>
                    <td className="px-6 py-4 text-text-secondary">{c.email}</td>
                    <td className="px-6 py-4 text-text-secondary">{c.state}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${statusColor[c.status] || "bg-gray-500/10 text-gray-400"}`}>{c.status}</span>
                    </td>
                    <td className="px-6 py-4 text-text-muted">{new Date(c.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
