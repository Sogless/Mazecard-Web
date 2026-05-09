import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity({ name: "Document" })
export class Document {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  fileName: string;

  @Column()
  docType: string;

  @Column()
  filePath: string;

  @Column({ nullable: true })
  cooperativeId: string;

  @Column({ nullable: true })
  merchantApplicationId: string;

  @CreateDateColumn()
  createdAt: Date;
}
