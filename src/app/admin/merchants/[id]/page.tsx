"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Merchant {
  id: string;
  businessName: string;
  category: string;
  address: string;
  contactName: string;
  email: string;
  phone: string;
  registrationId: string;
  status: string;
  createdAt: string;
}

const statuses = ["RECEIVED", "IN_REVIEW", "APPROVED", "REJECTED"];

export default function MerchantDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/merchants/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch");
        return r.json();
      })
      .then((d) => { setMerchant(d); setStatus(d.status); })
      .catch(() => {});
  }, [id]);

  const updateStatus = async () => {
    setSaving(true);
    await fetch(`/api/admin/merchants/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setSaving(false);
  };

  if (!merchant) return <div className="text-text-muted">Loading...</div>;

  const fields = [
    ["Business Name", merchant.businessName],
    ["Category", merchant.category],
    ["Address", merchant.address],
    ["Contact Name", merchant.contactName],
    ["Email", merchant.email],
    ["Phone", merchant.phone],
    ["Registration ID", merchant.registrationId],
    ["Created", new Date(merchant.createdAt).toLocaleString()],
  ];

  return (
    <div>
      <button onClick={() => router.push("/admin/merchants")} className="text-sm text-text-secondary hover:text-text-primary mb-4 inline-flex items-center gap-1">
        &larr; Back to Merchants
      </button>
      <h1 className="text-2xl font-bold text-text-primary mb-6">{merchant.businessName}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-bg-card border border-border-color rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map(([label, value]) => (
              <div key={label as string}>
                <p className="text-xs text-text-muted mb-1">{label}</p>
                <p className="text-sm text-text-primary">{value || "—"}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-bg-card border border-border-color rounded-2xl p-6 h-fit">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Update Status</h2>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full bg-bg-primary border border-border-color rounded-lg px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-maze-yellow mb-4"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <button
            onClick={updateStatus}
            disabled={saving || status === merchant.status}
            className="w-full bg-maze-yellow hover:bg-maze-yellow-hover text-black font-medium rounded-lg px-4 py-2.5 text-sm transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Status"}
          </button>
        </div>
      </div>
    </div>
  );
}
