"use client";

import { useEffect, useRef, useState } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/effects/Reveal";
import { useIsMobile } from "@/lib/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { values, valuesH2, valuesIntro } from "@/lib/data/content";
import styles from "./Values.module.css";

function DesktopValues() {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const rect = track.getBoundingClientRect();
      const viewH = window.innerHeight;
      const scrolled = -rect.top;
      const total = rect.height - viewH;
      if (total <= 0) return;
      const pct = Math.min(Math.max(scrolled / total, 0), 1);
      setActive(Math.min(Math.floor(pct * values.length), values.length - 1));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced]);

  const current = values[active];

  return (
    <div ref={trackRef} className={styles.stickyTrack}>
      <div className={styles.stickyPanel}>
        <div className={styles.valueList}>
          {values.map((v, i) => (
            <div
              key={v.title}
              className={`${styles.valueCard} ${i === active ? styles.active : ""}`}
            >
              <div className={styles.metric}>{v.metric}</div>
              <div className={styles.valueTitle}>{v.title}</div>
              <p className={styles.valueBody}>{v.body}</p>
              <div className={styles.progress}>
                <div
                  className={styles.progressFill}
                  style={{ width: i === active ? "100%" : i < active ? "100%" : "0%" }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className={`${styles.display} ${styles.active}`}>
          <div className={styles.displayMetric}>{current.metric}</div>
          <div className={styles.displayTitle}>{current.title}</div>
          <p className={styles.displayBody}>{current.body}</p>
        </div>
      </div>
    </div>
  );
}

function MobileValues() {
  return (
    <div className={styles.mobileList}>
      {values.map((v, i) => (
        <Reveal key={v.title} delay={i * 100}>
          <div className={styles.mobileCard}>
            <div className={styles.metric}>{v.metric}</div>
            <div className={styles.valueTitle}>{v.title}</div>
            <p className={styles.valueBody}>{v.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export default function Values() {
  const isMobile = useIsMobile();

  return (
    <section className={styles.section} aria-label="Why econz">
      <div className={styles.inner}>
        <Reveal className={styles.header}>
          <Eyebrow tone="purple">Why econz</Eyebrow>
          <h2 className={styles.h2}>{valuesH2}</h2>
          <p className={styles.intro}>{valuesIntro}</p>
        </Reveal>

        {isMobile ? <MobileValues /> : <DesktopValues />}
      </div>
    </section>
  );
}
