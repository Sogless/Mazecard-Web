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
    const { Cooperative } = await import("@/entities/Cooperative");
    const { MerchantApplication } = await import("@/entities/MerchantApplication");
    const { DemoBooking } = await import("@/entities/DemoBooking");
    const { ContactMessage } = await import("@/entities/ContactMessage");

    const [cooperatives, merchants, bookings, messages] = await Promise.all([
      ds.getRepository(Cooperative).count(),
      ds.getRepository(MerchantApplication).count(),
      ds.getRepository(DemoBooking).count(),
      ds.getRepository(ContactMessage).count(),
    ]);

    return NextResponse.json({ cooperatives, merchants, bookings, messages });
  } catch (err) {
    console.error("Admin stats error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
