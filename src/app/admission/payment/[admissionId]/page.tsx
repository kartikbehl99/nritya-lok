import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import UpiPayment from "@/components/PaymentButton";
import MandalaDivider from "@/components/MandalaDivider";
import { prisma } from "@/lib/prisma";

export default async function PaymentPage({
  params,
}: {
  params: Promise<{ admissionId: string }>;
}) {
  const { admissionId } = await params;
  const admission = await prisma.admission.findUnique({
    where: { id: admissionId },
  });

  if (!admission) notFound();

  return (
    <>
      <Navbar />
      <main
        style={{
          padding: "120px 24px 80px",
          minHeight: "100vh",
          background: "var(--cream)",
        }}
      >
        <div
          style={{
            maxWidth: 600,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <MandalaDivider />
          <h1
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              color: "var(--maroon)",
              marginBottom: 32,
            }}
          >
            Complete Your Payment
          </h1>

          <div
            style={{
              background: "#fff",
              border: "1px solid var(--border-gold)",
              borderRadius: 8,
              padding: 32,
              marginBottom: 32,
              textAlign: "left",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-playfair), serif",
                color: "var(--maroon)",
                fontSize: "1.2rem",
                marginBottom: 20,
                borderBottom: "1px solid var(--border-gold)",
                paddingBottom: 12,
              }}
            >
              Admission Summary
            </h2>
            <div style={{ display: "grid", gap: 12, fontSize: "0.95rem" }}>
              {[
                ["Student", admission.studentName],
                ["Dance Form", admission.danceForm],
                ["Experience", admission.experienceLevel],
                ["Parent/Guardian", admission.parentName],
                ["Email", admission.email],
                ["Phone", admission.phone],
              ].map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #f0e8df",
                    paddingBottom: 8,
                  }}
                >
                  <span style={{ color: "#7a6a5e" }}>{label}</span>
                  <span style={{ fontWeight: 600 }}>{value}</span>
                </div>
              ))}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: 8,
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "var(--maroon)",
                }}
              >
                <span>Enrollment Fee</span>
                <span>&#8377; 2,500</span>
              </div>
            </div>
          </div>

          <UpiPayment
            admissionId={admission.id}
            studentName={admission.studentName}
          />
        </div>
      </main>
    </>
  );
}
