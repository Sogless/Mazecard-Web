"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Button from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

type FormData = {
  cooperative_name: string;
  registration_type: string;
  registration_id: string;
  address: string;
  state: string;
  lga: string;
  contact_name: string;
  contact_role: string;
  email: string;
  phone: string;
  estimated_member_count: string;
  pilot_cohort_size: string;
  preferred_card_scheme: string;
  uses_akilaah: string;
  desired_launch_timeline: string;
  password: string;
  confirm_password: string;
};

const initialData: FormData = {
  cooperative_name: "",
  registration_type: "",
  registration_id: "",
  address: "",
  state: "",
  lga: "",
  contact_name: "",
  contact_role: "",
  email: "",
  phone: "",
  estimated_member_count: "",
  pilot_cohort_size: "",
  preferred_card_scheme: "Either",
  uses_akilaah: "false",
  desired_launch_timeline: "0–30 days",
  password: "",
  confirm_password: "",
};

const steps = [
  "Cooperative Details",
  "Program Intent",
  "Verification Uploads",
  "Admin Account",
];

const inputClass =
  "w-full bg-bg-primary border border-border-color rounded-lg px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-maze-yellow transition-colors";
const labelClass = "block text-sm font-medium text-text-secondary mb-1.5";

export default function CooperativeCreatePage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  function update(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const n = { ...prev };
      delete n[field];
      return n;
    });
  }

  function validateStep(): boolean {
    const e: Record<string, string> = {};

    if (step === 0) {
      if (!form.cooperative_name.trim()) e.cooperative_name = "Cooperative name is required";
      if (!form.address.trim()) e.address = "Address is required";
      if (!form.contact_name.trim()) e.contact_name = "Contact name is required";
      if (!form.contact_role.trim()) e.contact_role = "Contact role is required";
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email is required";
      if (!form.phone.trim() || form.phone.length < 7) e.phone = "Phone number is required";
    }

    if (step === 1) {
      if (!form.estimated_member_count || parseInt(form.estimated_member_count) < 1) e.estimated_member_count = "Must have at least 1 member";
      if (!form.pilot_cohort_size || parseInt(form.pilot_cohort_size) < 1) e.pilot_cohort_size = "Must have at least 1 in pilot";
    }

    if (step === 3) {
      if (form.password.length < 8) e.password = "Password must be at least 8 characters";
      if (form.password !== form.confirm_password) e.confirm_password = "Passwords do not match";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (validateStep()) {
      setStep((s) => s + 1);
    }
  }

  function prev() {
    setStep((s) => s - 1);
  }

  async function handleSubmit() {
    if (!validateStep()) return;
    setLoading(true);
    setApiError("");

    trackEvent("submit_coop_profile");

    try {
      const res = await fetch("/api/cooperative", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setApiError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      // Auto sign in
      const signInResult = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (signInResult?.ok) {
        router.push("/cooperative/dashboard");
      } else {
        router.push("/signin");
      }
    } catch {
      setApiError("Network error. Please try again.");
      setLoading(false);
    }
  }

  function FieldError({ field }: { field: string }) {
    return errors[field] ? (
      <p className="text-red-400 text-xs mt-1">{errors[field]}</p>
    ) : null;
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Create Cooperative Profile
          </h1>
          <p className="text-text-secondary">
            Set up your cooperative on MazeCard in a few steps.
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-between mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    i <= step
                      ? "bg-maze-yellow text-bg-primary"
                      : "bg-bg-card text-text-muted border border-border-color"
                  }`}
                >
                  {i + 1}
                </div>
                <span className="text-xs text-text-muted mt-1 hidden sm:block">{s}</span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`flex-1 h-px mx-2 ${
                    i < step ? "bg-maze-yellow" : "bg-border-color"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="bg-bg-card border border-border-color rounded-2xl p-8">
          {apiError && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-sm text-red-400 mb-6">
              {apiError}
            </div>
          )}

          {/* Step 1: Cooperative Details */}
          {step === 0 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-text-primary mb-4">Cooperative Details</h2>

              <div>
                <label className={labelClass}>Cooperative Name *</label>
                <input className={inputClass} value={form.cooperative_name} onChange={(e) => update("cooperative_name", e.target.value)} />
                <FieldError field="cooperative_name" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Registration Type</label>
                  <input className={inputClass} value={form.registration_type} onChange={(e) => update("registration_type", e.target.value)} placeholder="e.g. CAC, State" />
                </div>
                <div>
                  <label className={labelClass}>Registration ID</label>
                  <input className={inputClass} value={form.registration_id} onChange={(e) => update("registration_id", e.target.value)} />
                </div>
              </div>

              <div>
                <label className={labelClass}>Address *</label>
                <input className={inputClass} value={form.address} onChange={(e) => update("address", e.target.value)} />
                <FieldError field="address" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>State</label>
                  <input className={inputClass} value={form.state} onChange={(e) => update("state", e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>LGA</label>
                  <input className={inputClass} value={form.lga} onChange={(e) => update("lga", e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Contact Name *</label>
                  <input className={inputClass} value={form.contact_name} onChange={(e) => update("contact_name", e.target.value)} />
                  <FieldError field="contact_name" />
                </div>
                <div>
                  <label className={labelClass}>Contact Role *</label>
                  <input className={inputClass} value={form.contact_role} onChange={(e) => update("contact_role", e.target.value)} placeholder="e.g. President, Treasurer" />
                  <FieldError field="contact_role" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Email *</label>
                  <input type="email" className={inputClass} value={form.email} onChange={(e) => update("email", e.target.value)} />
                  <FieldError field="email" />
                </div>
                <div>
                  <label className={labelClass}>Phone *</label>
                  <input type="tel" className={inputClass} value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                  <FieldError field="phone" />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Program Intent */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-text-primary mb-4">Program Intent</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Estimated Member Count *</label>
                  <input type="number" min="1" className={inputClass} value={form.estimated_member_count} onChange={(e) => update("estimated_member_count", e.target.value)} />
                  <FieldError field="estimated_member_count" />
                </div>
                <div>
                  <label className={labelClass}>Pilot Cohort Size *</label>
                  <input type="number" min="1" className={inputClass} value={form.pilot_cohort_size} onChange={(e) => update("pilot_cohort_size", e.target.value)} />
                  <FieldError field="pilot_cohort_size" />
                </div>
              </div>

              <div>
                <label className={labelClass}>Preferred Card Scheme *</label>
                <select className={inputClass} value={form.preferred_card_scheme} onChange={(e) => update("preferred_card_scheme", e.target.value)}>
                  <option value="Either">Either</option>
                  <option value="Mastercard">Mastercard</option>
                  <option value="Verve">Verve</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Does your cooperative use Akilaah? *</label>
                <select className={inputClass} value={form.uses_akilaah} onChange={(e) => update("uses_akilaah", e.target.value)}>
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Desired Launch Timeline *</label>
                <select className={inputClass} value={form.desired_launch_timeline} onChange={(e) => update("desired_launch_timeline", e.target.value)}>
                  <option value="0–30 days">0–30 days</option>
                  <option value="30–60 days">30–60 days</option>
                  <option value="60–90 days">60–90 days</option>
                  <option value="90+ days">90+ days</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 3: Verification Uploads */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-text-primary mb-4">Verification Uploads</h2>
              <p className="text-text-secondary text-sm mb-4">
                These documents are optional for now. You can provide them later during onboarding.
              </p>

              <div>
                <label className={labelClass}>Proof of Registration</label>
                <input type="file" className={inputClass} accept=".pdf,.jpg,.jpeg,.png" />
              </div>

              <div>
                <label className={labelClass}>Board Authorization Letter</label>
                <input type="file" className={inputClass} accept=".pdf,.jpg,.jpeg,.png" />
              </div>

              <div>
                <label className={labelClass}>Admin ID</label>
                <input type="file" className={inputClass} accept=".pdf,.jpg,.jpeg,.png" />
              </div>
            </div>
          )}

          {/* Step 4: Admin Account */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-text-primary mb-4">Admin Account</h2>
              <p className="text-text-secondary text-sm mb-4">
                Create your admin account to access the cooperative dashboard.
              </p>

              <div>
                <label className={labelClass}>Email</label>
                <input type="email" className={inputClass} value={form.email} disabled />
                <p className="text-xs text-text-muted mt-1">This is the email from Step 1.</p>
              </div>

              <div>
                <label className={labelClass}>Password *</label>
                <input type="password" className={inputClass} value={form.password} onChange={(e) => update("password", e.target.value)} placeholder="Min. 8 characters" />
                <FieldError field="password" />
              </div>

              <div>
                <label className={labelClass}>Confirm Password *</label>
                <input type="password" className={inputClass} value={form.confirm_password} onChange={(e) => update("confirm_password", e.target.value)} />
                <FieldError field="confirm_password" />
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border-color">
            {step > 0 ? (
              <Button variant="outline" onClick={prev}>Back</Button>
            ) : (
              <div />
            )}

            {step < steps.length - 1 ? (
              <Button onClick={next}>Continue</Button>
            ) : (
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Creating..." : "Create Profile"}
              </Button>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-text-muted mt-6">
          Cards are issued by partner banks. MazeCard provides the platform for eligibility, limits, repayment, and collections.
        </p>
      </div>
    </div>
  );
}
