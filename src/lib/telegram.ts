export function getClientIp(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return headers.get("x-real-ip") ?? "unknown";
}

export interface GeoInfo {
  city: string;
  region: string;
  country: string;
}

export function getGeoInfo(headers: Headers): GeoInfo {
  const cityRaw = headers.get("x-vercel-ip-city");
  return {
    city: cityRaw ? decodeURIComponent(cityRaw) : "unknown",
    region: headers.get("x-vercel-ip-country-region") ?? "unknown",
    country: headers.get("x-vercel-ip-country") ?? "unknown",
  };
}

export async function sendTelegramMessage(
  text: string
): Promise<{ ok: true } | { ok: false; reason: string }> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return { ok: false, reason: "Telegram is not configured" };
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
      }
    );

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      return { ok: false, reason: `Telegram API responded ${response.status}: ${body}` };
    }

    return { ok: true };
  } catch (err) {
    return { ok: false, reason: err instanceof Error ? err.message : String(err) };
  }
}
