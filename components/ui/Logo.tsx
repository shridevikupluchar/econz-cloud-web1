import Link from "next/link";
import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <Link href="/" className={styles.logo} aria-label="econz home">
      <span className={styles.tile} aria-hidden="true" />
      <span className={styles.wordmark}>econz</span>
    </Link>
  );
}
