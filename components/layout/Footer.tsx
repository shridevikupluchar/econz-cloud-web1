import Link from "next/link";
import Logo from "@/components/ui/Logo";
import {
  footerBlurb,
  footerCert,
  footerCopyright,
  footerLegal,
  offices,
} from "@/lib/data/content";
import { siteConfig } from "@/lib/data/site";
import styles from "./Footer.module.css";

const socialIcons: Record<string, string> = {
  facebook: "f",
  instagram: "ig",
  linkedin: "in",
  youtube: "yt",
};

export default function Footer() {
  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.top}>
        <div className={styles.brand}>
          <Logo />
          <p className={styles.blurb}>{footerBlurb}</p>
          <span className={styles.cert}>{footerCert}</span>
        </div>

        <div className={styles.offices}>
          {offices.map((o) => (
            <address key={o.city} className={styles.office}>
              <span className={styles.officeCity}>
                <span aria-label={o.country}>{o.flag}</span> {o.city}
              </span>
              <span className={styles.officeAddr}>{o.address}</span>
            </address>
          ))}
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copy}>{footerCopyright}</p>

        <nav className={styles.legal} aria-label="Legal links">
          {footerLegal.map((l) => (
            <Link key={l.label} href={l.href} className={styles.legalLink}>
              {l.label}
            </Link>
          ))}
        </nav>

        <nav className={styles.social} aria-label="Social links">
          {(
            Object.entries(siteConfig.social) as [string, string][]
          ).map(([key, url]) => (
            <a
              key={key}
              href={url}
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={key}
            >
              {socialIcons[key]}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
