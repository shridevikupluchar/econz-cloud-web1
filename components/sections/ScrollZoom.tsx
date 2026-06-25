"use client";

import { useEffect, useRef } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import GradientText from "@/components/ui/GradientText";
import Button from "@/components/ui/Button";
import { scrollZoom } from "@/lib/data/content";
import styles from "./ScrollZoom.module.css";

export default function ScrollZoom() {
  const trackRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      stage.style.setProperty("--p", "1");
      track.dataset.reduced = "true";
      return;
    }

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = track.getBoundingClientRect();
      const total = track.offsetHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      stage.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={trackRef}
      className={styles.track}
      aria-label="What's inside an econz migration"
    >
      <div ref={stageRef} className={styles.stage}>
        <div className={styles.grid} aria-hidden="true" />

        <div className={styles.outer} aria-hidden="true">
          <h2 className={styles.outerHeading}>
            <GradientText>{scrollZoom.outerHeading}</GradientText>
          </h2>
        </div>

        <div className={styles.reveal}>
          <Eyebrow tone="cyan">{scrollZoom.eyebrow}</Eyebrow>
          <h3 className={styles.revealHeading}>{scrollZoom.heading}</h3>
          <p className={styles.revealBody}>{scrollZoom.body}</p>
          <ul className={styles.chips}>
            {scrollZoom.chips.map((c) => (
              <li key={c} className={styles.chip}>
                {c}
              </li>
            ))}
          </ul>
          <Button href={scrollZoom.cta.href} variant="primary">
            {scrollZoom.cta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
