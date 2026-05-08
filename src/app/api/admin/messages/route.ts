import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getDataSource } from "@/lib/db";

export async function GET() {
  try {
    const session = await auth();
    if (!(session?.user as any)?.isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const ds = await getDataSource();
    const { ContactMessage } = await import("@/entities/ContactMessage");
    const items = await ds.getRepository(ContactMessage).find({ order: { createdAt: "DESC" } });
    return NextResponse.json(items);
  } catch (err) {
    console.error("Admin messages error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
