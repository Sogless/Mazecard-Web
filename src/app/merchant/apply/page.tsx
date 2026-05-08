"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

const inputClass =
  "w-full bg-bg-primary border border-border-color rounded-lg px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-maze-yellow transition-colors";
const labelClass = "block text-sm font-medium text-text-secondary mb-1.5";

const categories = [
  "Retail",
  "Grocery",
  "Fuel Station",
  "Healthcare",
  "Education",
  "Agriculture",
  "Restaurant & Food",
  "Other",
];

export default function MerchantApplyPage() {
  const [form, setForm] = useState({
    business_name: "",
    category: "",
    address: "",
    contact_name: "",
    email: "",
    phone: "",
    registration_id: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState("");

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const n = { ...prev };
      delete n[field];
      return n;
    });
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.business_name.trim()) e.business_name = "Business name is required";
    if (!form.category) e.category = "Category is required";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.contact_name.trim()) e.contact_name = "Contact name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email is required";
    if (!form.phone.trim() || form.phone.length < 7) e.phone = "Phone number is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setApiError("");
    trackEvent("submit_merchant_application");

    try {
      const res = await fetch("/api/merchant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setApiError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setApiError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-bg-card border border-border-color rounded-2xl p-8">
            <div className="w-16 h-16 maze-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-bg-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-text-primary mb-2">Application Received</h1>
            <p className="text-text-secondary text-sm mb-6">
              The merchant network is invite-based. Our team will review and reach out.
            </p>
            <Button href="/">Back to Home</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Apply to Join the Merchant Network
          </h1>
          <p className="text-text-secondary">
            Submit your application and our team will review your profile.
          </p>
        </div>

        <div className="bg-bg-card border border-border-color rounded-2xl p-8">
          {apiError && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-sm text-red-400 mb-6">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className={labelClass}>Business Name *</label>
              <input className={inputClass} value={form.business_name} onChange={(e) => update("business_name", e.target.value)} />
              {errors.business_name && <p className="text-red-400 text-xs mt-1">{errors.business_name}</p>}
            </div>

            <div>
              <label className={labelClass}>Category *</label>
              <select className={inputClass} value={form.category} onChange={(e) => update("category", e.target.value)}>
                <option value="">Select a category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category}</p>}
            </div>

            <div>
              <label className={labelClass}>Address *</label>
              <input className={inputClass} value={form.address} onChange={(e) => update("address", e.target.value)} />
              {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Contact Name *</label>
                <input className={inputClass} value={form.contact_name} onChange={(e) => update("contact_name", e.target.value)} />
                {errors.contact_name && <p className="text-red-400 text-xs mt-1">{errors.contact_name}</p>}
              </div>
              <div>
                <label className={labelClass}>Email *</label>
                <input type="email" className={inputClass} value={form.email} onChange={(e) => update("email", e.target.value)} />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Phone *</label>
                <input type="tel" className={inputClass} value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className={labelClass}>Business Registration ID</label>
                <input className={inputClass} value={form.registration_id} onChange={(e) => update("registration_id", e.target.value)} placeholder="Optional" />
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </form>
        </div>

        <p className="text-center text-xs text-text-muted mt-6">
          Cards are issued by partner banks. MazeCard provides the platform for eligibility, limits, repayment, and collections.
        </p>
      </div>
    </div>
  );
}
