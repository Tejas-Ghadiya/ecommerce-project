import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Role } from "./role.entity";
import { CreateRoleInput } from "./dto/create-role.input";

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private roleRepo: Repository<Role>
  ) {}

  async addRole(input: CreateRoleInput): Promise<Role> {
    // check if role already exists
    const existingRole = await this.roleRepo.findOne({
      where: { name: input.name },
    });

    if (existingRole) {
      throw new BadRequestException("Role already exists");
    }

    // create new role
    const newRole = this.roleRepo.create(input);
    if(newRole){
        return await this.roleRepo.save(newRole);
    }else{
        throw new BadRequestException("Role not create");
    }
  }
}
