import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin, toSlug } from "@/lib/adminAuth";

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/admin/packages/[id]
 * Returns a single package by ID.
 */
export async function GET(req: NextRequest, { params }: RouteParams) {
  const auth = await verifyAdmin(req);
  if (auth.error) return auth.error;

  const { id } = await params;

  const { data, error } = await auth.supabase
    .from("Package")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Package not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}

/**
 * PUT /api/admin/packages/[id]
 * Updates an existing package. Accepts partial fields.
 */
export async function PUT(req: NextRequest, { params }: RouteParams) {
  const auth = await verifyAdmin(req);
  if (auth.error) return auth.error;

  const { id } = await params;

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Check the package exists
  const { data: existing } = await auth.supabase
    .from("Package")
    .select("id, slug")
    .eq("id", id)
    .single();

  if (!existing) {
    return NextResponse.json({ error: "Package not found" }, { status: 404 });
  }

  // Build update payload — only include fields that were sent
  const updateData: Record<string, unknown> = {
    updatedAt: new Date().toISOString(),
  };

  const allowedFields = [
    "name",
    "tagline",
    "description",
    "tierBadge",
    "bundlePrice",
    "duration",
    "maxSeats",
    "filledSeats",
    "imageUrl",
    "videoUrl",
    "status",
    "itinerary",
    "inclusions",
    "includedTripIds",
  ];

  for (const field of allowedFields) {
    if (body[field] !== undefined) {
      if (field === "bundlePrice" || field === "maxSeats" || field === "filledSeats") {
        updateData[field] = Number(body[field]);
      } else if (field === "itinerary" || field === "inclusions" || field === "includedTripIds") {
        updateData[field] =
          typeof body[field] === "string"
            ? body[field]
            : JSON.stringify(body[field]);
      } else {
        updateData[field] = body[field];
      }
    }
  }

  // Re-generate slug if name changed
  if (body.name && typeof body.name === "string") {
    const newSlug = toSlug(body.name);

    // Check slug uniqueness (exclude current package)
    const { data: slugConflict } = await auth.supabase
      .from("Package")
      .select("id")
      .eq("slug", newSlug)
      .neq("id", id)
      .maybeSingle();

    if (slugConflict) {
      return NextResponse.json(
        { error: "A package with this slug already exists. Choose a different name." },
        { status: 409 }
      );
    }

    updateData.slug = newSlug;
  }

  const { data, error } = await auth.supabase
    .from("Package")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Admin PUT package error:", error);
    return NextResponse.json({ error: "Failed to update package" }, { status: 500 });
  }

  return NextResponse.json(data);
}

/**
 * DELETE /api/admin/packages/[id]
 * Deletes a package. Associated enquiries are cascade-deleted by FK constraint.
 */
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  const auth = await verifyAdmin(req);
  if (auth.error) return auth.error;

  const { id } = await params;

  // Check the package exists
  const { data: existing } = await auth.supabase
    .from("Package")
    .select("id")
    .eq("id", id)
    .single();

  if (!existing) {
    return NextResponse.json({ error: "Package not found" }, { status: 404 });
  }

  const { error } = await auth.supabase
    .from("Package")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Admin DELETE package error:", error);
    return NextResponse.json({ error: "Failed to delete package" }, { status: 500 });
  }

  return new NextResponse(null, { status: 204 });
}
