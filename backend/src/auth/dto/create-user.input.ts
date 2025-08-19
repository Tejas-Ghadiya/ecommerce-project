import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateUserInput{
   
    @Field()
    user_type: string
    
    @Field()
    name: string

    @Field()
    email: string

    @Field()
    password: string

}