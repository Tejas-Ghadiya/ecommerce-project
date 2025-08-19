import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { User } from "./user.entity";
import { CreateUserInput } from "./dto/create-user.input";
import { LoginInput } from "./dto/login.input";

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  // 👇 Query root mate simple list query
  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.authService.findAll();
  }

  @Mutation(() => User)
  register(@Args('input') input: CreateUserInput) {
    return this.authService.register(input);
  }

  @Mutation(() => User, { nullable: true })
  login(@Args('input') input: LoginInput) {
    return this.authService.login(input);
  }
}
