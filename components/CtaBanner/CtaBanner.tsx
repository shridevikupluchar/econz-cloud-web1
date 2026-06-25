'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import styles from './CtaBanner.module.css';

interface CtaBannerProps {
  dashboardSrc?: string;
  dashboardAlt?: string;
  logoSrc?: string;
  logoAlt?: string;
  primaryHref?: string;
  secondaryHref?: string;
}

const STAR_DELAYS = [0, 0.2, 0.4, 0.6, 0.8];
const EQ_BARS = [
  { h: 45, dur: 1.3, delay: 0 },
  { h: 70, dur: 1.5, delay: 0.15 },
  { h: 55, dur: 1.1, delay: 0.3 },
  { h: 88, dur: 1.6, delay: 0.45 },
  { h: 62, dur: 1.25, delay: 0.6 },
];

export default function CtaBanner({
  dashboardSrc,
  dashboardAlt = 'econz migration dashboard',
  logoSrc,
  logoAlt = 'Client logo',
  primaryHref = '#contact',
  secondaryHref = '#contact',
}: CtaBannerProps) {
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

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    const els = Array.from(root.querySelectorAll<HTMLElement>('[data-parallax]'));
    if (!els.length) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      els.forEach((el) => {
        const sp = parseFloat(el.dataset.parallax || '0');
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2 - vh / 2;
        el.style.transform = `translate3d(0, ${(-center * sp).toFixed(1)}px, 0)`;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="contact" ref={sectionRef} className={styles.section}>
      <div data-reveal className={styles.banner}>
        <span data-parallax="0.05" className={`${styles.orb} ${styles.orbTop}`} aria-hidden="true" />
        <span data-parallax="0.08" className={`${styles.orb} ${styles.orbBottom}`} aria-hidden="true" />

        <div className={styles.grid}>
          {/* LEFT */}
          <div className={styles.copy}>
            <div className={styles.eyebrow}>
              <span className={styles.dot} />
              Get Started
            </div>
            <h2 className={styles.title}>Let&rsquo;s map your move to the cloud</h2>
            <p className={styles.desc}>
              Get a free assessment from a Google Cloud Premier Partner — no downtime, no surprises,
              a decade of expertise behind every step.
            </p>

            <div className={styles.actions}>
              <a href={primaryHref} className={styles.btnPrimary}>
                Book a Free Assessment →
              </a>
              <a href={secondaryHref} className={styles.btnGhost}>
                Talk to an Expert
              </a>
            </div>

            <div className={styles.trust}>
              <div className={styles.isoBadge}>
                <span className={styles.isoIcon} aria-hidden="true">
                  <span className={styles.shield} />
                </span>
                <span className={styles.isoText}>
                  ISO/IEC
                  <br />
                  27001:2022
                </span>
              </div>
              <span className={styles.divider} aria-hidden="true" />
              <div>
                <div className={styles.stars} aria-hidden="true">
                  {STAR_DELAYS.map((d, i) => (
                    <span key={i} className={styles.star} style={{ animationDelay: `${d}s` }} />
                  ))}
                </div>
                <span className={styles.trustLabel}>200+ migrations delivered</span>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className={styles.visual}>
            <div className={styles.window}>
              <div className={styles.windowBar}>
                <span className={`${styles.tl} ${styles.tlRed}`} />
                <span className={`${styles.tl} ${styles.tlYellow}`} />
                <span className={`${styles.tl} ${styles.tlGreen}`} />
                <span className={styles.urlPill}>
                  <span className={styles.lock} />
                  console.econz.cloud/migrate
                </span>
              </div>
              <div className={styles.screen}>
                {dashboardSrc ? (
                  <Image
                    src={dashboardSrc}
                    alt={dashboardAlt}
                    fill
                    sizes="(max-width: 760px) 90vw, 520px"
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <span className={styles.screenPlaceholder}>Dashboard preview</span>
                )}
              </div>
            </div>

            {/* floating chip: migration */}
            <div className={`${styles.chip} ${styles.chipMigration}`}>
              <div className={styles.chipHead}>
                <span className={styles.chipTitle}>Migration</span>
                <span className={styles.live}>
                  <span className={styles.liveDot} />
                  LIVE
                </span>
              </div>
              <div className={styles.progressTrack}>
                <div className={styles.progressFill} />
              </div>
              <div className={styles.chipFoot}>
                <span>Workloads</span>
                <span className={styles.chipFootHi}>Zero downtime</span>
              </div>
            </div>

            {/* floating chip: throughput */}
            <div className={`${styles.chip} ${styles.chipThroughput}`}>
              <div className={styles.chipTitle}>Throughput</div>
              <div className={styles.eq}>
                {EQ_BARS.map((b, i) => (
                  <span
                    key={i}
                    className={styles.eqBar}
                    style={{
                      height: `${b.h}%`,
                      animationDuration: `${b.dur}s`,
                      animationDelay: `${b.delay}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* floating pill: logo */}
            <div className={styles.logoPill}>
              {logoSrc ? (
                <Image src={logoSrc} alt={logoAlt} width={34} height={34} className={styles.logoImg} />
              ) : (
                <span className={styles.logoPlaceholder} aria-hidden="true" />
              )}
              <span className={styles.logoText}>Your workloads, secured</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
