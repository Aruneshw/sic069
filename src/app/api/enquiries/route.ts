import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tripId, userEmail, userName, message, date } = body;

    if (!tripId || !userEmail) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const enquiry = await prisma.enquiry.create({
      data: {
        tripId,
        userEmail,
        userName,
        message,
      },
    });

    return NextResponse.json({ success: true, data: enquiry });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to submit enquiry" }, { status: 500 });
  }
}
