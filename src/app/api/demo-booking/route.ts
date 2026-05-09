import { NextResponse } from "next/server";
import { demoBookingSchema } from "@/lib/validators";
import { getDataSource } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = demoBookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const ds = await getDataSource();
    const { Cooperative } = await import("@/entities/Cooperative");
    const { DemoBooking } = await import("@/entities/DemoBooking");

    const coopRepo = ds.getRepository(Cooperative);
    const coop = await coopRepo.findOne({ where: { userId: session.user.id } });

    if (!coop) {
      return NextResponse.json({ error: "Cooperative not found" }, { status: 404 });
    }

    const data = parsed.data;
    const bookingRepo = ds.getRepository(DemoBooking);
    const booking = new DemoBooking();
    booking.cooperativeId = coop.id;
    booking.preferredDate = data.preferred_date;
    booking.timezone = data.timezone;
    booking.topics = data.topics;
    booking.notes = data.notes || "";
    await bookingRepo.save(booking);

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Demo booking error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
