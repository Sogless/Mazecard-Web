import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getDataSource } from "@/lib/db";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/signin");
  }

  const ds = await getDataSource();
  const { Cooperative } = await import("@/entities/Cooperative");
  const coopRepo = ds.getRepository(Cooperative);
  const coop = await coopRepo.findOne({ where: { userId: session.user.id } });

  if (!coop) {
    redirect("/cooperative/create");
  }

  const coopData = {
    name: coop.name,
    address: coop.address,
    state: coop.state,
    lga: coop.lga,
    contactName: coop.contactName,
    contactRole: coop.contactRole,
    email: coop.email,
    phone: coop.phone,
    estimatedMemberCount: coop.estimatedMemberCount,
    pilotCohortSize: coop.pilotCohortSize,
    preferredCardScheme: coop.preferredCardScheme,
    usesAkilaah: coop.usesAkilaah,
    desiredLaunchTimeline: coop.desiredLaunchTimeline,
    status: coop.status,
  };

  return <DashboardClient coop={coopData} />;
}
