import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { status } = await request.json();

  if (!["verified", "rejected"].includes(status)) {
    return NextResponse.json({ message: "Invalid status" }, { status: 400 });
  }

  const payment = await prisma.payment.update({
    where: { id },
    data: { status },
  });

  if (status === "verified") {
    await prisma.admission.update({
      where: { id: payment.admissionId },
      data: { status: "approved" },
    });
  }

  return NextResponse.json({ success: true });
}
