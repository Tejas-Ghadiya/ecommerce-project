import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateUserInput{
   
    @Field()
    role: string
    
    @Field()
    name: string

    @Field()
    email: string

    @Field()
    password: string

}