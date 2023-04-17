import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

import {
  Strategy,
  StrategyOptions,
  ExtractJwt,
  VerifyCallback,
  VerifiedCallback,
} from 'passport-jwt';

import { IVerifyCallback } from '../verify-callback.interface';
import { JwtPayload } from 'src/auth/jwt-payload.interface';

import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.schema';

export const STRATEGY_NAME = 'jwt';

const JwtFromCookie = (key: string) => {
  return (req: Request) => {
    const accessToken = req.cookies?.[key];
    return accessToken ? accessToken : null;
  };
};

@Injectable()
export class JwtStrategy
  extends PassportStrategy(Strategy, STRATEGY_NAME)
  implements IVerifyCallback<VerifyCallback>
{
  constructor(
    private readonly usersService: UsersService,
    configService: ConfigService,
  ) {
    super(<StrategyOptions>{
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        JwtFromCookie('access_token'),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: JwtPayload, _done: VerifiedCallback): Promise<User> {
    const user = await this.usersService.findByUserId(payload.userId);

    return user;
  }
}
