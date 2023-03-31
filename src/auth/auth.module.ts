import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleOAuth20Strategy } from './stratagies/google-oauth-20.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule, JwtModule.register({})],
  providers: [AuthService, GoogleOAuth20Strategy],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
