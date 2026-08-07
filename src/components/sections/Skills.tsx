import styles from "./Skills.module.css";

const SKILL_GROUPS = [
  {
    title: "Core development",
    skills: [
      "API design",
      "Clean architecture",
      "End-to-end product development",
      "Database design & schema optimization",
    ],
  },
  {
    title: "Practices",
    skills: [
      "Scrum & Agile delivery",
      "Front-end & back-end architecture",
      "Code reviews & mentoring",
    ],
  },
  {
    title: "Emerging tech",
    skills: ["Agentic AI development", "AI agents", "Cloud migration"],
  },
  {
    title: "Soft skills",
    skills: [
      "Team player",
      "Problem solving",
      "Flexibility",
      "Active listening",
      "Quick learner",
      "Communication",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className={styles.section} aria-label="Skills">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Capabilities</p>
        <h2 className={styles.heading}>Skills &amp; tools</h2>
        <div className={styles.groups}>
          {SKILL_GROUPS.map((group) => (
            <div key={group.title} className={styles.group}>
              <h3 className={styles.groupTitle}>{group.title}</h3>
              <ul className={styles.tagList}>
                {group.skills.map((skill) => (
                  <li key={skill} className={styles.tag}>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
