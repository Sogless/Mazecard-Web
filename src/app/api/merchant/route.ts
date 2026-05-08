import { NextResponse } from "next/server";
import { merchantSchema } from "@/lib/validators";
import { getDataSource } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = merchantSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const ds = await getDataSource();
    const { MerchantApplication } = await import("@/entities/MerchantApplication");

    const repo = ds.getRepository(MerchantApplication);
    const app = new MerchantApplication();
    app.businessName = data.business_name;
    app.category = data.category;
    app.address = data.address;
    app.contactName = data.contact_name;
    app.email = data.email;
    app.phone = data.phone;
    app.registrationId = data.registration_id || "";
    await repo.save(app);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Merchant application error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
