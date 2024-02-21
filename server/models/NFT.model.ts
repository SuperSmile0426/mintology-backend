import { Entity, Column, ObjectIdColumn, ObjectId } from "typeorm";
import { CoreModel } from "./Core.model";

@Entity({ name: "nft" })
export class NFTModel extends CoreModel {
  @ObjectIdColumn({ nullable: false })
  user_id: ObjectId;

  @Column({ nullable: false })
  token_id: string;

  @Column({ nullable: false  })
  name: string;

  @Column({ nullable: false  })
  image: string;

  @Column({ nullable: false  })
  wallet_address: string;

  @Column({ nullable: false  })
  project_id: string;

  @Column({ nullable: true })
  animation_url?: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  title?: string;

  @Column({ nullable: true })
  subTitle?: string;

  @Column({ nullable: true })
  premintId?: string;

  @Column({ nullable: true })
  attributes?: any;
}
