// src/auth/auth.resolver.ts
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { LoginInput } from './dto/login.input';
import { LoginResponse } from './dto/login-response';
import { RegisterResponse } from './dto/register-response';

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => RegisterResponse)
  register(@Args('input') input: CreateUserInput) {
    return this.authService.register(input);
  }

  @Mutation(() => LoginResponse)  // ✅ not User
  login(@Args('input') input: LoginInput) {
    return this.authService.login(input);
  }


  @Query(() => [User])
  users() {
    return this.authService.findAll();
  }
}
