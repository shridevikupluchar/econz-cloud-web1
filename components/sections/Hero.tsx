"use client";

import { useState } from "react";
import HeroCanvas from "@/components/hero/HeroCanvas";
import Button from "@/components/ui/Button";
import GradientText from "@/components/ui/GradientText";
import { heroMesh, heroOrb } from "@/lib/data/content";
import styles from "./Hero.module.css";

type Variant = "mesh" | "orb";

function HeroCopy({ content }: { content: typeof heroMesh }) {
  return (
    <>
      <div className={styles.badge}>
        <span className={styles.pulseDot} aria-hidden="true" />
        {content.badge}
      </div>
      <h1 className={styles.h1}>
        {content.h1}
        <GradientText>{content.h1Gradient}</GradientText>
      </h1>
      <p className={styles.subhead}>{content.subhead}</p>
      <div className={styles.ctas}>
        <Button href={content.ctaPrimary.href} variant="primary">
          {content.ctaPrimary.label}
        </Button>
        <Button href={content.ctaSecondary.href} variant="secondary">
          {content.ctaSecondary.label}
        </Button>
      </div>
    </>
  );
}

export default function Hero() {
  const [variant, setVariant] = useState<Variant>("mesh");
  const content = variant === "mesh" ? heroMesh : heroOrb;

  return (
    <section className={styles.section} id="top" aria-label="Hero">
      {variant === "mesh" ? (
        <div className={styles.meshLayout}>
          <div className={styles.meshCanvas}>
            <HeroCanvas variant="mesh" />
          </div>
          <div className={styles.meshCopy}>
            <HeroCopy content={content} />
          </div>
        </div>
      ) : (
        <div className={styles.orbLayout}>
          <div className={styles.orbCopy}>
            <HeroCopy content={content} />
          </div>
          <div className={styles.orbCanvas}>
            <HeroCanvas variant="orb" />
          </div>
        </div>
      )}

      <div className={styles.switcherWrap}>
        <div className={styles.switcher} role="group" aria-label="Hero variant">
          {(["mesh", "orb"] as Variant[]).map((v) => (
            <button
              key={v}
              className={`${styles.switchBtn} ${variant === v ? styles.active : ""}`}
              onClick={() => setVariant(v)}
              aria-pressed={variant === v}
            >
              {v === "mesh" ? "Particle Mesh" : "Data Orb"}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.scrollHint} aria-hidden="true">
        Scroll
      </div>
    </section>
  );
}
