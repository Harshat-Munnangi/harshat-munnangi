import styles from "./Work.module.css";

const EXPERIENCE = [
  {
    company: "Orbyt AS",
    duration: null,
    roles: [
      {
        title: "Senior Developer",
        period: "April 2024 – Present",
        duration: "2 yrs 4 mos",
        location: "Oslo, Norway",
        bullets: [],
      },
    ],
  },
  {
    company: "Tata Consultancy Services",
    duration: "8 years",
    roles: [
      {
        title: "Information Technology Analyst",
        period: "January 2020 – March 2024",
        duration: "4 yrs 3 mos",
        location: "Oslo, Norway",
        bullets: [
          "Understood and implemented requirements from Trello, following the Scrum model.",
          "Built front-end and back-end service APIs and user interfaces to project specifications.",
          "Migrated on-premises applications to the cloud, cutting customer expenditure by 50%.",
        ],
      },
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
