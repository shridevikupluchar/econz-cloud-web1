"use client";

import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { useReveal } from "@/lib/hooks/useReveal";
import styles from "./Reveal.module.css";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduced = usePrefersReducedMotion();
  const { ref, revealed } = useReveal();

  const state = reduced || revealed ? styles.revealed : styles.hidden;

  return (
    <div
      ref={ref}
      className={`${styles.root} ${state} ${className ?? ""}`}
      style={delay && !reduced ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
