import { FaLinkedin } from "react-icons/fa6";
import styles from "./Contact.module.css";
import ContactForm from "./ContactForm";

const LINKEDIN_URL = "https://www.linkedin.com/in/harshatmunnangi/";

export default function Contact() {
  return (
    <section id="contact" className={styles.section} aria-label="Contact">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Get in touch</p>
        <h2 className={styles.heading}>Let&apos;s build something together.</h2>
        <p className={styles.body}>
          Open to new opportunities and interesting problems — connect with
          me on LinkedIn or send a message directly.
        </p>

        <a
          href={LINKEDIN_URL}
          className={styles.cta}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.ctaIcon} aria-hidden="true">
            <FaLinkedin />
          </span>
          Connect on LinkedIn
        </a>

        <p className={styles.divider}>Or send a message directly</p>
        <ContactForm />
      </div>
    </section>
  );
}
