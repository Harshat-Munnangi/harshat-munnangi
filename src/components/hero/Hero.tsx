import heroImage from "@/assets/images/hero-portrait.png";
import styles from "./Hero.module.css";
import VideoIntro from "./VideoIntro";
import CinematicLayer from "./CinematicLayer";
import HeroContent from "./HeroContent";
import ScrollIndicator from "./ScrollIndicator";

const NEXT_SECTION_ID = "about";

export default function Hero() {
  return (
    <section id="home" className={styles.section} aria-label="Introduction">
      <div className={styles.sticky}>
        <VideoIntro
          imageSrc={heroImage}
          imageAlt="Harshat Munnangi at his desk, working late in a warmly lit home office."
        />
        <CinematicLayer />
        <HeroContent />
        <ScrollIndicator targetId={NEXT_SECTION_ID} />
      </div>
    </section>
  );
}
