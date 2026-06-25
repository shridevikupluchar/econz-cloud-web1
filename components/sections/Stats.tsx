"use client";

import { useRef, useState, useEffect } from "react";
import { useCountUp } from "@/lib/hooks/useCountUp";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { stats } from "@/lib/data/content";
import styles from "./Stats.module.css";

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const count = useCountUp(active || reduced ? value : 0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={styles.card}>
      <div className={styles.number} aria-label={`${value}${suffix}`}>
        {count}{suffix}
      </div>
      <div className={styles.label}>{label}</div>
    </div>
  );
}

export default function Stats() {
  return (
    <section className={styles.section} aria-label="Key statistics">
      <div className={styles.grid}>
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}
