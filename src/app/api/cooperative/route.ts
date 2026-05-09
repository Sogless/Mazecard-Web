import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDataSource } from "@/lib/db";
import { coopStep1Schema, coopStep2Schema } from "@/lib/validators";
import { z } from "zod";

const fullSchema = coopStep1Schema.merge(coopStep2Schema).merge(
  z.object({
    password: z.string().min(8),
    confirm_password: z.string(),
  })
).refine((d) => d.password === d.confirm_password, {
  message: "Passwords do not match",
  path: ["confirm_password"],
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = fullSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const ds = await getDataSource();
    const { User } = await import("@/entities/User");
    const { Cooperative } = await import("@/entities/Cooperative");

    const userRepo = ds.getRepository(User);
    const existing = await userRepo.findOne({ where: { email: data.email } });
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = new User();
    user.email = data.email;
    user.passwordHash = passwordHash;
    await userRepo.save(user);

    const coopRepo = ds.getRepository(Cooperative);
    const coop = new Cooperative();
    coop.userId = user.id;
    coop.name = data.cooperative_name;
    coop.address = data.address;
    coop.state = data.state || "";
    coop.lga = data.lga || "";
    coop.contactName = data.contact_name;
    coop.contactRole = data.contact_role;
    coop.email = data.email;
    coop.phone = data.phone;
    coop.registrationType = data.registration_type || "";
    coop.registrationId = data.registration_id || "";
    coop.estimatedMemberCount = data.estimated_member_count;
    coop.pilotCohortSize = data.pilot_cohort_size;
    coop.preferredCardScheme = data.preferred_card_scheme;
    coop.usesAkilaah = data.uses_akilaah === "true";
    coop.desiredLaunchTimeline = data.desired_launch_timeline;
    await coopRepo.save(coop);

    return NextResponse.json({ success: true, cooperativeId: coop.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Cooperative creation error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
