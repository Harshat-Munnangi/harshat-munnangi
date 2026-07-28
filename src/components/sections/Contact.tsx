import styles from "./Contact.module.css";
import { EmailIcon, GitHubIcon, LinkedInIcon } from "./icons";

const CONTACT_LINKS = [
  {
    label: "Email",
    value: "harshat39@gmail.com",
    href: "mailto:harshat39@gmail.com",
    Icon: EmailIcon,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/harshatmunnangi",
    href: "https://www.linkedin.com/in/harshatmunnangi/",
    Icon: LinkedInIcon,
  },
  {
    label: "GitHub",
    value: "github.com/Harshat-Munnangi",
    href: "https://github.com/Harshat-Munnangi",
    Icon: GitHubIcon,
  },
];

export default function Contact() {
  return (
    <section id="contact" className={styles.section} aria-label="Contact">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Get in touch</p>
        <h2 className={styles.heading}>Let&apos;s build something together.</h2>
        <p className={styles.body}>
          Open to new opportunities and interesting problems — reach out
          through any of the channels below.
        </p>
        <div className={styles.links}>
          {CONTACT_LINKS.map(({ label, value, href, Icon }) => (
            <a
              key={label}
              href={href}
              className={styles.link}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              <span className={styles.linkIcon}>
                <Icon />
              </span>
              <span className={styles.linkText}>
                <span className={styles.linkLabel}>{label}</span>
                <span className={styles.linkValue}>{value}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
