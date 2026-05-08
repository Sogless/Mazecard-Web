import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ default: false })
  isAdmin: boolean;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @OneToOne("Cooperative", "user")
  cooperative: any;

  @CreateDateColumn()
  createdAt: Date;
}
