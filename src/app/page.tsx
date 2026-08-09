import { headers } from "next/headers";
import { after } from "next/server";
import Hero from "@/components/hero/Hero";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import Technologies from "@/components/sections/Technologies";
import Skills from "@/components/sections/Skills";
import Certifications from "@/components/sections/Certifications";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";
import { getClientIp, getGeoInfo, sendTelegramMessage } from "@/lib/telegram";

export default async function Home() {
  const headerList = await headers();
  const ip = getClientIp(headerList);
  const userAgent = headerList.get("user-agent") ?? "unknown";
  const { city, region, country } = getGeoInfo(headerList);
  const referer = headerList.get("referer") ?? "Direct";

  after(async () => {
    console.log(
      JSON.stringify({
        event: "page_visit",
        timestamp: new Date().toISOString(),
        ip,
        userAgent,
        city,
        region,
        country,
        referer,
      })
    );

    const result = await sendTelegramMessage(
      `New portfolio visit\n\nIP: ${ip}\nLocation: ${city}, ${region}, ${country}\nReferrer: ${referer}\nUser-Agent: ${userAgent}`
    );

    if (!result.ok) {
      console.error(
        JSON.stringify({
          event: "page_visit_telegram_failed",
          reason: result.reason,
        })
      );
    }
  });

  return (
    <main>
      <Hero />
      <About />
      <Work />
      <Technologies />
      <Skills />
      <Certifications />
      <Education />
      <Contact />
    </main>
  );
}
