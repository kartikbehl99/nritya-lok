"use client";

import { useRouter } from "next/navigation";
import styles from "@/app/admin/admin.module.css";

export default function PaymentActions({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: string;
}) {
  const router = useRouter();

  async function updateStatus(status: string) {
    await fetch(`/api/admin/payments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    router.refresh();
  }

  if (currentStatus === "verified" || currentStatus === "rejected") {
    return null;
  }

  return (
    <>
      <button
        className={`${styles.actionBtn} ${styles.approveBtn}`}
        onClick={() => updateStatus("verified")}
      >
        Verify
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
