"use client";

import { useRouter } from "next/navigation";
import styles from "@/app/admin/admin.module.css";

export default function AdmissionsActions({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: string;
}) {
  const router = useRouter();

  async function updateStatus(status: string) {
    await fetch(`/api/admin/admissions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    router.refresh();
  }

  if (currentStatus === "approved" || currentStatus === "rejected") {
    return null;
  }

  return (
    <>
      <button
        className={`${styles.actionBtn} ${styles.approveBtn}`}
        onClick={() => updateStatus("approved")}
      >
        Approve
      </button>
      <button
        className={`${styles.actionBtn} ${styles.rejectBtn}`}
        onClick={() => updateStatus("rejected")}
      >
        Reject
      </button>
    </>
  );
}
