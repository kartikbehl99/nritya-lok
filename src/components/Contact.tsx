"use client";

import { useState, useRef } from "react";
import SectionHeader from "./SectionHeader";
import FadeIn from "./FadeIn";
import styles from "./Contact.module.css";

const HOURS = [
  { day: "Mon – Sun", time: "Open 24 Hours" },
];

export default function Contact() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit() {
    if (!formRef.current) return;
    const form = new FormData(formRef.current);
    const data = {
      name: form.get("name") as string,
      email: form.get("email") as string,
      phone: (form.get("phone") as string) || undefined,
      message: form.get("message") as string,
    };

    if (!data.name || !data.email || !data.message) {
      setError("Please fill in all required fields.");
      return;
    }

    setSending(true);
    setError("");
    setFieldErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSent(true);
        formRef.current.reset();
      } else {
        const result = await res.json();
        if (result.errors) {
          const errs: Record<string, string> = {};
          for (const err of result.errors) {
            errs[err.path[0]] = err.message;
          }
          setFieldErrors(errs);
        } else {
          setError(result.message || "Failed to send. Please try again.");
        }
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className={styles.section} id="contact">
      <SectionHeader
        title="Get In Touch"
        subtitle="Ready to start your classical dance journey? Reach out to us for class schedules, enrollment, and any queries."
      />
      <div className={styles.grid}>
        <FadeIn>
          <div className={styles.info}>
            {/* Address */}
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <svg viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <h4>Visit Us</h4>
                <p>
                  Nritya Lok
                  <br />
                  Rd Number 1, Rajeev Nagar
                  <br />
                  Keshri Nagar, Patna, Bihar 800024
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <svg viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <div>
                <h4>Call Us</h4>
                <p>
                  <a href="tel:+918252411906">+91 82524 11906</a>
                </p>
              </div>
            </div>

            {/* Email */}
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <svg viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <h4>Email</h4>
                <p>
                  <a href="mailto:info@nrityalok.com">
                    info@nrityalok.com
                  </a>
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <h4>Class Timings</h4>
                <div className={styles.hoursTable}>
                  {HOURS.map((h) => (
                    <div key={h.day} className={styles.hoursRow}>
                      <span className={styles.day}>{h.day}</span>
                      <span className={styles.time}>{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <form className={styles.form} ref={formRef} onSubmit={(e) => e.preventDefault()}>
            <h3>Send Us a Message</h3>
            {sent ? (
              <div style={{ background: "#d4edda", border: "1px solid #c3e6cb", borderRadius: 4, padding: "14px 18px", color: "#155724", fontSize: "0.95rem" }}>
                Thank you! Your message has been sent. We&apos;ll get back to you soon.
              </div>
            ) : (
              <>
                <div>
                  <input name="name" type="text" placeholder="Your Name" required />
                  {fieldErrors.name && <p style={{ color: "#c0392b", fontSize: "0.82rem", marginTop: 4 }}>{fieldErrors.name}</p>}
                </div>
                <div>
                  <input name="email" type="email" placeholder="Your Email" required />
                  {fieldErrors.email && <p style={{ color: "#c0392b", fontSize: "0.82rem", marginTop: 4 }}>{fieldErrors.email}</p>}
                </div>
                <input name="phone" type="tel" placeholder="Phone Number" />
                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message — tell us about your interest in dance classes..."
                    required
                  />
                  {fieldErrors.message && <p style={{ color: "#c0392b", fontSize: "0.82rem", marginTop: 4 }}>{fieldErrors.message}</p>}
                </div>
                {error && (
                  <p style={{ color: "#c0392b", fontSize: "0.85rem" }}>{error}</p>
                )}
                <button
                  type="button"
                  className={styles.submitBtn}
                  onClick={handleSubmit}
                  disabled={sending}
                  style={{ opacity: sending ? 0.6 : 1 }}
                >
                  {sending ? "Sending..." : "Send Message"}
                </button>
              </>
            )}
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
