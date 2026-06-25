import Link from "next/link";
import styles from "./Button.module.css";

interface ButtonProps {
  href: string;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  href,
  variant = "primary",
  children,
  className,
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`${styles.btn} ${styles[variant]} ${className ?? ""}`}
    >
      {children}
    </Link>
  );
}
