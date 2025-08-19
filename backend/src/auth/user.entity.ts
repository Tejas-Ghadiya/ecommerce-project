import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
@Entity()
export class User{
    @Field( () => Int )
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column()
    user_type: string

    @Field()
    @Column()
    name: string

    @Field()
    @Column()
    email: string

    @Field()
    @Column()
    password: string
}