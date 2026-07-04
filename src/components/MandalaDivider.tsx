import styles from "./MandalaDivider.module.css";

type MandalaDividerProps = {
  variant?: "default" | "light";
  align?: "center" | "left";
  showDots?: boolean;
};

export default function MandalaDivider({
  variant = "default",
  align = "center",
  showDots = true,
}: MandalaDividerProps) {
  const className = [
    styles.divider,
    variant === "light" ? styles.light : "",
    align === "left" ? styles.alignLeft : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className}>
      <div className={styles.line} />
      {showDots && <div className={styles.dot} />}
      <div className={styles.diamond} />
      {showDots && <div className={styles.dot} />}
      <div className={styles.line} />
    </div>
  );
}
