import "reflect-metadata";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let dataSource: any = null;

export async function getDataSource() {
  if (dataSource && dataSource.isInitialized) {
    return dataSource;
  }

  const { DataSource } = await import("typeorm");
  const { User } = await import("@/entities/User");
  const { Cooperative } = await import("@/entities/Cooperative");
  const { MerchantApplication } = await import("@/entities/MerchantApplication");
  const { DemoBooking } = await import("@/entities/DemoBooking");
  const { Document } = await import("@/entities/Document");
  const { ContactMessage } = await import("@/entities/ContactMessage");

  dataSource = new DataSource({
    type: "better-sqlite3",
    database: process.env.DATABASE_PATH || "mazecard.db",
    synchronize: true,
    entities: [User, Cooperative, MerchantApplication, DemoBooking, Document, ContactMessage],
  });

  await dataSource.initialize();
  return dataSource;
}
