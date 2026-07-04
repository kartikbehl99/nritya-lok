import Image from "next/image";
import SectionHeader from "./SectionHeader";
import FadeIn from "./FadeIn";
import styles from "./DanceForms.module.css";

const FORMS = [
  {
    title: "Bharatanatyam",
    description:
      "One of the oldest classical dance forms from Tamil Nadu, known for its fixed upper torso, expressive hand gestures, and intricate footwork.",
    image:
      "https://images.unsplash.com/photo-1722440044211-e5ec891a2822?w=600&q=80",
    alt: "Bharatanatyam dancer in traditional pose",
  },
  {
    title: "Kathak",
    description:
      "A North Indian dance form characterized by rhythmic foot movements, spins, and expressive storytelling rooted in ancient temple traditions.",
    image:
      "https://images.unsplash.com/photo-1712192682756-ae5b3a8e7508?w=600&q=80",
    alt: "Kathak dance performance",
  },
  {
    title: "Semi-Classical & Folk",
    description:
      "Fusion and folk styles that blend classical techniques with contemporary expression, perfect for stage performances and cultural events.",
    image:
      "https://images.unsplash.com/photo-1729079004970-df864ed944ea?w=600&q=80",
    alt: "Classical dance performance",
  },
];

export default function DanceForms() {
  return (
    <section className={styles.section} id="dance-forms">
      <SectionHeader
        title="Dance Forms We Teach"
        subtitle="Explore the diverse classical dance traditions offered at our school, each with its own unique style, rhythm, and storytelling heritage."
        variant="light"
      />
      <div className={styles.grid}>
        {FORMS.map((form) => (
          <FadeIn key={form.title}>
            <div className={styles.card}>
              <div className={styles.imageWrap}>
                <Image
                  src={form.image}
                  alt={form.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.overlay}>
                <h3>{form.title}</h3>
                <p>{form.description}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
