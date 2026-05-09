import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";

@Entity({ name: "DemoBooking" })
export class DemoBooking {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  cooperativeId: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @ManyToOne("Cooperative", "demoBookings")
  cooperative: any;

  @Column()
  preferredDate: string;

  @Column()
  timezone: string;

  @Column("simple-json")
  topics: string[];

  @Column({ default: "" })
  notes: string;

  @Column({ default: "PENDING" })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
