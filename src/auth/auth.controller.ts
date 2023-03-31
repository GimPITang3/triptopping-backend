import { Request } from 'express';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
// Req is just an alias for Request in @nestjs/common due to the existance of Request of express.

import { GoogleOAuth20Guard } from './guards/google-oauth-20.guard';
import { IOAuthUser } from './stratagies/google-oauth-20.strategy';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleOAuth20Guard)
  async loginGoogle() {
    // Guard redirects
    // Let guard do it's job
  }

  @Get('google/callback')
  @UseGuards(GoogleOAuth20Guard)
  async loginGoogleCallback(@Req() request: Request & IOAuthUser) {
    const { accessToken } = await this.authService.loginWithGoogle(request);

    return {
      accessToken,
    };
  }
}
