import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity({ name: "ContactMessage" })
export class ContactMessage {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  type: string; // sales | partnership | support

  @Column("text")
  message: string;

  @CreateDateColumn()
  createdAt: Date;
}
