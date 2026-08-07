import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "harshat39@gmail.com";
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>";
const GENERIC_ERROR =
  "Your message couldn't be sent right now. Please try again later or email me directly.";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE_LENGTH = 5000;

interface ContactPayload {
  name: string;
  email: string;
  message: string;
  ip: string;
}

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function logDeliveryFailure(payload: ContactPayload, reason: string) {
  console.error(
    JSON.stringify({
      event: "contact_form_delivery_failed",
      timestamp: new Date().toISOString(),
      reason,
      ...payload,
    })
  );
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (
    !name ||
    !email ||
    !message ||
    !EMAIL_PATTERN.test(email) ||
    message.length > MAX_MESSAGE_LENGTH
  ) {
    return NextResponse.json(
      { ok: false, error: "Please fill in all fields with a valid email." },
      { status: 400 }
    );
  }

  const ip = getClientIp(request);
  const payload: ContactPayload = { name, email, message, ip };

  console.log(
    JSON.stringify({
      event: "contact_form_submission",
      timestamp: new Date().toISOString(),
      ip,
      email,
      name,
    })
  );

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    logDeliveryFailure(payload, "RESEND_API_KEY is not configured");
    return NextResponse.json({ ok: false, error: GENERIC_ERROR }, { status: 502 });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `From: ${name} <${email}>\nIP: ${ip}\n\n${message}`,
    });

    if (error) {
      logDeliveryFailure(payload, error.message ?? String(error));
      return NextResponse.json({ ok: false, error: GENERIC_ERROR }, { status: 502 });
    }
  } catch (err) {
    logDeliveryFailure(payload, err instanceof Error ? err.message : String(err));
    return NextResponse.json({ ok: false, error: GENERIC_ERROR }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
