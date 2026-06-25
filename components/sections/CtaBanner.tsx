import Button from "@/components/ui/Button";
import Reveal from "@/components/effects/Reveal";
import { ctaBannerH2, ctaBannerBody, ctaBannerCta } from "@/lib/data/content";
import styles from "./CtaBanner.module.css";

export default function CtaBanner() {
  return (
    <section className={styles.section} id="contact" aria-label="Contact">
      <div className={styles.inner}>
        <Reveal>
          <div className={styles.panel}>
            <h2 className={styles.h2}>{ctaBannerH2}</h2>
            <p className={styles.body}>{ctaBannerBody}</p>
            <Button href={ctaBannerCta.href} variant="primary">
              {ctaBannerCta.label}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
