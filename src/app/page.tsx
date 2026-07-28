import Hero from "@/components/hero/Hero";
import PlaceholderSection from "@/components/sections/PlaceholderSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <PlaceholderSection
        id="about"
        eyebrow="Next up"
        heading="More of the story lives here."
        body="This section is a placeholder for what comes after the hero — projects, experience, and everything else that belongs to the rest of the page."
      />
      <PlaceholderSection
        id="skills"
        eyebrow="Capabilities"
        heading="Skills will live here."
        body="A placeholder for the tools, languages, and frameworks that make up the day-to-day toolkit."
      />
      <PlaceholderSection
        id="work"
        eyebrow="Selected work"
        heading="Projects will live here."
        body="A placeholder for case studies and shipped work worth showing off."
      />
      <PlaceholderSection
        id="contact"
        eyebrow="Get in touch"
        heading="Contact will live here."
        body="A placeholder for the ways to reach out and start a conversation."
      />
    </main>
  );
}
