import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { Role } from "./role.entity";
import { RoleService } from "./role.service";
import { CreateRoleInput } from "./dto/create-role.input";

@Resolver(() => Role)
export class RoleResolver {
  constructor(private roleService: RoleService) {}

  @Mutation(() => Role)
  async createRole(@Args("input") input: CreateRoleInput): Promise<Role> {
    return this.roleService.addRole(input);
  }
}
