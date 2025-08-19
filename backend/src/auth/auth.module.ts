import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // 👈 Repo register
  providers: [AuthService, AuthResolver],
  exports: [AuthService], // (optional) export if used in other modules
})
export class AuthModule {}
