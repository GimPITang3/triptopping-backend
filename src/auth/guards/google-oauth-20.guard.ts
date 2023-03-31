import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { STRATEGY_NAME } from '../stratagies/google-oauth-20.strategy';

@Injectable()
export class GoogleOAuth20Guard extends AuthGuard(STRATEGY_NAME) {}
