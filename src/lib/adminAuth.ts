import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const ADMIN_EMAIL = "aruneshownsty1@gmail.com";

// Service-role client for DB mutations (bypasses RLS)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface AdminAuthResult {
  error?: NextResponse;
  supabase: typeof supabaseAdmin;
  userId: string;
}

/**
 * Verifies that the incoming request is from the authenticated admin user.
 * Extracts the Bearer token from the Authorization header, validates it
 * against Supabase Auth, and checks the email matches the admin email.
 *
 * Returns the service-role Supabase client for executing privileged queries.
 */
export async function verifyAdmin(
  req: NextRequest
): Promise<AdminAuthResult> {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    return {
      error: NextResponse.json(
        { error: "Unauthorized — no token provided" },
        { status: 401 }
      ),
      supabase: supabaseAdmin,
      userId: "",
    };
  }

  const {
    data: { user },
    error,
  } = await supabaseAdmin.auth.getUser(token);

  if (error || !user) {
    return {
      error: NextResponse.json(
        { error: "Unauthorized — invalid or expired token" },
        { status: 401 }
      ),
      supabase: supabaseAdmin,
      userId: "",
    };
  }

  if (user.email !== ADMIN_EMAIL) {
    return {
      error: NextResponse.json(
        { error: "Forbidden — admin access only" },
        { status: 403 }
      ),
      supabase: supabaseAdmin,
      userId: "",
    };
  }

  return {
    supabase: supabaseAdmin,
    userId: user.id,
  };
}

/**
 * Generates a URL-safe slug from a package name.
 */
export function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
