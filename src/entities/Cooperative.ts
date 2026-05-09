import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";

@Entity({ name: "Cooperative" })
export class Cooperative {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @OneToOne("User", "cooperative")
  @JoinColumn({ name: "userId" })
  user: any;

  @Column()
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @OneToMany("DemoBooking", "cooperative")
  demoBookings: any[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @OneToMany("Document", "cooperative")
  documents: any[];

  @CreateDateColumn()
  createdAt: Date;
}
