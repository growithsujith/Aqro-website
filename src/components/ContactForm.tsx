"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import StarBorder from "@/components/reactbits/StarBorder/StarBorder";

const SERVICES = ["Creatives", "AI Video Production", "App Development", "Web Development", "Not sure yet"];
const BUDGETS = ["Under ₹1L", "₹1L – ₹5L", "₹5L – ₹15L", "₹15L+", "Not sure yet"];

type Status = "idle" | "sending" | "sent" | "not_configured" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [service, setService] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    // client-side checks mirror the server's, for instant feedback
    const errs: Record<string, string> = {};
    if (String(data.name).trim().length < 2) errs.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(data.email).trim())) errs.email = "Please enter a valid email address.";
    if (!data.service) errs.service = "Please choose a service.";
    if (String(data.message).trim().length < 20) errs.message = "A few more words about the project, please (20+ characters).";
    setErrors(errs);
    if (Object.keys(errs).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus("sent");
        form.reset();
        setService("");
      } else if (json.code === "invalid") {
        setErrors(json.errors ?? {});
        setStatus("idle");
      } else if (json.code === "not_configured") {
        setStatus("not_configured");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        role="status"
        className="border border-graphite/15 bg-paper p-10"
      >
        <span className="text-xs font-medium uppercase tracking-[0.14em] text-red-ink">Received</span>
        <p className="mt-4 font-display text-4xl font-semibold tracking-tight">Thank you — your message is with us.</p>
        <p className="mt-3 max-w-md text-graphite/70">We read every enquiry personally and will reply to the email you gave us.</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-8 text-sm underline decoration-red underline-offset-4">
          Send another enquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-10" aria-describedby="form-status">
      {/* honeypot */}
      <div className="hidden" aria-hidden>
        <label>
          Website <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-10 sm:grid-cols-2">
        <Field name="name" label="Name" required error={errors.name} autoComplete="name" />
        <Field name="email" label="Email" type="email" required error={errors.email} autoComplete="email" />
        <Field name="company" label="Company" hint="Optional" autoComplete="organization" className="sm:col-span-2" />
      </div>

      <fieldset>
        <legend className="mb-4 flex items-baseline justify-between text-xs font-medium uppercase tracking-[0.14em] text-graphite/70">
          Service required <span className="text-red-ink">*</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {SERVICES.map((s) => (
            <label key={s} className="cursor-pointer">
              <input
                type="radio"
                name="service"
                value={s}
                checked={service === s}
                onChange={() => setService(s)}
                className="peer sr-only"
              />
              <span className="inline-block rounded-full border border-graphite/25 px-4 py-2.5 text-sm transition-colors peer-checked:border-blue peer-checked:bg-blue peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-red hover:border-graphite/60">
                {s}
              </span>
            </label>
          ))}
        </div>
        {errors.service && <p className="mt-2 text-sm text-red-ink">{errors.service}</p>}
      </fieldset>

      <div>
        <label htmlFor="budget" className="mb-3 flex items-baseline justify-between text-xs font-medium uppercase tracking-[0.14em] text-graphite/70">
          Project budget <span className="normal-case tracking-normal text-graphite/65">Optional</span>
        </label>
        <select
          id="budget"
          name="budget"
          defaultValue=""
          className="w-full appearance-none border-0 border-b border-graphite/30 bg-transparent py-3 text-lg outline-none transition-colors focus:border-blue"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' fill='none' stroke='%23292929' stroke-width='1.5'><path d='M2.5 4.5 6 8l3.5-3.5'/></svg>\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 4px center",
            backgroundSize: "14px",
          }}
        >
          <option value="">Prefer not to say</option>
          {BUDGETS.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </div>

      <Field name="message" label="Project description" required error={errors.message} textarea hint="What are you building, for whom, and by when?" />

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <StarBorder
          as="div"
          radius={9999}
          thickness={1.5}
          color="#ED1C24"
          trailColor="#004AAD"
          backgroundColor="transparent"
          borderColor="rgba(41, 41, 41, 0.16)"
          glow={0.6}
          hover="lap"
          clickPulse
          style={{ padding: "2px" }}
        >
          <button
            type="submit"
            disabled={status === "sending"}
            className="group relative inline-flex cursor-pointer items-center gap-3 overflow-hidden rounded-full bg-red px-8 py-4 text-[15px] font-medium text-white disabled:opacity-70"
          >
            <span className="absolute inset-0 origin-left scale-x-0 bg-graphite transition-transform duration-500 group-hover:scale-x-100" aria-hidden />
            <span className="relative">{status === "sending" ? "Sending…" : "Send enquiry"}</span>
            <span aria-hidden className="relative transition-transform duration-500 group-hover:translate-x-1">→</span>
          </button>
        </StarBorder>
        <p className="text-sm text-graphite/65">We reply to every enquiry personally.</p>
      </div>

      <div id="form-status" aria-live="polite">
        <AnimatePresence>
          {(status === "not_configured" || status === "error") && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role="alert"
              className="border-l-2 border-red bg-paper p-5 text-[15px] leading-relaxed"
            >
              {status === "not_configured" ? (
                <>
                  <strong className="font-semibold">Your message hasn&apos;t been sent.</strong> Our enquiry inbox isn&apos;t
                  connected to this website yet. Please try again shortly — your text is still in the form.
                </>
              ) : (
                <>
                  <strong className="font-semibold">Something went wrong while sending.</strong> Please check your connection
                  and try again — your text is still in the form.
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  error,
  hint,
  textarea,
  autoComplete,
  className = "",
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  textarea?: boolean;
  autoComplete?: string;
  className?: string;
}) {
  const common = {
    id: name,
    name,
    autoComplete,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${name}-error` : undefined,
    className:
      "peer w-full border-0 border-b bg-transparent py-3 text-lg outline-none transition-colors placeholder:text-graphite/50 focus:border-blue " +
      (error ? "border-red" : "border-graphite/30"),
  };
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1 flex items-baseline justify-between text-xs font-medium uppercase tracking-[0.14em] text-graphite/70">
        <span>
          {label} {required && <span className="text-red-ink">*</span>}
        </span>
        {hint && <span className="normal-case tracking-normal text-graphite/65">{hint}</span>}
      </label>
      {textarea ? <textarea rows={5} {...common} className={common.className + " resize-y"} /> : <input type={type} {...common} />}
      {error && (
        <p id={`${name}-error`} className="mt-2 text-sm text-red-ink">
          {error}
        </p>
      )}
    </div>
  );
}
