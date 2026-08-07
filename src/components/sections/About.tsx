import styles from "./About.module.css";

const STATS = [
  { label: "Years of experience", value: "10+" },
  { label: "Based in", value: "Oslo, Norway" },
  { label: "Currently", value: "Senior Engineer @ Orbyt AS" },
];

export default function About() {
  return (
    <section id="about" className={styles.section} aria-label="About">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>About</p>
        <h2 className={styles.heading}>
          A decade of shipping software that holds up.
        </h2>
        <p className={styles.body}>
          Senior full-stack developer with 10+ years of experience building
          scalable, cloud-native applications. Strong expertise in Java,
          Spring Boot, and React, with a focus on API design, clean
          architecture, and end-to-end product development.
        </p>
        <dl className={styles.stats}>
          {STATS.map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <dt className={styles.statLabel}>{stat.label}</dt>
              <dd className={styles.statValue}>{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
