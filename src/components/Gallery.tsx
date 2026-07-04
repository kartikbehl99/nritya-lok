import Image from "next/image";
import SectionHeader from "./SectionHeader";
import FadeIn from "./FadeIn";
import styles from "./Gallery.module.css";

const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1651512186979-737021ace442?w=500&q=80",
    alt: "Classical dance pose",
  },
  {
    src: "https://images.unsplash.com/photo-1722440044170-8df784901428?w=500&q=80",
    alt: "Bharatanatyam performance",
  },
  {
    src: "https://images.unsplash.com/photo-1721816337032-fc34499ffa18?w=500&q=80",
    alt: "Dance recital moment",
  },
  {
    src: "https://images.unsplash.com/photo-1645264090488-a019de493023?w=500&q=80",
    alt: "Traditional dance celebration",
  },
];

export default function Gallery() {
  return (
    <section className={styles.section} id="gallery">
      <SectionHeader
        title="Glimpses of Grace"
        subtitle="Moments captured from our performances, classes, and cultural celebrations."
      />
      <FadeIn>
        <div className={styles.grid}>
          {IMAGES.map((img) => (
            <div key={img.src} className={styles.imageWrap}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 700px) 50vw, (max-width: 900px) 50vw, 25vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
