import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Profile, Strategy, StrategyOptions } from 'passport-google-oauth20';
import { VerifyCallback, VerifyFunction } from 'passport-oauth2';

import { IVerifyCallback } from '../verify-callback.interface';

export const STRATEGY_NAME = 'google';

export interface IOAuthUser {
  provider: string;
  providerId: string;
  name: string;
  username: string;
}

@Injectable()
export class GoogleOAuth20Strategy
  extends PassportStrategy(Strategy, STRATEGY_NAME)
  implements IVerifyCallback<VerifyFunction>
{
  constructor(configService: ConfigService) {
    super(<StrategyOptions>{
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    _verified: VerifyCallback,
  ): Promise<IOAuthUser> {
    const { id, name, emails } = profile;

    return {
      provider: 'google',
      providerId: id,
      name: name.givenName,
      username: emails[0].value,
    };
  }
}
