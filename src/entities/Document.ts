import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";

@Entity()
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @ManyToOne("Cooperative", "documents", { nullable: true })
  cooperative: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @ManyToOne("MerchantApplication", "documents", { nullable: true })
  merchantApplication: any;

  @CreateDateColumn()
  createdAt: Date;
}
