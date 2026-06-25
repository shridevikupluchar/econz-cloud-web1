'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './ClientVoices.module.css';

interface Testimonial {
  quote: string;
  name: string;
  company: string;
  initial: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Almost a decade later, I don't worry about IT services. They've been our one stop for anything tech — people who get things done without noise.",
    name: 'Jay',
    company: 'Wisdom Toolz Learning Solutions',
    initial: 'J',
  },
  {
    quote:
      'Their expertise and support deploying Google Workspace have been commendable — the fastest, most reliable turnaround we have seen.',
    name: 'Krishnateja Penamakuru',
    company: 'COO, Dhruva Space',
    initial: 'K',
  },
  {
    quote:
      'All issues were resolved in reasonable time, allowing us to function without downtime. A truly professional approach throughout.',
    name: 'Joshy Jose',
    company: 'Sevenseas Express',
    initial: 'J',
  },
  {
    quote:
      'The support team is excellent and provides solutions very fast. Their coordination and renewal support are much appreciated.',
    name: 'P. Centhil Kumar',
    company: 'IT Business Support, The Residency Towers',
    initial: 'P',
  },
  {
    quote:
      'Professional, responsive, and attentive to our needs. We felt supported throughout and are extremely satisfied with the results.',
    name: 'MD. Shahid',
    company: 'Zenith Manufacturing',
    initial: 'M',
  },
];

const ROTATE_MS = 5400;
const STAR_DELAYS = [0, 0.18, 0.36, 0.54, 0.72];
const VOICE = [
  { h: 40, dur: 0.9 },
  { h: 70, dur: 1.08 },
  { h: 100, dur: 1.26 },
  { h: 55, dur: 1.44 },
  { h: 85, dur: 0.9 },
  { h: 60, dur: 1.08 },
  { h: 95, dur: 1.26 },
];

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return reduced;
}

function Stars() {
  return (
    <div className={styles.stars} aria-hidden="true">
      {STAR_DELAYS.map((d, i) => (
        <span key={i} className={styles.star} style={{ animationDelay: `${d}s` }} />
      ))}
    </div>
  );
}

function VoiceBars() {
  return (
    <div className={styles.voice} aria-hidden="true">
      {VOICE.map((b, i) => (
        <span
          key={i}
          className={styles.voiceBar}
          style={{ height: `${b.h}%`, animationDuration: `${b.dur}s`, animationDelay: `${i * 0.09}s` }}
        />
      ))}
    </div>
  );
}

export default function ClientVoices() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const count = TESTIMONIALS.length;

  const goTo = useCallback(
    (i: number) => setActive(((i % count) + count) % count),
    [count]
  );

  useEffect(() => {
    if (paused || reducedMotion) return;
    const t = window.setTimeout(() => goTo(active + 1), ROTATE_MS);
    return () => window.clearTimeout(t);
  }, [active, paused, reducedMotion, goTo]);

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
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <header data-reveal className={styles.head}>
          <div className={styles.eyebrow}>
            <span className={styles.dot} />
            Client Voices
          </div>
          <h2 className={styles.title}>Partnerships that outlast projects</h2>
        </header>

        <div
          data-reveal
          className={styles.card}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          aria-roledescription="carousel"
          aria-label="Client testimonials"
        >
          <div className={styles.glow} aria-hidden="true" />
          <span className={styles.bigQuote} aria-hidden="true">
            &ldquo;
          </span>
          <span className={`${styles.corner} ${styles.cornerTL}`} aria-hidden="true" />
          <span className={`${styles.corner} ${styles.cornerTR}`} aria-hidden="true" />
          <span className={`${styles.corner} ${styles.cornerBL}`} aria-hidden="true" />
          <span className={`${styles.corner} ${styles.cornerBR}`} aria-hidden="true" />

          <div className={styles.stage}>
            {TESTIMONIALS.map((t, i) => {
              const isActive = i === active;
              return (
                <div
                  key={i}
                  className={`${styles.slide} ${isActive ? styles.slideActive : ''}`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${count}`}
                  aria-hidden={!isActive}
                >
                  <Stars />
                  <p className={styles.quote}>{t.quote}</p>
                  <div className={styles.author}>
                    <div className={styles.avatar}>
                      <span className={styles.avRing} />
                      <span className={`${styles.avRing} ${styles.avRingDelayed}`} />
                      <div className={styles.avInitial}>{t.initial}</div>
                    </div>
                    <div className={styles.authorText}>
                      <div className={styles.authorName}>{t.name}</div>
                      <div className={styles.authorCompany}>{t.company}</div>
                    </div>
                    <VoiceBars />
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.controls}>
            <button
              type="button"
              className={styles.arrow}
              onClick={() => goTo(active - 1)}
              aria-label="Previous testimonial"
            >
              <span className={styles.arrowPrev} />
            </button>

            <div className={styles.dots} role="tablist" aria-label="Choose testimonial">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`${t.name}, ${t.company}`}
                  className={`${styles.dotBtn} ${i === active ? styles.dotBtnActive : ''}`}
                  onClick={() => goTo(i)}
                >
                  {t.initial}
                </button>
              ))}
            </div>

            <button
              type="button"
              className={styles.arrow}
              onClick={() => goTo(active + 1)}
              aria-label="Next testimonial"
            >
              <span className={styles.arrowNext} />
            </button>
          </div>

          <div className={styles.progressTrack} aria-hidden="true">
            <div
              key={active}
              className={styles.progressFill}
              style={{
                animationPlayState: paused ? 'paused' : 'running',
                animationName: reducedMotion ? 'none' : undefined,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
