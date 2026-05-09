import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity({ name: "DemoBooking" })
export class DemoBooking {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  cooperativeId: string;

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
