import styles from "./AboutPreview.module.css";

export default function AboutPreview() {
  return (
    <section id="about" className={styles.section} aria-label="About">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Next up</p>
        <h2 className={styles.heading}>More of the story lives here.</h2>
        <p className={styles.body}>
          This section is a placeholder for what comes after the hero —
          projects, experience, and everything else that belongs to the rest
          of the page.
        </p>
      </div>
    </section>
  );
}
