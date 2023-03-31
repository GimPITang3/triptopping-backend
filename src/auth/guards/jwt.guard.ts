import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { STRATEGY_NAME } from '../stratagies/jwt.strategy';

@Injectable()
export class JwtGuard extends AuthGuard(STRATEGY_NAME) {}
