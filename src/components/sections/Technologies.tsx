import { DiJava, DiCss3 } from "react-icons/di";
import {
  SiKotlin,
  SiSpringboot,
  SiHibernate,
  SiPostgresql,
  SiMysql,
  SiTypescript,
  SiNodedotjs,
  SiReact,
  SiHtml5,
  SiMui,
  SiGithub,
  SiDocker,
  SiTerraform,
  SiKubernetes,
  SiElastic,
  SiGrafana,
} from "react-icons/si";
import { TbBrandAzure } from "react-icons/tb";
import styles from "./Technologies.module.css";

const TECH_GROUPS = [
  {
    title: "Languages & frameworks",
    items: [
      { name: "Java", Icon: DiJava, color: "#f89820" },
      { name: "Kotlin", Icon: SiKotlin, color: "#7f52ff" },
      { name: "TypeScript", Icon: SiTypescript, color: "#3178c6" },
      { name: "Spring Boot", Icon: SiSpringboot, color: "#6db33f" },
      { name: "Hibernate & JPA", Icon: SiHibernate, color: "#bcae7f" },
      { name: "React", Icon: SiReact, color: "#61dafb" },
      { name: "Node.js", Icon: SiNodedotjs, color: "#5fa04e" },
      { name: "HTML5", Icon: SiHtml5, color: "#e34f26" },
      { name: "CSS3", Icon: DiCss3, color: "#1572b6" },
      { name: "Material UI", Icon: SiMui, color: "#007fff" },
    ],
  },
  {
    title: "Data",
    items: [
      { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169e1" },
      { name: "MySQL", Icon: SiMysql, color: "#4479a1" },
    ],
  },
  {
    title: "Cloud & DevOps",
    items: [
      { name: "Azure", Icon: TbBrandAzure, color: "#0089d6" },
      { name: "Docker", Icon: SiDocker, color: "#2496ed" },
      { name: "Terraform", Icon: SiTerraform, color: "#844fba" },
      { name: "Kubernetes", Icon: SiKubernetes, color: "#326ce5" },
      { name: "GitHub", Icon: SiGithub, color: "#e6edf3" },
    ],
  },
  {
    title: "Observability",
    items: [
      { name: "Elastic Stack (ELK)", Icon: SiElastic, color: "#fec514" },
      { name: "Grafana", Icon: SiGrafana, color: "#f46800" },
    ],
  },
];

export default function Technologies() {
  return (
    <section
      id="technologies"
      className={styles.section}
      aria-label="Technologies"
    >
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Toolbox</p>
        <h2 className={styles.heading}>Technologies I work with</h2>
        <div className={styles.groups}>
          {TECH_GROUPS.map((group) => (
            <div key={group.title} className={styles.group}>
              <h3 className={styles.groupTitle}>{group.title}</h3>
              <ul className={styles.techList}>
                {group.items.map(({ name, Icon, color }) => (
                  <li key={name} className={styles.techItem}>
                    <span className={styles.techIcon} style={{ color }}>
                      <Icon />
                    </span>
                    <span className={styles.techLabel}>{name}</span>
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
