"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";

const UPI_ID = process.env.NEXT_PUBLIC_UPI_ID || "yourname@upi";
const AMOUNT = 2500;
const PAYEE_NAME = "Nritya Lok";

function buildUpiUrl(admissionId: string) {
  return `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${AMOUNT}&cu=INR&tn=${encodeURIComponent(`Enrollment Fee - ${admissionId}`)}`;
}

type Props = {
  admissionId: string;
  studentName: string;
};

export default function UpiPayment({ admissionId, studentName }: Props) {
  const router = useRouter();
  const [txnId, setTxnId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const upiUrl = buildUpiUrl(admissionId);

  function copyUpiId() {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleConfirm() {
    if (!txnId.trim()) {
      setError("Please enter your UPI transaction/reference ID");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/payment/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ admissionId, upiTransactionId: txnId.trim() }),
      });

      if (res.ok) {
        router.push("/admission/success");
      } else {
        const data = await res.json();
        setError(data.message || "Something went wrong");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28, alignItems: "center" }}>
      {/* QR Code */}
      <div
        style={{
          background: "#fff",
          padding: 24,
          borderRadius: 12,
          border: "1px solid var(--border-gold)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <p style={{ fontSize: "0.85rem", color: "#7a6a5e" }}>
          Scan with any UPI app
        </p>
        <QRCodeSVG
          value={upiUrl}
          size={200}
          bgColor="#ffffff"
          fgColor="#1A0A05"
          level="M"
        />
        <div
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "var(--maroon)",
          }}
        >
          &#8377; {AMOUNT.toLocaleString("en-IN")}
        </div>
      </div>

      {/* Pay via UPI App button (mobile) */}
      <a
        href={upiUrl}
        style={{
          display: "inline-block",
          padding: "14px 40px",
          background: "var(--maroon)",
          color: "#fff",
          borderRadius: 4,
          fontWeight: 700,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          fontSize: "0.9rem",
          textAlign: "center",
        }}
      >
        Pay via UPI App
      </a>

      {/* UPI ID copy */}
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: "0.85rem", color: "#7a6a5e", marginBottom: 8 }}>
          Or pay manually to this UPI ID
        </p>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: "#fff",
            border: "1px solid var(--border-gold)",
            borderRadius: 6,
            padding: "10px 16px",
          }}
        >
          <code style={{ fontSize: "1rem", color: "var(--maroon)", fontWeight: 600 }}>
            {UPI_ID}
          </code>
          <button
            onClick={copyUpiId}
            style={{
              background: "var(--cream-dark)",
              border: "1px solid var(--border-gold)",
              borderRadius: 4,
              padding: "4px 12px",
              fontSize: "0.8rem",
              cursor: "pointer",
              color: "var(--brown-text)",
            }}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          borderTop: "1px solid var(--border-gold)",
          paddingTop: 24,
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "1.1rem",
            color: "var(--maroon)",
            marginBottom: 12,
            textAlign: "center",
          }}
        >
          After Payment
        </h3>
        <p
          style={{
            fontSize: "0.88rem",
            color: "#7a6a5e",
            textAlign: "center",
            marginBottom: 16,
            lineHeight: 1.6,
          }}
        >
          Enter the UPI transaction/reference ID from your payment confirmation
          to complete enrollment.
        </p>

        <input
          type="text"
          placeholder="UPI Transaction ID (e.g. 412345678901)"
          value={txnId}
          onChange={(e) => setTxnId(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 16px",
            border: "1px solid var(--border-gold)",
            borderRadius: 4,
            fontSize: "0.95rem",
            outline: "none",
            marginBottom: 12,
            fontFamily: "monospace",
          }}
        />

        {error && (
          <p style={{ color: "#c0392b", fontSize: "0.85rem", marginBottom: 12, textAlign: "center" }}>
            {error}
          </p>
        )}

        <button
          onClick={handleConfirm}
          disabled={submitting}
          style={{
            width: "100%",
            padding: "14px",
            background: "#27ae60",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            fontSize: "0.95rem",
            fontWeight: 700,
            cursor: submitting ? "not-allowed" : "pointer",
            opacity: submitting ? 0.6 : 1,
          }}
        >
          {submitting ? "Confirming..." : "I've Paid — Confirm Payment"}
        </button>
      </div>

      <p style={{ fontSize: "0.78rem", color: "#999", textAlign: "center" }}>
        Paying for: {studentName}
      </p>
    </div>
  );
}
