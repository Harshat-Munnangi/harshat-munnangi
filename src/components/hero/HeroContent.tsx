"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./HeroContent.module.css";

export default function HeroContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.35,
      });

      tl.fromTo(
        `.${styles.tagline}`,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.9 }
      )
        .fromTo(
          `.${styles.nameLine}`,
          { opacity: 0, y: 60, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.1,
            stagger: 0.14,
          },
          "-=0.55"
        )
        .fromTo(
          `.${styles.subtitle}`,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.5"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={styles.content}>
      <p className={styles.tagline}>Crafting Digital Experiences</p>
      <h1 className={styles.name}>
        <span className={styles.nameLine}>Harshat</span>
        <span className={styles.nameLine}>Munnangi</span>
      </h1>
      <p className={styles.subtitle}>
        Full Stack Developer — building fast, elegant, and immersive web
        experiences from idea to interface.
      </p>
    </div>
  );
}
