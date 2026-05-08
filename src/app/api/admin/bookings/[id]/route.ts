import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getDataSource } from "@/lib/db";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!(session?.user as any)?.isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const body = await req.json();
    const ds = await getDataSource();
    const { DemoBooking } = await import("@/entities/DemoBooking");
    const repo = ds.getRepository(DemoBooking);
    const item = await repo.findOne({ where: { id } });
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (body.status) item.status = body.status;
    await repo.save(item);
    return NextResponse.json(item);
  } catch (err) {
    console.error("Admin booking update error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
