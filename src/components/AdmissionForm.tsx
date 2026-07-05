"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./AdmissionForm.module.css";

const PROGRAMS = {
  "Dance": ["Bharatanatyam", "Kathak", "Semi-Classical & Folk"],
  "Music": ["Hindustani Vocal", "Tabla & Percussion", "Harmonium", "Sitar"],
  "Art": ["Drawing & Sketching", "Painting", "Mehendi Art"],
};
const EXPERIENCE_LEVELS = ["Beginner", "Intermediate", "Advanced"];

type FormErrors = Record<string, string>;

export default function AdmissionForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formError, setFormError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setFormError("");

    const form = new FormData(e.currentTarget);
    const data = {
      studentName: form.get("studentName") as string,
      dateOfBirth: form.get("dateOfBirth") as string,
      gender: form.get("gender") as string,
      parentName: form.get("parentName") as string,
      phone: form.get("phone") as string,
      email: form.get("email") as string,
      address: form.get("address") as string,
      program: form.get("program") as string,
      experienceLevel: form.get("experienceLevel") as string,
    };

    try {
      const res = await fetch("/api/admission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        if (result.errors) {
          const fieldErrors: FormErrors = {};
          for (const err of result.errors) {
            fieldErrors[err.path[0]] = err.message;
          }
          setErrors(fieldErrors);
        } else {
          setFormError(result.message || "Something went wrong");
        }
        return;
      }

      router.push(`/admission/payment/${result.id}`);
    } catch {
      setFormError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {formError && <div className={styles.formError}>{formError}</div>}

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="studentName">Student&apos;s Full Name *</label>
          <input id="studentName" name="studentName" type="text" required />
          {errors.studentName && (
            <span className={styles.error}>{errors.studentName}</span>
          )}
        </div>
        <div className={styles.field}>
          <label htmlFor="dateOfBirth">Date of Birth *</label>
          <input id="dateOfBirth" name="dateOfBirth" type="date" required />
          {errors.dateOfBirth && (
            <span className={styles.error}>{errors.dateOfBirth}</span>
          )}
        </div>
      </div>

      <div className={styles.field}>
        <label>Gender *</label>
        <div className={styles.radioGroup}>
          {["Female", "Male", "Other"].map((g) => (
            <label key={g} className={styles.radioLabel}>
              <input type="radio" name="gender" value={g} required />
              {g}
            </label>
          ))}
        </div>
        {errors.gender && (
          <span className={styles.error}>{errors.gender}</span>
        )}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="parentName">Parent / Guardian Name *</label>
          <input id="parentName" name="parentName" type="text" required />
          {errors.parentName && (
            <span className={styles.error}>{errors.parentName}</span>
          )}
        </div>
        <div className={styles.field}>
          <label htmlFor="phone">Phone Number *</label>
          <input id="phone" name="phone" type="tel" required />
          {errors.phone && (
            <span className={styles.error}>{errors.phone}</span>
          )}
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="email">Email Address *</label>
        <input id="email" name="email" type="email" required />
        {errors.email && (
          <span className={styles.error}>{errors.email}</span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="address">Address *</label>
        <textarea id="address" name="address" required />
        {errors.address && (
          <span className={styles.error}>{errors.address}</span>
        )}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="program">Program *</label>
          <select id="program" name="program" required defaultValue="">
            <option value="" disabled>
              Select a program
            </option>
            {Object.entries(PROGRAMS).map(([category, items]) => (
              <optgroup key={category} label={category}>
                {items.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </optgroup>
            ))}
          </select>
          {errors.program && (
            <span className={styles.error}>{errors.program}</span>
          )}
        </div>
        <div className={styles.field}>
          <label>Experience Level *</label>
          <div className={styles.radioGroup}>
            {EXPERIENCE_LEVELS.map((l) => (
              <label key={l} className={styles.radioLabel}>
                <input type="radio" name="experienceLevel" value={l} required />
                {l}
              </label>
            ))}
          </div>
          {errors.experienceLevel && (
            <span className={styles.error}>{errors.experienceLevel}</span>
          )}
        </div>
      </div>

      <div className={styles.feeBox}>
        <h3>Enrollment Fee</h3>
        <div className={styles.amount}>&#8377; 2,500</div>
        <p>One-time admission fee (payable after form submission)</p>
      </div>

      <button type="submit" className={styles.submit} disabled={loading}>
        {loading ? "Submitting..." : "Submit & Proceed to Payment"}
      </button>
    </form>
  );
}
