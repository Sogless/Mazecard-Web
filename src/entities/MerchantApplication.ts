import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity({ name: "MerchantApplication" })
export class MerchantApplication {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  businessName: string;

  @Column()
  category: string;

  @Column()
  address: string;

  @Column()
  contactName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ default: "" })
  registrationId: string;

  @Column({ default: "RECEIVED" })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
