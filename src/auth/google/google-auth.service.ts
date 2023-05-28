import { Injectable } from '@nestjs/common';
import { Credentials, OAuth2Client } from 'google-auth-library';
import { people_v1 } from '@googleapis/people';

@Injectable()
export class GoogleAuthService {
  constructor(private readonly oAuthClient: OAuth2Client) {}

  async getToken(code: string): Promise<Credentials> {
    const resp = await this.oAuthClient.getToken({
      code,
      redirect_uri: 'postmessage',
    });

    this.oAuthClient.setCredentials(resp.tokens);

    return resp.tokens;
  }

  /** Retreive token info from google using authorization code. */
  async getTokenInfo(accessToken: string) {
    const tokenInfo = await this.oAuthClient.getTokenInfo(accessToken);

    return tokenInfo;
  }

  async getProfile() {
    const res = await this.oAuthClient.request<people_v1.Schema$Person>({
      url: 'https://people.googleapis.com/v1/people/me?personFields=photos,emailAddresses',
    });

    const { data } = res;

    return {
      profileUrl: data.photos.at(0).url,
      email: data.emailAddresses.at(0).value,
    };
  }
}
