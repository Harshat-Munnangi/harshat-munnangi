import styles from "./Certifications.module.css";

const CERTIFICATIONS = [
  {
    name: "HashiCorp Certified: Terraform Associate",
    date: "January 2023",
  },
  {
    name: "Microsoft Certified: Azure Fundamentals",
    date: "August 2021",
  },
  {
    name: "Oracle Certified Associate, Java SE 8 Programmer",
    date: "June 2020",
  },
];

export default function Certifications() {
  return (
    <section
      id="certifications"
      className={styles.section}
      aria-label="Certifications"
    >
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Credentials</p>
        <h2 className={styles.heading}>Certifications</h2>
        <ul className={styles.list}>
          {CERTIFICATIONS.map((cert) => (
            <li key={cert.name} className={styles.item}>
              <span className={styles.name}>{cert.name}</span>
              <span className={styles.date}>{cert.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
