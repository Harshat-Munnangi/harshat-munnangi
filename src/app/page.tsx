import Hero from "@/components/hero/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Technologies from "@/components/sections/Technologies";
import Work from "@/components/sections/Work";
import Certifications from "@/components/sections/Certifications";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Technologies />
      <Work />
      <Certifications />
      <Education />
      <Contact />
    </main>
  );
}
