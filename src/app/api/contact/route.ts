import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validators";
import { getDataSource } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const ds = await getDataSource();
    const { ContactMessage } = await import("@/entities/ContactMessage");

    const repo = ds.getRepository(ContactMessage);
    const msg = new ContactMessage();
    msg.name = parsed.data.name;
    msg.email = parsed.data.email;
    msg.type = parsed.data.type;
    msg.message = parsed.data.message;
    await repo.save(msg);

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Contact message error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
