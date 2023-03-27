import { Controller, Get, Request, UseGuards } from '@nestjs/common';

import { GoogleOAuth20Guard } from './guards/google-oauth-20.guard';
import { AuthService } from './auth.service';
import { RequestWithUser } from './request-with-user';

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
  async loginGoogleCallback(@Request() request: RequestWithUser) {
    await this.authService.loginWithGoogle(request);
  }
}
