import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class GoogleAuthService {
  constructor(private readonly oAuthClient: OAuth2Client) {}

  /** Retreive token info from google using authorization code. */
  async getTokenInfo(code: string) {
    const resp = await this.oAuthClient.getToken({
      code,
      redirect_uri: 'postmessage',
    });

    const tokenInfo = await this.oAuthClient.getTokenInfo(
      resp.tokens.access_token,
    );

    return tokenInfo;
  }
}
