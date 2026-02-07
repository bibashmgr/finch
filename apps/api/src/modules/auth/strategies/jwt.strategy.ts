import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";

import { Env } from "@/config/env.config";
import { UsersRepository } from "@/modules/user/user.respository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    private readonly configService: ConfigService<Env, true>,
    private readonly userRepository: UsersRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          if (!req?.cookies) return null;
          return req.cookies["access_token"];
        },
      ]),
      secretOrKey: configService.get("JWT_SECRET"),
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    const user = await this.userRepository.findById(payload.sub);
    return user;
  }
}
