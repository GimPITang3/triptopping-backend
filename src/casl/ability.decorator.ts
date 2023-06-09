import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { AppAbility } from './casl-ability.factory';

export const Ability = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const ability: AppAbility = request.ability;

    return ability;
  },
);
