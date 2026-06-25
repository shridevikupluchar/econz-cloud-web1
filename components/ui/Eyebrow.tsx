import styles from "./Eyebrow.module.css";

interface EyebrowProps {
  children: React.ReactNode;
  tone?: "cyan" | "purple";
}

export default function Eyebrow({ children, tone = "cyan" }: EyebrowProps) {
  return (
    <p className={`${styles.eyebrow} ${styles[tone]}`}>
      <span className={styles.dot} aria-hidden="true" />
      {children}
    </p>
  );
}
