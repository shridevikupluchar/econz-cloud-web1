import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/effects/Reveal";
import { problems, problemsH2 } from "@/lib/data/content";
import styles from "./Problems.module.css";

export default function Problems() {
  return (
    <section className={styles.section} aria-label="Challenges">
      <div className={styles.inner}>
        <Reveal className={styles.header}>
          <Eyebrow tone="purple">The Challenge</Eyebrow>
          <h2 className={styles.h2}>{problemsH2}</h2>
        </Reveal>

        <div className={styles.grid}>
          {problems.map((p, i) => (
            <Reveal key={p.num} delay={i * 100}>
              <article className={styles.card}>
                <div className={styles.num}>{p.num}</div>
                <h3 className={styles.title}>{p.title}</h3>
                <p className={styles.body}>{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
