"use client";

import { useState } from "react";
import styles from "./Navbar.module.css";

const NAV_ITEMS = [
  { href: "#about", label: "About" },
  { href: "#programs", label: "Programs" },
  { href: "#gallery", label: "Gallery" },
  { href: "/admission", label: "Admission" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <a href="/" className={styles.logo}>
          Nritya Lok
          <span className={styles.hindi}>नृत्य लोक</span>
        </a>

        <ul
          className={`${styles.links} ${open ? styles.linksOpen : ""}`}
        >
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className={`${styles.hamburger} ${open ? styles.hamburgerOpen : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
