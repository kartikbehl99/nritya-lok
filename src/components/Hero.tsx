import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.bg} role="img" aria-label="Indian classical dancer performing" />
      <div className={styles.content}>
        <p className={styles.sanskrit}>नृत्य लोक</p>
        <h1>
          Nritya <span className={styles.accent}>Lok</span>
        </h1>
        <p className={styles.subtitle}>
          Nurturing the timeless art of Indian classical dance since 2005
        </p>
        <a href="#contact" className={styles.cta}>
          Begin Your Journey
        </a>
      </div>
      <div className={styles.scroll}>
        <svg viewBox="0 0 24 24">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}
