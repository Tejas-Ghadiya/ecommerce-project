import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../user.entity';

@ObjectType()
export class RegisterResponse {
  @Field(() => User)
  user: User;

  @Field()
  token: string;
}
