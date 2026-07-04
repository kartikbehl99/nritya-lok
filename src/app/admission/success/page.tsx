import Link from "next/link";
import Navbar from "@/components/Navbar";
import MandalaDivider from "@/components/MandalaDivider";

export default function SuccessPage() {
  return (
    <>
      <Navbar />
      <main
        style={{
          padding: "120px 24px 80px",
          minHeight: "100vh",
          background: "var(--cream)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ maxWidth: 600, textAlign: "center" }}>
          <div
            style={{
              width: 80,
              height: 80,
              margin: "0 auto 24px",
              background: "#27ae60",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="40"
              height="40"
              fill="none"
              stroke="#fff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <MandalaDivider />
          <h1
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "2rem",
              color: "var(--maroon)",
              marginBottom: 16,
            }}
          >
            Enrollment Successful!
          </h1>
          <p
            style={{
              fontSize: "1.05rem",
              color: "#5a4a3e",
              lineHeight: 1.8,
              marginBottom: 32,
            }}
          >
            Thank you for enrolling at Nritya Lok. Your payment has
            been received and your admission is confirmed. We will contact you
            shortly with class schedule details.
          </p>
          <Link
            href="/"
            style={{
              display: "inline-block",
              padding: "14px 40px",
              background: "var(--maroon)",
              color: "#fff",
              borderRadius: 4,
              fontWeight: 700,
              letterSpacing: "1px",
              textTransform: "uppercase",
              fontSize: "0.9rem",
            }}
          >
            Back to Home
          </Link>
        </div>
      </main>
    </>
  );
}
