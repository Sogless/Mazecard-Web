"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Merchant {
  id: string;
  businessName: string;
  category: string;
  contactName: string;
  email: string;
  status: string;
  createdAt: string;
}

const statusColor: Record<string, string> = {
  RECEIVED: "bg-yellow-500/10 text-yellow-400",
  IN_REVIEW: "bg-blue-500/10 text-blue-400",
  APPROVED: "bg-green-500/10 text-green-400",
  REJECTED: "bg-red-500/10 text-red-400",
};

export default function AdminMerchants() {
  const [items, setItems] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/merchants")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch");
        return r.json();
      })
      .then((d) => { setItems(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">Merchant Applications</h1>
      <div className="bg-bg-card border border-border-color rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-color text-left text-text-secondary">
                <th className="px-6 py-3 font-medium">Business Name</th>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium">Contact</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-text-muted">Loading...</td></tr>
              ) : items.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-text-muted">No merchant applications yet</td></tr>
              ) : (
                items.map((m) => (
                  <tr key={m.id} className="border-b border-border-color hover:bg-bg-card-hover transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/admin/merchants/${m.id}`} className="text-maze-yellow hover:underline font-medium">{m.businessName}</Link>
                    </td>
                    <td className="px-6 py-4 text-text-secondary">{m.category}</td>
                    <td className="px-6 py-4 text-text-secondary">{m.contactName}</td>
                    <td className="px-6 py-4 text-text-secondary">{m.email}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${statusColor[m.status] || "bg-gray-500/10 text-gray-400"}`}>{m.status}</span>
                    </td>
                    <td className="px-6 py-4 text-text-muted">{new Date(m.createdAt).toLocaleDateString()}</td>
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
