import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { JwtPayload } from 'src/auth/jwt-payload.interface';
import { IOAuthUser } from './stratagies/google-oauth-20.strategy';

import { UserNotFoundError, UsersService } from 'src/users/users.service';
import { UserDocument } from 'src/users/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async loginWithGoogle(request: Request & { user: IOAuthUser }) {
    const user: UserDocument = await this.usersService
      .findByGoogleId(request.user.providerId)
      .catch(async (e) => {
        if (e instanceof UserNotFoundError) {
          return await this.usersService.create({
            google: { id: request.user.providerId },
          });
        } else {
          throw e;
        }
      });

    const accessToken = this.jwtService.sign(
      <JwtPayload>{
        userId: user.userId,
      },
      {
        secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get<string>(
          'JWT_ACCESS_TOKEN_EXPIRE_TIME',
        ),
      },
    );

    return { accessToken, user };
  }
}
