import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/effects/Reveal";
import { testimonials, testimonialsH2 } from "@/lib/data/content";
import styles from "./Testimonials.module.css";

export default function Testimonials() {
  return (
    <section className={styles.section} aria-label="Testimonials">
      <div className={styles.inner}>
        <Reveal className={styles.header}>
          <Eyebrow tone="cyan">Client Voices</Eyebrow>
          <h2 className={styles.h2}>{testimonialsH2}</h2>
        </Reveal>

        <Reveal>
          <div className={styles.masonry}>
            {testimonials.map((t) => (
              <blockquote key={t.name} className={styles.card}>
                <p className={styles.quote}>&ldquo;{t.quote}&rdquo;</p>
                <footer className={styles.author}>
                  <div className={styles.avatar} aria-hidden="true">
                    {t.initial}
                  </div>
                  <div>
                    <div className={styles.authorName}>{t.name}</div>
                    <div className={styles.authorRole}>{t.role}</div>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
