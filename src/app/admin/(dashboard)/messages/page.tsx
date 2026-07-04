import { prisma } from "@/lib/prisma";
import styles from "../../admin.module.css";

export const dynamic = "force-dynamic";

export default async function AdminMessages() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <div className={styles.pageHeader}>
        <h1>Messages</h1>
        <p>Enquiries from the contact form</p>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <h2>All Messages ({messages.length})</h2>
        </div>
        {messages.length === 0 ? (
          <div className={styles.empty}>No messages yet</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((m) => (
                <tr key={m.id}>
                  <td style={{ fontWeight: m.read ? 400 : 600 }}>{m.name}</td>
                  <td>
                    <a href={`mailto:${m.email}`}>{m.email}</a>
                  </td>
                  <td>{m.phone || "—"}</td>
                  <td
                    style={{
                      maxWidth: 300,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    title={m.message}
                  >
                    {m.message}
                  </td>
                  <td>
                    {new Date(m.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
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
