import Image from "next/image";
import FadeIn from "./FadeIn";
import MandalaDivider from "./MandalaDivider";
import styles from "./About.module.css";

export default function About() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.grid}>
        <FadeIn>
          <div className={styles.imageWrap}>
            <div className={styles.imageContainer}>
              <Image
                src="https://images.unsplash.com/photo-1688820661462-a44e4b2770e8?w=700&q=80"
                alt="Classical dancer in traditional costume"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div className={styles.text}>
            <MandalaDivider align="left" showDots={false} />
            <h2>Where Tradition Meets Devotion</h2>
            <p>
              Nritya Lok is a dedicated Indian classical dance school
              committed to preserving and propagating the rich heritage of
              India&apos;s classical dance traditions. Founded with a passion for
              the arts, our school provides a nurturing environment where
              students of all ages can learn, grow, and express themselves
              through dance.
            </p>
            <p>
              Under the guidance of our experienced Guru, students receive
              personalized attention in small batch sizes, ensuring each dancer
              develops proper technique, emotional expression (
              <em>abhinaya</em>), and a deep understanding of the art
              form&apos;s spiritual roots.
            </p>
            <p>
              We believe that classical dance is not merely a performance art —
              it is a discipline that cultivates grace, confidence, cultural
              awareness, and spiritual connection in every practitioner.
            </p>
            <div className={styles.established}>
              Dedicated to the Art of Dance since 2005
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
