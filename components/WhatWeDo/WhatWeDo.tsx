'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './WhatWeDo.module.css';

type Visual = 'migration' | 'analytics' | 'modernization' | 'security' | 'workspace';

interface Solution {
  num: string;
  badge: string;
  title: string;
  description: string;
  visual: Visual;
}

const SOLUTIONS: Solution[] = [
  {
    num: '01',
    badge: 'Built on Google Cloud',
    title: 'Cloud Migration & Infrastructure',
    description:
      'Enterprise-grade migration with zero downtime, advanced security governance, and optimized performance — built natively on Google Cloud.',
    visual: 'migration',
  },
  {
    num: '02',
    badge: 'BigQuery · Vertex AI',
    title: 'Data & AI Analytics',
    description:
      'Transform raw data into intelligent automation and predictive insights that drive real business decisions, powered by BigQuery and Vertex AI.',
    visual: 'analytics',
  },
  {
    num: '03',
    badge: 'Cloud-native',
    title: 'Application Modernization',
    description:
      'Cloud-native transformation with automated deployment pipelines, containerization, and continuous performance optimization.',
    visual: 'modernization',
  },
  {
    num: '04',
    badge: 'ISO 27001',
    title: 'Security & Compliance',
    description:
      'Comprehensive security governance with unified threat management, continuous monitoring, and audit-ready compliance frameworks.',
    visual: 'security',
  },
  {
    num: '05',
    badge: 'Workspace',
    title: 'Google Workspace',
    description:
      'AI-enhanced collaboration with enterprise-scale migrations, centralized endpoint management, and seamless productivity.',
    visual: 'workspace',
  },
];

function VisualMigration() {
  const lines = [
    { top: '34%', delays: [0, 1.1] },
    { top: '50%', delays: [0.5, 1.6] },
    { top: '66%', delays: [1.0, 2.1] },
  ];
  return (
    <div className={`${styles.visual} ${styles.visualMigration}`} aria-hidden="true">
      <div className={styles.laptop}>
        <span />
        <span />
        <span />
      </div>
      <div className={styles.orb} />
      {lines.map((l) => (
        <div key={l.top} className={styles.wire} style={{ top: l.top }} />
      ))}
      {lines.flatMap((l) =>
        l.delays.map((d, i) => (
          <span
            key={`${l.top}-${i}`}
            className={styles.flowDot}
            style={{ top: l.top, animationDelay: `${d}s` }}
          />
        ))
      )}
    </div>
  );
}

function VisualAnalytics() {
  const bars = [48, 70, 92, 64, 84, 56, 78, 60, 88];
  const durations = [1.0, 1.25, 1.5];
  return (
    <div className={`${styles.visual} ${styles.visualAnalytics}`} aria-hidden="true">
      {bars.map((h, i) => (
        <span
          key={i}
          className={styles.eqBar}
          style={{
            height: `${h}%`,
            animationDuration: `${durations[i % 3]}s`,
            animationDelay: `${i * 0.12}s`,
          }}
        />
      ))}
    </div>
  );
}

function VisualModernization() {
  const rows = [
    { w: 88, dur: 2.2, delay: 0 },
    { w: 66, dur: 2.45, delay: 0.2 },
    { w: 82, dur: 2.7, delay: 0.4 },
    { w: 58, dur: 2.95, delay: 0.6 },
  ];
  return (
    <div className={`${styles.visual} ${styles.visualModernization}`} aria-hidden="true">
      {rows.map((r, i) => (
        <span
          key={i}
          className={styles.layer}
          style={{ width: `${r.w}%`, animationDuration: `${r.dur}s`, animationDelay: `${r.delay}s` }}
        />
      ))}
    </div>
  );
}

function VisualSecurity() {
  return (
    <div className={`${styles.visual} ${styles.visualSecurity}`} aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span key={i} className={styles.ring} style={{ animationDelay: `${i}s` }} />
      ))}
      <div className={styles.shield} />
      <div className={styles.scanline} />
    </div>
  );
}

function VisualWorkspace() {
  return (
    <div className={`${styles.visual} ${styles.visualWorkspace}`} aria-hidden="true">
      <div className={styles.core} />
      <div className={styles.orbitInner}>
        <span />
      </div>
      <div className={styles.orbitOuter}>
        <span />
      </div>
    </div>
  );
}

function SolutionVisual({ visual }: { visual: Visual }) {
  switch (visual) {
    case 'migration':
      return <VisualMigration />;
    case 'analytics':
      return <VisualAnalytics />;
    case 'modernization':
      return <VisualModernization />;
    case 'security':
      return <VisualSecurity />;
    case 'workspace':
      return <VisualWorkspace />;
  }
}

export default function WhatWeDo() {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));

    if (typeof IntersectionObserver === 'undefined') {
      targets.forEach((el) => el.classList.add(styles.revealed));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealed);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="solutions" ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <header data-reveal className={styles.head}>
          <div className={styles.eyebrow}>
            <span className={styles.dot} />
            What We Do
          </div>
          <h2 className={styles.title}>End-to-end Google Cloud, intelligently delivered</h2>
        </header>

        <div className={styles.accordion}>
          {SOLUTIONS.map((s, i) => {
            const isOpen = openIndex === i;
            const panelId = `solution-panel-${i}`;
            const headId = `solution-head-${i}`;
            return (
              <div
                key={s.num}
                data-reveal
                className={styles.item}
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <div className={styles.card}>
                  <button
                    type="button"
                    id={headId}
                    className={`${styles.headerRow} ${isOpen ? styles.headerRowActive : ''}`}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  >
                    <span className={`${styles.numBadge} ${isOpen ? styles.numBadgeActive : ''}`}>
                      {s.num}
                    </span>
                    <span className={styles.headText}>
                      <span className={styles.tag}>{s.badge}</span>
                      <span className={styles.cardTitle}>{s.title}</span>
                    </span>
                    <span className={`${styles.chevron} ${isOpen ? styles.chevronActive : ''}`} />
                  </button>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={headId}
                    className={`${styles.panel} ${isOpen ? styles.panelOpen : ''}`}
                  >
                    <div className={styles.panelClip}>
                      <div className={styles.panelBody}>
                        <div className={styles.copy}>
                          <p className={styles.desc}>{s.description}</p>
                          <span className={styles.learn}>Learn more →</span>
                        </div>
                        <SolutionVisual visual={s.visual} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p data-reveal className={`${styles.footnote} ${styles.footnoteReveal}`}>
          Across Banking & Financial Services · Healthcare · Education · Manufacturing · Retail &
          E-commerce
        </p>
      </div>
    </section>
  );
}
