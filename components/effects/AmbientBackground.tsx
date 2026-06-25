import styles from "./AmbientBackground.module.css";

export default function AmbientBackground() {
  return (
    <div className={styles.root} aria-hidden="true">
      <div className={styles.wash} />
      <div className={`${styles.orb} ${styles.orb1}`} />
      <div className={`${styles.orb} ${styles.orb2}`} />
      <div className={styles.grid} />
    </div>
  );
}
