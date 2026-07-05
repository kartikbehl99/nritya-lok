import Image from "next/image";
import SectionHeader from "./SectionHeader";
import FadeIn from "./FadeIn";
import styles from "./DanceForms.module.css";

const PROGRAMS = [
  {
    title: "Bharatanatyam",
    category: "Dance",
    description:
      "One of the oldest classical dance forms from Tamil Nadu, known for its fixed upper torso, expressive hand gestures, and intricate footwork.",
    image:
      "https://images.unsplash.com/photo-1722440044211-e5ec891a2822?w=600&q=80",
    alt: "Bharatanatyam dancer in traditional pose",
  },
  {
    title: "Kathak",
    category: "Dance",
    description:
      "A North Indian dance form characterized by rhythmic foot movements, spins, and expressive storytelling rooted in ancient temple traditions.",
    image:
      "https://images.unsplash.com/photo-1712192682756-ae5b3a8e7508?w=600&q=80",
    alt: "Kathak dance performance",
  },
  {
    title: "Semi-Classical & Folk",
    category: "Dance",
    description:
      "Fusion and folk styles that blend classical techniques with contemporary expression, perfect for stage performances and cultural events.",
    image:
      "https://images.unsplash.com/photo-1729079004970-df864ed944ea?w=600&q=80",
    alt: "Classical dance performance",
  },
  {
    title: "Hindustani Vocal",
    category: "Music",
    description:
      "Training in raaga-based Hindustani classical vocals, covering alaap, taan, bandish, and various taals for solo and ensemble performance.",
    image:
      "https://images.unsplash.com/photo-1612249075164-f5e6a6181364?w=600&q=80",
    alt: "Indian classical music performance",
  },
  {
    title: "Tabla & Percussion",
    category: "Music",
    description:
      "Learn the rhythmic art of tabla — from basic bols and taals to complex compositions, building a strong foundation in Indian rhythm.",
    image:
      "https://images.unsplash.com/photo-1633411988188-6e63354a9019?w=600&q=80",
    alt: "Tabla drums close-up",
  },
  {
    title: "Drawing & Painting",
    category: "Art",
    description:
      "From pencil sketching to watercolor and acrylic painting — explore your creativity through guided lessons in traditional and modern art techniques.",
    image:
      "https://images.unsplash.com/photo-1615184697985-c9bde1b07da7?w=600&q=80",
    alt: "Painting and art supplies",
  },
];

export default function DanceForms() {
  return (
    <section className={styles.section} id="programs">
      <SectionHeader
        title="What We Teach"
        subtitle="From classical dance and Hindustani music to visual arts — explore our diverse programs rooted in India's rich cultural heritage."
        variant="light"
      />
      <div className={styles.grid}>
        {PROGRAMS.map((form) => (
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
                <span className={styles.category}>{form.category}</span>
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
