import Navbar from "@/components/Navbar";
import AdmissionForm from "@/components/AdmissionForm";
import MandalaDivider from "@/components/MandalaDivider";
import styles from "./page.module.css";

export default function AdmissionPage() {
  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.header}>
          <MandalaDivider />
          <h1>Admission Form</h1>
          <p>
            Fill in the details below to enroll at Nritya Lok.
            After submission, you&apos;ll be directed to complete the enrollment
            fee payment.
          </p>
        </div>
        <AdmissionForm />
      </main>
    </>
  );
}
