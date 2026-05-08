/**
 * Run with: npx tsx scripts/seed-admin.ts
 * Seeds the admin user into the database.
 */
import "reflect-metadata";
import { DataSource } from "typeorm";
import bcrypt from "bcryptjs";
import { User } from "@/entities/User";
import { Cooperative } from "@/entities/Cooperative";
import { MerchantApplication } from "@/entities/MerchantApplication";
import { DemoBooking } from "@/entities/DemoBooking";
import { Document } from "@/entities/Document";
import { ContactMessage } from "@/entities/ContactMessage";

async function main() {
  const ds = new DataSource({
    type: "better-sqlite3",
    database: process.env.DATABASE_PATH || "mazecard.db",
    synchronize: true,
    entities: [User, Cooperative, MerchantApplication, DemoBooking, Document, ContactMessage],
  });

  await ds.initialize();
  const repo = ds.getRepository(User);

  const email = "oluwasogoisaac.oguntade@gmail.com";
  const password = "Mz18101993#";

  let user = await repo.findOne({ where: { email } });
  if (user) {
    user.isAdmin = true;
    await repo.save(user);
    console.log("Existing user promoted to admin:", email);
  } else {
    user = new User();
    user.email = email;
    user.passwordHash = await bcrypt.hash(password, 10);
    user.isAdmin = true;
    await repo.save(user);
    console.log("Admin user created:", email);
  }

  await ds.destroy();
}

main().catch(console.error);
