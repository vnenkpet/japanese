import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from './jwt.service';
import { ConfigModule } from '../config/config.module';
import { ContextFactory } from './context.factory';

@Module({
  imports: [ConfigModule],
  providers: [AuthService, JwtService, ContextFactory],
  exports: [ContextFactory, AuthService],
})
export class AuthModule {}
