"use client";

import { useState, FormEvent } from "react";

type FormData = {
  name: string;
  email: string;
  type: "Sales" | "Partnership" | "Support";
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    type: "Sales",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Enter a valid email address.";
    }
    if (!form.message.trim()) errs.message = "Message is required.";
    return errs;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full bg-bg-card border border-border-color focus:border-maze-yellow rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted outline-none transition-colors";

  if (submitted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-bg-primary px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-text-primary">
            Thank you for reaching out.
          </h1>
          <p className="mt-4 text-text-secondary">
            We&apos;ll get back to you shortly.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg-primary">
      {/* Hero */}
      <section className="px-6 pt-32 pb-4 text-center">
        <h1 className="text-4xl font-bold text-text-primary sm:text-5xl">
          Get in touch
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-text-secondary">
          Whether you&apos;re a cooperative exploring MazeCard or a merchant
          interested in joining the network, we&apos;d love to hear from you.
        </p>
      </section>

      {/* Form */}
      <section className="mx-auto max-w-lg px-6 py-16">
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Name */}
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-text-secondary">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              className={inputClass}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-text-secondary">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className={inputClass}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Type */}
          <div>
            <label htmlFor="type" className="mb-2 block text-sm font-medium text-text-secondary">
              Type
            </label>
            <select
              id="type"
              className={inputClass}
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value as FormData["type"] })
              }
            >
              <option value="Sales">Sales</option>
              <option value="Partnership">Partnership</option>
              <option value="Support">Support</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-text-secondary">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              className={inputClass}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-500">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-maze-yellow px-6 py-3 text-sm font-semibold text-bg-primary transition-colors hover:bg-maze-yellow-hover disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </section>

      {/* Support note */}
      <section className="border-t border-border-color px-6 py-12">
        <p className="mx-auto max-w-xl text-center text-sm text-text-muted">
          For support inquiries, email support@mazecard.com
        </p>
      </section>
    </main>
  );
}
