import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const status = searchParams.get("status");

    const where: any = {};
    if (category && category !== "All") where.category = category;
    if (status) where.status = status;

    const trips = await prisma.trip.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: trips });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch trips" }, { status: 500 });
  }
}
