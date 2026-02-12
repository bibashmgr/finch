import { createParamDecorator, ExecutionContext } from "@nestjs/common";

import { usersTable } from "@/modules/db/schema";

export const CurrentUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
