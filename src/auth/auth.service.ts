import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload } from 'src/auth/jwt-payload.interface';

import { UsersService } from 'src/users/users.service';
import { UserDocument } from 'src/users/user.schema';
import { GoogleSignupDto } from './dto/google-signup.dto';

export class UserAlreadyExistError extends Error {
  constructor() {
    super('User account does already exist.');
  }
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   *
   * @param id An identifier for the user, unique among all Google accounts and
   * never reused. A Google account can have multiple emails at different points
   * in time, but the sub value is never changed.
   */
  async loginWithGoogle(id: string) {
    const user: UserDocument = await this.usersService.findByGoogleId(id);

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

  async registerWithGoogle(id: string, dto: GoogleSignupDto) {
    const exists = await this.usersService.existsByGoogleId(id);

    if (exists) {
      throw new UserAlreadyExistError();
    }

    await this.usersService.create({
      google: {
        id: id,
        profileUrl: dto.profileUrl,
      },
      email: dto.email,
      nickname: dto.nickname,
      introduce: dto.introduce,
    });

    return await this.loginWithGoogle(id);
  }
}
