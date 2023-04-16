import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

import { AuthService } from './auth.service';
import { GoogleOAuth20Strategy } from './stratagies/google-oauth-20.strategy';
import { JwtStrategy } from './stratagies/jwt.strategy';

import { AuthController } from './auth.controller';

@Module({
  imports: [UsersModule, ConfigModule, JwtModule.register({})],
  providers: [AuthService, JwtStrategy, GoogleOAuth20Strategy],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
