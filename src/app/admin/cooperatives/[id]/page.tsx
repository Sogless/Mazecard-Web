"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Coop {
  id: string;
  name: string;
  address: string;
  state: string;
  lga: string;
  contactName: string;
  contactRole: string;
  email: string;
  phone: string;
  registrationType: string;
  registrationId: string;
  estimatedMemberCount: number;
  pilotCohortSize: number;
  preferredCardScheme: string;
  usesAkilaah: boolean;
  desiredLaunchTimeline: string;
  status: string;
  createdAt: string;
}

const statuses = ["CREATED", "IN_REVIEW", "APPROVED", "REJECTED"];

export default function CooperativeDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [coop, setCoop] = useState<Coop | null>(null);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/cooperatives/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch");
        return r.json();
      })
      .then((d) => { setCoop(d); setStatus(d.status); })
      .catch(() => {});
  }, [id]);

  const updateStatus = async () => {
    setSaving(true);
    await fetch(`/api/admin/cooperatives/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setSaving(false);
  };

  if (!coop) return <div className="text-text-muted">Loading...</div>;

  const fields = [
    ["Name", coop.name],
    ["Address", coop.address],
    ["State", coop.state],
    ["LGA", coop.lga],
    ["Contact Name", coop.contactName],
    ["Contact Role", coop.contactRole],
    ["Email", coop.email],
    ["Phone", coop.phone],
    ["Registration Type", coop.registrationType],
    ["Registration ID", coop.registrationId],
    ["Estimated Members", coop.estimatedMemberCount],
    ["Pilot Cohort Size", coop.pilotCohortSize],
    ["Card Scheme", coop.preferredCardScheme],
    ["Uses Akilaah", coop.usesAkilaah ? "Yes" : "No"],
    ["Launch Timeline", coop.desiredLaunchTimeline],
    ["Created", new Date(coop.createdAt).toLocaleString()],
  ];

  return (
    <div>
      <button onClick={() => router.push("/admin/cooperatives")} className="text-sm text-text-secondary hover:text-text-primary mb-4 inline-flex items-center gap-1">
        &larr; Back to Cooperatives
      </button>
      <h1 className="text-2xl font-bold text-text-primary mb-6">{coop.name}</h1>

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
            disabled={saving || status === coop.status}
            className="w-full bg-maze-yellow hover:bg-maze-yellow-hover text-black font-medium rounded-lg px-4 py-2.5 text-sm transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Status"}
          </button>
        </div>
      </div>
    </div>
  );
}
