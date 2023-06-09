import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

import { User } from 'src/users/user.schema';
import { AppAbility, CaslAbilityFactory } from './casl-ability.factory';

@Injectable()
export class CaslGuard implements CanActivate {
  constructor(private readonly caslAbilityFactory: CaslAbilityFactory) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request & { user: User; ability: AppAbility } = context
      .switchToHttp()
      .getRequest();

    const user = request.user;

    const ability = this.caslAbilityFactory.createForUser(user);

    request.ability = ability;

    return true;
  }
}
