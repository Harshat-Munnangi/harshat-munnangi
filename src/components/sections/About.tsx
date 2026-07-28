import styles from "./About.module.css";

const STATS = [
  { label: "Years of experience", value: "10+" },
  { label: "Based in", value: "Oslo, Norway" },
  { label: "Currently", value: "Senior Developer @ Orbyt AS" },
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
          Experienced software developer with over 10 years of proven success
          crafting and implementing solutions that boost business efficiency.
          Proficient across product development, testing, and maintenance —
          consistently meeting stringent deadlines and delivering tangible
          results.
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
