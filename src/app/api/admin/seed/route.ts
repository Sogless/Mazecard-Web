import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDataSource } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, secret } = body;

    if (secret !== process.env.ADMIN_SEED_SECRET) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const ds = await getDataSource();
    const { User } = await import("@/entities/User");
    const repo = ds.getRepository(User);

    const existing = await repo.findOne({ where: { email } });
    if (existing) {
      existing.isAdmin = true;
      await repo.save(existing);
      return NextResponse.json({ success: true, message: "User promoted to admin" });
    }

    const user = new User();
    user.email = email;
    user.passwordHash = await bcrypt.hash(password, 10);
    user.isAdmin = true;
    await repo.save(user);

    return NextResponse.json({ success: true, message: "Admin user created" });
  } catch (err) {
    console.error("Admin seed error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
