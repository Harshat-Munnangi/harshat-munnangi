import styles from "./Work.module.css";

function formatDurationSince(start: Date): string {
  const now = new Date();
  let months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());
  if (now.getDate() < start.getDate()) months -= 1;

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  const parts = [];
  if (years > 0) parts.push(`${years} yr${years === 1 ? "" : "s"}`);
  if (remainingMonths > 0 || years === 0) {
    parts.push(`${remainingMonths} mo${remainingMonths === 1 ? "" : "s"}`);
  }
  return parts.join(" ");
}

const ORBYT_START_DATE = new Date(2024, 3, 1);

const EXPERIENCE = [
  {
    company: "Orbyt AS",
    duration: null,
    roles: [
      {
        title: "Senior Engineer",
        period: "April 2024 – Present",
        duration: formatDurationSince(ORBYT_START_DATE),
        location: "Oslo, Norway",
        bullets: [
          "Collaborate end-to-end with cross-functional product teams to design, implement, test, and deliver high-quality features aligned with product goals.",
          "Contribute to system architecture, technical design discussions, and solutioning to ensure robust, scalable, and maintainable systems.",
          "Received 97% positive results in customer feedback surveys.",
          "Mentor peers, conduct code reviews, and promote best practices in code quality, security, and performance.",
        ],
      },
    ],
  },
  {
    company: "Posten Bring AS",
    duration: null,
    roles: [
      {
        title: "Full Stack Developer",
        period: "January 2020 – March 2024",
        duration: "4 yrs 2 mos",
        location: "Oslo, Norway",
        bullets: [
          "Developed and maintained scalable web applications for Posten's customer front interfaces.",
          "Implemented RESTful APIs to facilitate seamless communication between frontend (Android/iOS/Web) and backend systems.",
          "Implemented and migrated on-premises applications to the cloud, decreasing client expenditure by 50% and receiving appreciation from the customer.",
        ],
      },
    ],
  },
  {
    company: "Tata Consultancy Services",
    duration: "3 yrs 8 mos",
    roles: [
      {
        title: "System Engineer",
        period: "April 2018 – December 2019",
        duration: "1 yr 9 mos",
        location: "Hyderabad, Telangana, India",
        bullets: [
          "Developed a compensation system generating annual hikes for 420,000+ associates.",
          "Won the Best Team Award for compensation and release letters covering 350,000+ associates, improving turnaround time by 48%.",
          "Gathered and implemented requirements directly from corporate stakeholders.",
        ],
      },
      {
        title: "Assistant System Engineer",
        period: "April 2017 – March 2018",
        duration: "1 yr",
        location: "Nagpur, Maharashtra, India",
        bullets: [
          "Built a payroll system handling roughly 420,000 monthly payslips a year.",
          "Owned delivery end-to-end, from requirements gathering through development.",
          "Supported Android and iOS apps via REST APIs.",
        ],
      },
      {
        title: "Trainee",
        period: "April 2016 – March 2017",
        duration: "1 yr",
        location: "Nagpur, Maharashtra, India",
        bullets: [
          "Supported integration of a third-party site delivering HIS policies to 70,000 TCS US employees.",
          "Built automated SFTP batch transfers between customer and client systems.",
          "Raised customer satisfaction by 25% through improved service.",
        ],
      },
    ],
  },
];

export default function Work() {
  return (
    <section id="work" className={styles.section} aria-label="Work">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Experience</p>
        <h2 className={styles.heading}>Where the work happened</h2>
        <div className={styles.timeline}>
          {EXPERIENCE.map((company) => (
            <div key={company.company} className={styles.company}>
              <div className={styles.companyHeader}>
                <h3 className={styles.companyName}>{company.company}</h3>
                {company.duration && (
                  <span className={styles.companyDuration}>
                    {company.duration}
                  </span>
                )}
              </div>
              <div className={styles.roles}>
                {company.roles.map((role) => (
                  <div key={role.title} className={styles.role}>
                    <div className={styles.roleHeader}>
                      <span className={styles.roleTitle}>{role.title}</span>
                      <span className={styles.rolePeriod}>
                        {role.period} · {role.duration}
                      </span>
                      <span className={styles.roleLocation}>
                        {role.location}
                      </span>
                    </div>
                    {role.bullets.length > 0 && (
                      <ul className={styles.bullets}>
                        {role.bullets.map((bullet) => (
                          <li key={bullet} className={styles.bullet}>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
