import { clients, marqueeLabel } from "@/lib/data/content";
import styles from "./ClientMarquee.module.css";

const doubled = [...clients, ...clients];

export default function ClientMarquee() {
  return (
    <section className={styles.section} aria-label="Clients">
      <p className={styles.label}>{marqueeLabel}</p>
      <div className={styles.track}>
        <div className={styles.inner} aria-hidden="true">
          {doubled.map((name, i) => (
            <span key={i} className={styles.item}>
              <span className={styles.name}>{name}</span>
              <span className={styles.sep} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
