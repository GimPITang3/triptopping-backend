import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { User } from 'src/users/user.schema';

export const GetUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    return user;
  },
);
