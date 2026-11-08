import { NextResponse } from "next/server";

/**
 * Enquiry endpoint.
 *
 * INTEGRATION POINT — submissions are delivered by ONE of these, configured
 * through environment variables (see .env.example):
 *   1. CONTACT_WEBHOOK_URL   → JSON POST to any webhook (Zapier, Make, Slack, a CRM…)
 *   2. RESEND_API_KEY + CONTACT_TO_EMAIL (+ CONTACT_FROM_EMAIL) → email via Resend
 * With neither set, the endpoint validates the enquiry and answers 503
 * "not_configured", and the form tells the visitor plainly — it never
 * pretends a message was sent.
 */

const SERVICES = ["Creatives", "AI Video Production", "App Development", "Web Development", "Not sure yet"];
const BUDGETS = ["", "Under ₹1L", "₹1L – ₹5L", "₹5L – ₹15L", "₹15L+", "Not sure yet"];

type Enquiry = {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
};

function validate(body: Record<string, unknown>): { data?: Enquiry; errors?: Record<string, string> } {
  const s = (k: string, max = 2000) => (typeof body[k] === "string" ? (body[k] as string).trim().slice(0, max) : "");
  const data: Enquiry = {
    name: s("name", 120),
    email: s("email", 200),
    company: s("company", 160),
    service: s("service", 60),
    budget: s("budget", 40),
    message: s("message", 5000),
  };
  const errors: Record<string, string> = {};
  if (data.name.length < 2) errors.name = "Please tell us your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) errors.email = "Please enter a valid email address.";
  if (!SERVICES.includes(data.service)) errors.service = "Please choose a service.";
  if (!BUDGETS.includes(data.budget)) errors.budget = "Please choose a budget range.";
  if (data.message.length < 20) errors.message = "A few more words about the project, please (20+ characters).";
  return Object.keys(errors).length ? { errors } : { data };
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, code: "bad_request" }, { status: 400 });
  }
  // Honeypot: bots fill hidden fields. Pretend success, deliver nothing.
  if (typeof body.website === "string" && body.website) return NextResponse.json({ ok: true });

  const { data, errors } = validate(body);
  if (!data) return NextResponse.json({ ok: false, code: "invalid", errors }, { status: 422 });

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  try {
    if (webhook) {
      const r = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "aqro-website", receivedAt: new Date().toISOString(), ...data }),
      });
      if (!r.ok) throw new Error(`Webhook responded ${r.status}`);
      return NextResponse.json({ ok: true });
    }
    if (resendKey && to) {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL || "AQRO Website <onboarding@resend.dev>",
          to: [to],
          reply_to: data.email,
          subject: `New enquiry — ${data.service} — ${data.name}`,
          text: [
            `Name: ${data.name}`,
            `Email: ${data.email}`,
            `Company: ${data.company || "—"}`,
            `Service: ${data.service}`,
            `Budget: ${data.budget || "—"}`,
            "",
            data.message,
          ].join("\n"),
        }),
      });
      if (!r.ok) throw new Error(`Resend responded ${r.status}`);
      return NextResponse.json({ ok: true });
    }
  } catch (e) {
    console.error("[contact] delivery failed:", e);
    return NextResponse.json({ ok: false, code: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: false, code: "not_configured" }, { status: 503 });
}
