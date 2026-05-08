"use client";

import { useEffect, useState } from "react";

interface Booking {
  id: string;
  cooperativeId: string;
  cooperative?: { name: string };
  preferredDate: string;
  timezone: string;
  topics: string[];
  notes: string;
  status: string;
  createdAt: string;
}

const statusColor: Record<string, string> = {
  PENDING: "bg-yellow-500/10 text-yellow-400",
  CONFIRMED: "bg-blue-500/10 text-blue-400",
  COMPLETED: "bg-green-500/10 text-green-400",
  CANCELLED: "bg-red-500/10 text-red-400",
};

const statuses = ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"];

export default function AdminBookings() {
  const [items, setItems] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/bookings")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch");
        return r.json();
      })
      .then((d) => { setItems(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setItems((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">Demo Bookings</h1>
      <div className="bg-bg-card border border-border-color rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-color text-left text-text-secondary">
                <th className="px-6 py-3 font-medium">Cooperative</th>
                <th className="px-6 py-3 font-medium">Preferred Date</th>
                <th className="px-6 py-3 font-medium">Timezone</th>
                <th className="px-6 py-3 font-medium">Topics</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-text-muted">Loading...</td></tr>
              ) : items.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-text-muted">No demo bookings yet</td></tr>
              ) : (
                items.map((b) => (
                  <tr key={b.id} className="border-b border-border-color hover:bg-bg-card-hover transition-colors">
                    <td className="px-6 py-4 text-text-primary font-medium">{b.cooperative?.name || b.cooperativeId.slice(0, 8)}</td>
                    <td className="px-6 py-4 text-text-secondary">{b.preferredDate}</td>
                    <td className="px-6 py-4 text-text-secondary">{b.timezone}</td>
                    <td className="px-6 py-4 text-text-secondary">
                      <div className="flex flex-wrap gap-1">
                        {(b.topics || []).map((t) => (
                          <span key={t} className="bg-bg-primary px-2 py-0.5 rounded text-xs">{t}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={b.status}
                        onChange={(e) => updateStatus(b.id, e.target.value)}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${statusColor[b.status] || "bg-gray-500/10 text-gray-400"}`}
                      >
                        {statuses.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 text-text-muted">{new Date(b.createdAt).toLocaleDateString()}</td>
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
