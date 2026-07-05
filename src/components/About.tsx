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
              Nritya Lok is a vibrant school of Indian classical dance, music,
              and visual arts — committed to preserving and propagating the rich
              cultural heritage of India. We provide a nurturing environment
              where students of all ages can learn, grow, and express themselves
              through art.
            </p>
            <p>
              Under the guidance of our experienced teachers, students receive
              personalized attention in small batch sizes, ensuring they develop
              proper technique, emotional depth, and a deep understanding of
              each art form&apos;s spiritual roots.
            </p>
            <p>
              We believe that the classical arts are not merely performance —
              they are disciplines that cultivate grace, confidence, cultural
              awareness, and spiritual connection in every practitioner.
            </p>
            <div className={styles.established}>
              Dedicated to the Classical Arts
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
