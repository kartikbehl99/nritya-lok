import SectionHeader from "./SectionHeader";
import FadeIn from "./FadeIn";
import styles from "./Features.module.css";

const FEATURES = [
  {
    title: "Experienced Guru",
    description:
      "Learn from a dedicated teacher with years of training and performance experience in classical dance traditions.",
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="4" />
        <path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
      </svg>
    ),
  },
  {
    title: "Small Batch Sizes",
    description:
      "Personalized attention in intimate class settings ensures every student masters technique and expression at their own pace.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: "Stage Performances",
    description:
      "Regular opportunities to perform at cultural events, festivals, and annual recitals that build confidence and stage presence.",
    icon: (
      <svg viewBox="0 0 24 24">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section className={styles.section}>
      <SectionHeader
        title="Why Nritya Lok?"
        subtitle="A nurturing space where every student can flourish in their artistic journey."
      />
      <div className={styles.grid}>
        {FEATURES.map((f) => (
          <FadeIn key={f.title}>
            <div className={styles.item}>
              <div className={styles.icon}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
