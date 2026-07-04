import MandalaDivider from "./MandalaDivider";
import FadeIn from "./FadeIn";
import styles from "./SectionHeader.module.css";

type SectionHeaderProps = {
  title: string;
  subtitle: string;
  variant?: "default" | "light";
};

export default function SectionHeader({
  title,
  subtitle,
  variant = "default",
}: SectionHeaderProps) {
  return (
    <FadeIn>
      <div
        className={`${styles.header} ${variant === "light" ? styles.light : ""}`}
      >
        <MandalaDivider variant={variant} />
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
    </FadeIn>
  );
}
