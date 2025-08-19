import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bycript from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { LoginInput } from './dto/login.input';
import { LoginResponse } from './dto/login-response';
import { RegisterResponse } from './dto/register-response';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

async register(input: CreateUserInput): Promise<RegisterResponse> {
  const existingUser = await this.userRepo.findOne({
    where: { email: input.email },
  });

  if (existingUser) {
    throw new UnauthorizedException('User already registered with this email');
  }

  const hashedPassword = await bycript.hash(input.password, 10);

  const user = this.userRepo.create({
    ...input,
    password: hashedPassword,
  });

  const savedUser = await this.userRepo.save(user);

  const payload = { sub: savedUser.id, email: savedUser.email, role: savedUser.role };
  const token = this.jwtService.sign(payload);

  return { user: savedUser, token };
}


async login(input: LoginInput): Promise<LoginResponse> {
  const user = await this.userRepo.findOne({ where: { email: input.email } });
  if (!user) throw new UnauthorizedException('User not found');

  const isPasswordValid = await bycript.compare(input.password, user.password);
  if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

  const payload = { sub: user.id, email: user.email, role: user.role };
  const token = this.jwtService.sign(payload);

  return { 
    user,
    token
  };
}


  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }
}
