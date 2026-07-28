import styles from "./PlaceholderSection.module.css";

type PlaceholderSectionProps = {
  id: string;
  eyebrow: string;
  heading: string;
  body: string;
};

export default function PlaceholderSection({
  id,
  eyebrow,
  heading,
  body,
}: PlaceholderSectionProps) {
  return (
    <section id={id} className={styles.section} aria-label={heading}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.body}>{body}</p>
      </div>
    </section>
  );
}
