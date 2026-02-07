import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { Env } from "@/config/env.config";
import { TokenService } from "@/modules/token/token.service";
import { TokenRepository } from "./token.repository";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<Env, true>) => ({
        secret: configService.get("JWT_SECRET", { infer: true }),
        global: true,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [TokenService, TokenRepository],
  exports: [TokenService, TokenRepository],
})
export class TokenModule {}
