import styles from "./Education.module.css";

export default function Education() {
  return (
    <section id="education" className={styles.section} aria-label="Education">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Education</p>
        <h2 className={styles.heading}>Academic background</h2>
        <div className={styles.entry}>
          <h3 className={styles.degree}>
            Bachelor of Technology, Electronics &amp; Communications
            Engineering
          </h3>
          <p className={styles.institution}>
            Acharya Nagarjuna University
          </p>
          <p className={styles.period}>2011 – 2015</p>
        </div>
      </div>
    </section>
  );
}
