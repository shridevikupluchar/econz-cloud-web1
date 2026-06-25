import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/effects/Reveal";
import { partners } from "@/lib/data/content";
import styles from "./Partners.module.css";

export default function Partners() {
  return (
    <section className={styles.section} aria-label="Technology partners">
      <div className={styles.inner}>
        <Reveal className={styles.header}>
          <Eyebrow tone="cyan">Technology Partners</Eyebrow>
        </Reveal>

        <Reveal>
          <div className={styles.chips}>
            {partners.map((p) => (
              <span key={p} className={styles.chip}>
                {p}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
