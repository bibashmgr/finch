import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";

import { IS_PUBLIC_KEY } from "@/modules/auth/decorators/public.decorator";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || info || !user) {
      let isTokenExpired = false;

      if (
        typeof info === "object" &&
        !Array.isArray(info) &&
        info !== null &&
        "name" in info
      ) {
        isTokenExpired =
          (info as { name?: string }).name === "TokenExpiredError";
      }

      const message = isTokenExpired ? "Token expired" : "Please authenticate";

      throw new UnauthorizedException(message);
    }

    return user;
  }
}
