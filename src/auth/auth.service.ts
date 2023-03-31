import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { JwtPayload } from 'src/auth/jwt-payload.interface';
import { IOAuthUser } from './stratagies/google-oauth-20.strategy';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async loginWithGoogle(request: Request & IOAuthUser) {
    if (!request.user) {
      throw new Error('no user');
    }

    // TODO: Check the user does exist

    // TODO: If the user does not exist, create one and redirect to register page

    const accessToken = this.jwtService.sign(<JwtPayload>{}, {
      secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRE_TIME'),
    });

    return { accessToken };
  }
}
