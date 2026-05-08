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
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
    entities: [User, Cooperative, MerchantApplication, DemoBooking, Document, ContactMessage],
  });

  await dataSource.initialize();
  return dataSource;
}
