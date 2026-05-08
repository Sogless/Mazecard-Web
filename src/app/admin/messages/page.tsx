"use client";

import { useEffect, useState } from "react";

interface Message {
  id: string;
  name: string;
  email: string;
  type: string;
  message: string;
  createdAt: string;
}

const typeColor: Record<string, string> = {
  sales: "bg-yellow-500/10 text-yellow-400",
  partnership: "bg-blue-500/10 text-blue-400",
  support: "bg-green-500/10 text-green-400",
};

export default function AdminMessages() {
  const [items, setItems] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/messages")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch");
        return r.json();
      })
      .then((d) => { setItems(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">Contact Messages</h1>
      <div className="space-y-3">
        {loading ? (
          <div className="text-text-muted text-center py-8">Loading...</div>
        ) : items.length === 0 ? (
          <div className="text-text-muted text-center py-8">No messages yet</div>
        ) : (
          items.map((m) => (
            <div
              key={m.id}
              className="bg-bg-card border border-border-color rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setExpanded(expanded === m.id ? null : m.id)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-bg-card-hover transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${typeColor[m.type] || "bg-gray-500/10 text-gray-400"}`}>{m.type}</span>
                  <span className="text-sm font-medium text-text-primary">{m.name}</span>
                  <span className="text-sm text-text-secondary">{m.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-text-muted">{new Date(m.createdAt).toLocaleDateString()}</span>
                  <svg className={`w-4 h-4 text-text-muted transition-transform ${expanded === m.id ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </button>
              {expanded === m.id && (
                <div className="px-6 pb-4 border-t border-border-color pt-4">
                  <p className="text-sm text-text-secondary whitespace-pre-wrap">{m.message}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
