import { prisma } from "@/lib/prisma";
import PaymentActions from "@/components/admin/PaymentActions";
import styles from "../../admin.module.css";

export const dynamic = "force-dynamic";

export default async function AdminPayments() {
  const payments = await prisma.payment.findMany({
    orderBy: { createdAt: "desc" },
    include: { admission: { select: { studentName: true, email: true } } },
  });

  return (
    <>
      <div className={styles.pageHeader}>
        <h1>Payments</h1>
        <p>Verify UPI payments from students</p>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <h2>All Payments ({payments.length})</h2>
        </div>
        {payments.length === 0 ? (
          <div className={styles.empty}>No payments yet</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Student</th>
                <th>Amount</th>
                <th>UPI Transaction ID</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div>{p.admission.studentName}</div>
                    <div style={{ fontSize: "0.78rem", color: "#7a6a5e" }}>
                      {p.admission.email}
                    </div>
                  </td>
                  <td>
                    &#8377; {(p.amount / 100).toLocaleString("en-IN")}
                  </td>
                  <td style={{ fontSize: "0.85rem", fontFamily: "monospace" }}>
                    {p.upiTransactionId || "—"}
                  </td>
                  <td>
                    {new Date(p.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td>
                    <span
                      className={`${styles.badge} ${
                        p.status === "verified"
                          ? styles.badgeApproved
                          : p.status === "submitted"
                            ? styles.badgePending
                            : p.status === "rejected"
                              ? styles.badgeRejected
                              : styles.badgeCreated
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td>
                    <PaymentActions id={p.id} currentStatus={p.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
