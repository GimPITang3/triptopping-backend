import { Request } from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
// Req is just an alias for Request in @nestjs/common due to the existance of Request of express.

import { GoogleOAuth20Guard } from './guards/google-oauth-20.guard';
import { IOAuthUser } from './stratagies/google-oauth-20.strategy';
import { AuthService, UserAlreadyExistError } from './auth.service';
import { GoogleAuthService } from './google/google-auth.service';
import { GoogleSigninDto } from './dto/google-signin.dto';
import { GoogleSignupDto } from './dto/google-signup.dto';
import { UserNotFoundError } from 'src/errors/user-not-found.error';
import { JwtGuard } from './guards/jwt.guard';
import { User } from 'src/users/user.schema';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly googleAuthService: GoogleAuthService,
  ) {}

  @Get('google')
  @UseGuards(GoogleOAuth20Guard)
  async loginGoogle() {
    // Guard redirects
    // Let guard do it's job
  }

  @Get('google/callback')
  @UseGuards(GoogleOAuth20Guard)
  async loginGoogleCallback(@Req() request: Request & { user: IOAuthUser }) {
    const { accessToken, user } = await this.authService.loginWithGoogle(
      request.user.providerId,
    );

    return {
      accessToken,
      user: user.toObject(),
    };
  }

  @Post('google/signin')
  async googleSignin(@Body() dto: GoogleSigninDto) {
    const token = await this.googleAuthService.getToken(dto.code);
    const tokenInfo = await this.googleAuthService.getTokenInfo(
      token.access_token,
    );

    try {
      const { accessToken, user } = await this.authService.loginWithGoogle(
        tokenInfo.sub,
      );

      return {
        accessToken,
        user: user.toObject(),
      };
    } catch (e) {
      if (e instanceof UserNotFoundError) {
        throw new HttpException(
          'User account does not exist.',
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw e;
      }
    }
  }

  @Post('google/signup')
  async googleSignup(@Body() dto: GoogleSignupDto) {
    const token = await this.googleAuthService.getToken(dto.code);
    const tokenInfo = await this.googleAuthService.getTokenInfo(
      token.access_token,
    );

    const { email, profileUrl } = await this.googleAuthService.getProfile();

    try {
      const { accessToken, user } = await this.authService.registerWithGoogle(
        tokenInfo.sub,
        { ...dto, profileUrl, email },
      );

      return {
        accessToken,
        user: user.toObject(),
      };
    } catch (e) {
      if (e instanceof UserAlreadyExistError) {
        throw new HttpException(
          'User account does already exist.',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw e;
      }
    }
  }

  @Delete('account')
  @UseGuards(JwtGuard)
  async withDrawal(@Req() request: Request & { user: User }) {
    this.authService.withdrawUser(request.user.userId);
  }
}
