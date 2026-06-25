import styles from "./GradientText.module.css";

interface GradientTextProps {
  children: React.ReactNode;
  as?: "span" | "em" | "strong";
}

export default function GradientText({
  children,
  as: Tag = "span",
}: GradientTextProps) {
  return <Tag className={styles.grad}>{children}</Tag>;
}
