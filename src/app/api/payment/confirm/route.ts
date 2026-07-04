import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { admissionId, upiTransactionId } = await request.json();

    if (!admissionId || !upiTransactionId) {
      return NextResponse.json(
        { message: "Admission ID and UPI transaction ID are required" },
        { status: 400 }
      );
    }

    const admission = await prisma.admission.findUnique({
      where: { id: admissionId },
    });

    if (!admission) {
      return NextResponse.json(
        { message: "Admission not found" },
        { status: 404 }
      );
    }

    await prisma.payment.create({
      data: {
        admissionId,
        amount: 2500_00,
        currency: "INR",
        upiTransactionId,
        status: "submitted",
      },
    });

    await prisma.admission.update({
      where: { id: admissionId },
      data: { status: "payment_submitted" },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Payment confirm error:", error);
    return NextResponse.json(
      { message: "Failed to record payment" },
      { status: 500 }
    );
  }
}
