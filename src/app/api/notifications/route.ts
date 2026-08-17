import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("Notification")
      .select("*")
      .order("createdAt", { ascending: false });

    if (error) {
      console.error("Error fetching notifications:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err: any) {
    console.error("API Route Error:", err);
    return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, markAll } = body;

    if (markAll) {
      // Mark all unread notifications as read
      const { error } = await supabase
        .from("Notification")
        .update({ isRead: true })
        .eq("isRead", false);

      if (error) throw error;
      return NextResponse.json({ success: true });
    }

    if (id) {
      // Mark a single notification as read
      const { error } = await supabase
        .from("Notification")
        .update({ isRead: true })
        .eq("id", id);

      if (error) throw error;
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Missing id or markAll flag" }, { status: 400 });
  } catch (err: any) {
    console.error("API Route Error:", err);
    return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 });
  }
}
