import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/effects/Reveal";
import { solutions, solutionsH2, industriesLine } from "@/lib/data/content";
import styles from "./Solutions.module.css";

export default function Solutions() {
  return (
    <section className={styles.section} id="solutions" aria-label="Solutions">
      <div className={styles.inner}>
        <Reveal className={styles.header}>
          <Eyebrow tone="cyan">What We Do</Eyebrow>
          <h2 className={styles.h2}>{solutionsH2}</h2>
        </Reveal>

        <div className={styles.grid}>
          {solutions.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <article className={styles.card}>
                <span className={styles.tag}>{s.tag}</span>
                <h3 className={styles.title}>{s.title}</h3>
                <p className={styles.body}>{s.body}</p>
                <span className={styles.more}>Learn more →</span>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className={styles.industries}>{industriesLine}</p>
        </Reveal>
      </div>
    </section>
  );
}
