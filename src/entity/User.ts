import * as uuidv4 from "uuid/v4";

import {
  BaseEntity,
  Column,
  Entity,
  BeforeInsert,
  PrimaryColumn
} from "typeorm";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryColumn("uuid")
  id: string;

  @Column("varchar", { length: 255 })
  email: string;

  @Column("text")
  password: string;

  @BeforeInsert()
  add() {
    this.id = uuidv4();
  }
}
