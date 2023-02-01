import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../schemas/user.schema';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as User;
  },
);
