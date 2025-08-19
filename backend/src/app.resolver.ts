import { Query, Field, Int, ObjectType, Resolver } from "@nestjs/graphql";

@ObjectType()
class User{
    @Field()
    name: string

    @Field({nullable:true})
    email: string
}

@Resolver( of => String )
export class AppResolver{
    @Query( returns => String )
    index():string{
        return "hello"
    }

    @Query( () => [ User ], { name: 'get_user'} )
    GetUser(){
        return [{name: 'Test-1', email:'test1@gmail.com'},{name: 'Test-2', email: null},{name: 'Test-3', email:'test3@gmail.com'},]
    }

}