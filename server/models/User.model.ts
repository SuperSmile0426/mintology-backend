import { Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ObjectIdColumn, ObjectId } from "typeorm";
import { CoreModel } from "./Core.model";

@Entity({ name: "user" })
export class UserModel extends CoreModel{
  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;
}
