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

export const STRATEGY_NAME = 'jwt';

export interface IJwtUser {
  // TODO:
  something?: any;
}

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
  constructor(configService: ConfigService) {
    super(<StrategyOptions>{
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        JwtFromCookie('access_token'),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(
    _payload: JwtPayload,
    _done: VerifiedCallback,
  ): Promise<IJwtUser> {
    // TODO:
    return {};
  }
}
