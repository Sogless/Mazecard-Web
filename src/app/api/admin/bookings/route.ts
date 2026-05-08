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
    const { DemoBooking } = await import("@/entities/DemoBooking");
    const items = await ds.getRepository(DemoBooking).find({ order: { createdAt: "DESC" }, relations: ["cooperative"] });
    return NextResponse.json(items);
  } catch (err) {
    console.error("Admin bookings error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
