import { Module, Scope } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';

@Module({
  imports: [ConfigModule],
  providers: [
    GoogleAuthService,
    {
      provide: OAuth2Client,
      useFactory: async (
        configService: ConfigService,
      ): Promise<OAuth2Client> => {
        const client = new OAuth2Client({
          clientId: configService.get<string>('GOOGLE_CLIENT_ID'),
          clientSecret: configService.get<string>('GOOGLE_SECRET'),
          redirectUri: 'postmessage',
        });

        return client;
      },
      inject: [ConfigService],
      scope: Scope.REQUEST,
    },
  ],
  exports: [GoogleAuthService],
})
export class GoogleAuthModule {}
