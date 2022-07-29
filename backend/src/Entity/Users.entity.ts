import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

export enum UserRole {
  ADMIN = "admin",
  EDITOR = "editor",
  USER = "user",
}

@Entity("users")
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text", unique: true })
  email!: string;

  @Column({ type: "text" })
  password!: string;

  @Column({ type: "text", nullable: true })
  name!: string;

  @Column({ type: "text", nullable: true })
  surname!: string;

  @Column({ type: "text", nullable: true })
  phone!: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  role!: string;
}
