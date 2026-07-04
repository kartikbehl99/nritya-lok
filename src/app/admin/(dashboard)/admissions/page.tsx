import { prisma } from "@/lib/prisma";
import AdmissionsActions from "@/components/admin/AdmissionsActions";
import styles from "../../admin.module.css";

export const dynamic = "force-dynamic";

export default async function AdminAdmissions() {
  const admissions = await prisma.admission.findMany({
    orderBy: { createdAt: "desc" },
    include: { payments: true },
  });

  return (
    <>
      <div className={styles.pageHeader}>
        <h1>Admissions</h1>
        <p>Manage student enrollment applications</p>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <h2>All Admissions ({admissions.length})</h2>
        </div>
        {admissions.length === 0 ? (
          <div className={styles.empty}>No admissions yet</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Student</th>
                <th>Parent</th>
                <th>Dance Form</th>
                <th>Level</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admissions.map((a) => (
                <tr key={a.id}>
                  <td>
                    <div>{a.studentName}</div>
                    <div style={{ fontSize: "0.78rem", color: "#7a6a5e" }}>
                      {a.email}
                    </div>
                  </td>
                  <td>{a.parentName}</td>
                  <td>{a.danceForm}</td>
                  <td>{a.experienceLevel}</td>
                  <td>{a.phone}</td>
                  <td>
                    {new Date(a.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                    })}
                  </td>
                  <td>
                    <span
                      className={`${styles.badge} ${
                        a.status === "approved"
                          ? styles.badgeApproved
                          : a.status === "rejected"
                            ? styles.badgeRejected
                            : a.status === "payment_submitted"
                              ? styles.badgePaid
                              : styles.badgePending
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>
                  <td>
                    <AdmissionsActions
                      id={a.id}
                      currentStatus={a.status}
                    />
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
