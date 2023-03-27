import { Injectable } from '@nestjs/common';
import { RequestWithUser } from './request-with-user';

@Injectable()
export class AuthService {
  async loginWithGoogle(request: RequestWithUser) {
    if (!request.user) {
      throw new Error('no user');
    }

    // TODO:
  }
}
