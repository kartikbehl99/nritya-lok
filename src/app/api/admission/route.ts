import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const admissionSchema = z.object({
  studentName: z.string().min(2, "Name must be at least 2 characters"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["Female", "Male", "Other"], { message: "Please select a gender" }),
  parentName: z.string().min(2, "Parent name must be at least 2 characters"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  danceForm: z.enum(["Bharatanatyam", "Kathak", "Semi-Classical & Folk"], { message: "Please select a dance form" }),
  experienceLevel: z.enum(["Beginner", "Intermediate", "Advanced"], { message: "Please select experience level" }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = admissionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { errors: parsed.error.issues },
        { status: 400 }
      );
    }

    const admission = await prisma.admission.create({
      data: parsed.data,
    });

    return NextResponse.json({ id: admission.id }, { status: 201 });
  } catch (error) {
    console.error("Admission error:", error);
    return NextResponse.json(
      { message: "Failed to create admission" },
      { status: 500 }
    );
  }
}
