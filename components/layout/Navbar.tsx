"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import { navItems, navCta } from "@/lib/data/site";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <div className={styles.inner}>
        <Logo />

        <ul className={styles.links} role="list">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link href={item.href} className={styles.link}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <span className={styles.desktopCta}>
          <Button href={navCta.href} variant="primary">
            {navCta.label}
          </Button>
        </span>

        <button
          className={styles.hamburger}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className={styles.dropdown} role="menu">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={styles.dropLink}
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={navCta.href}
            className={styles.dropCta}
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            {navCta.label}
          </Link>
        </div>
      )}
    </nav>
  );
}
