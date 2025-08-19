import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { LoginInput } from './dto/login.input';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async register(input: CreateUserInput): Promise<User> {
    const user = this.userRepo.create(input);
    return this.userRepo.save(user);
  }

  async login(input: LoginInput): Promise<User | null> {
    const user = await this.userRepo.findOneBy({ email: input.email });
    if (user && user.password === input.password) {
      return user;
    }
    return null;
  }

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }
}
