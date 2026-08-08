import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getClientIp, getGeoInfo, sendTelegramMessage } from "@/lib/telegram";

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

async function sendTelegramFallback(
  payload: ContactPayload
): Promise<{ ok: true } | { ok: false; reason: string }> {
  return sendTelegramMessage(
    `New portfolio message (email delivery failed)\n\nFrom: ${payload.name} <${payload.email}>\nIP: ${payload.ip}\n\n${payload.message}`
  );
}

async function handleEmailFailure(
  payload: ContactPayload,
  reason: string
): Promise<NextResponse> {
  const fallback = await sendTelegramFallback(payload);

  if (fallback.ok) {
    console.warn(
      JSON.stringify({
        event: "contact_form_email_failed_telegram_sent",
        timestamp: new Date().toISOString(),
        reason,
        ip: payload.ip,
        email: payload.email,
        name: payload.name,
      })
    );
    return NextResponse.json({ ok: true });
  }

  logDeliveryFailure(payload, `email: ${reason}; telegram fallback: ${fallback.reason}`);
  return NextResponse.json({ ok: false, error: GENERIC_ERROR }, { status: 502 });
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

  const ip = getClientIp(request.headers);
  const { city, region, country } = getGeoInfo(request.headers);
  const referer = request.headers.get("referer") ?? "Direct";
  const userAgent = request.headers.get("user-agent") ?? "unknown";
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
    return handleEmailFailure(payload, "RESEND_API_KEY is not configured");
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `From: ${name} <${email}>\nIP: ${ip}\nLocation: ${city}, ${region}, ${country}\nReferrer: ${referer}\nUser-Agent: ${userAgent}\n\n${message}`,
    });

    if (error) {
      return handleEmailFailure(payload, error.message ?? String(error));
    }
  } catch (err) {
    return handleEmailFailure(
      payload,
      err instanceof Error ? err.message : String(err)
    );
  }

  return NextResponse.json({ ok: true });
}
