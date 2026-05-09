import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity({ name: "Cooperative" })
export class Cooperative {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  userId: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ default: "" })
  state: string;

  @Column({ default: "" })
  lga: string;

  @Column()
  contactName: string;

  @Column()
  contactRole: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ default: "" })
  registrationType: string;

  @Column({ default: "" })
  registrationId: string;

  @Column("int")
  estimatedMemberCount: number;

  @Column("int")
  pilotCohortSize: number;

  @Column()
  preferredCardScheme: string;

  @Column()
  usesAkilaah: boolean;

  @Column()
  desiredLaunchTimeline: string;

  @Column({ default: "CREATED" })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
