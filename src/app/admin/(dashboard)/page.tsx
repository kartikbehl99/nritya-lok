import { prisma } from "@/lib/prisma";
import styles from "../admin.module.css";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [totalAdmissions, pendingAdmissions, paidAdmissions, totalPayments, messageCount] =
    await Promise.all([
      prisma.admission.count(),
      prisma.admission.count({ where: { status: "pending" } }),
      prisma.admission.count({ where: { status: "approved" } }),
      prisma.payment.aggregate({
        where: { status: "verified" },
        _sum: { amount: true },
      }),
      prisma.contactMessage.count(),
    ]);

  const revenue = (totalPayments._sum.amount || 0) / 100;

  const recentAdmissions = await prisma.admission.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <div className={styles.pageHeader}>
        <h1>Dashboard</h1>
        <p>Overview of admissions and payments</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Total Admissions</h3>
          <div className={styles.value}>{totalAdmissions}</div>
        </div>
        <div className={styles.statCard}>
          <h3>Pending</h3>
          <div className={styles.value}>{pendingAdmissions}</div>
        </div>
        <div className={styles.statCard}>
          <h3>Paid / Confirmed</h3>
          <div className={styles.value}>{paidAdmissions}</div>
        </div>
        <div className={styles.statCard}>
          <h3>Total Revenue</h3>
          <div className={styles.value}>
            &#8377; {revenue.toLocaleString("en-IN")}
          </div>
        </div>
        <div className={styles.statCard}>
          <h3>Messages</h3>
          <div className={styles.value}>{messageCount}</div>
        </div>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <h2>Recent Admissions</h2>
        </div>
        {recentAdmissions.length === 0 ? (
          <div className={styles.empty}>No admissions yet</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Student</th>
                <th>Dance Form</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentAdmissions.map((a) => (
                <tr key={a.id}>
                  <td>{a.studentName}</td>
                  <td>{a.danceForm}</td>
                  <td>
                    {new Date(a.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td>
                    <span
                      className={`${styles.badge} ${
                        a.status === "paid"
                          ? styles.badgePaid
                          : a.status === "approved"
                            ? styles.badgeApproved
                            : a.status === "rejected"
                              ? styles.badgeRejected
                              : styles.badgePending
                      }`}
                    >
                      {a.status}
                    </span>
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
