import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@ObjectType()
@Entity()
export class Role {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: "varchar", length: 100 })
  name: string;

  @Field(() => [String], { nullable: true })
  @Column("simple-array", { nullable: true })
  authentication: string[];
}
