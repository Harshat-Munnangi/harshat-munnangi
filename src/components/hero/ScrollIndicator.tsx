"use client";

import styles from "./ScrollIndicator.module.css";

type ScrollIndicatorProps = {
  targetId: string;
};

export default function ScrollIndicator({ targetId }: ScrollIndicatorProps) {
  const handleClick = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      type="button"
      className={styles.indicator}
      onClick={handleClick}
      aria-label="Scroll to next section"
    >
      <span className={styles.label}>Scroll</span>
      <span className={styles.line}>
        <span className={styles.pulse} />
      </span>
    </button>
  );
}
