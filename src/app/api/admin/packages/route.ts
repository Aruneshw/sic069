import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin, toSlug } from "@/lib/adminAuth";
import crypto from "crypto";

/**
 * GET /api/admin/packages
 * Returns ALL packages (regardless of status), ordered by createdAt desc.
 */
export async function GET(req: NextRequest) {
  const auth = await verifyAdmin(req);
  if (auth.error) return auth.error;

  const { data, error } = await auth.supabase
    .from("Package")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) {
    console.error("Admin GET packages error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  return NextResponse.json(data || []);
}

/**
 * POST /api/admin/packages
 * Creates a new package. Auto-generates id, slug, createdAt, updatedAt.
 */
export async function POST(req: NextRequest) {
  const auth = await verifyAdmin(req);
  if (auth.error) return auth.error;

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Validate required fields
  const required = [
    "name",
    "tagline",
    "description",
    "tierBadge",
    "bundlePrice",
    "duration",
    "maxSeats",
    "imageUrl",
    "itinerary",
    "inclusions",
    "includedTripIds",
  ];

  for (const field of required) {
    if (
      body[field] === undefined ||
      body[field] === null ||
      body[field] === ""
    ) {
      return NextResponse.json(
        { error: `Field '${field}' is required` },
        { status: 400 }
      );
    }
  }

  // Generate slug from name
  const slug = toSlug(body.name as string);

  // Check slug uniqueness
  const { data: existing } = await auth.supabase
    .from("Package")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  if (existing) {
    return NextResponse.json(
      { error: "A package with this slug already exists. Choose a different name." },
      { status: 409 }
    );
  }

  const now = new Date().toISOString();
  const packageData = {
    id: crypto.randomUUID(),
    name: body.name,
    slug,
    tagline: body.tagline,
    description: body.description,
    tierBadge: body.tierBadge,
    bundlePrice: Number(body.bundlePrice),
    duration: body.duration,
    maxSeats: Number(body.maxSeats),
    filledSeats: Number(body.filledSeats ?? 0),
    imageUrl: body.imageUrl,
    videoUrl: (body.videoUrl as string) || null,
    status: (body.status as string) || "Draft",
    itinerary:
      typeof body.itinerary === "string"
        ? body.itinerary
        : JSON.stringify(body.itinerary),
    inclusions:
      typeof body.inclusions === "string"
        ? body.inclusions
        : JSON.stringify(body.inclusions),
    includedTripIds:
      typeof body.includedTripIds === "string"
        ? body.includedTripIds
        : JSON.stringify(body.includedTripIds),
    createdAt: now,
    updatedAt: now,
  };

  const { data, error } = await auth.supabase
    .from("Package")
    .insert(packageData)
    .select()
    .single();

  if (error) {
    console.error("Admin POST package error:", error);
    return NextResponse.json({ error: "Failed to create package" }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
