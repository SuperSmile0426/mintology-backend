import { Column, Entity, ManyToOne } from "typeorm";

import { CoreEntity } from "./";

@Entity({ name: "user" })
export class UserEntity extends CoreEntity {
  @Column({ name: "email", nullable: true, type: "varchar" })
  email?: string;

  @Column({ name: "password", select: false })
  password: string;
}
