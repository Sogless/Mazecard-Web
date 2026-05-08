import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";

@Entity()
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @OneToMany("Document", "merchantApplication")
  documents: any[];

  @CreateDateColumn()
  createdAt: Date;
}
