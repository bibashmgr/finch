import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { PassportModule } from "@nestjs/passport";

import { OtpModule } from "@/modules/otp/otp.module";
import { UserModule } from "@/modules/user/user.module";
import { MailModule } from "@/modules/mail/mail.module";
import { AuthService } from "@/modules/auth/auth.service";
import { TokenModule } from "@/modules/token/token.module";
import { AuthController } from "@/modules/auth/auth.controller";
import { AccountModule } from "@/modules/account/account.module";
import { JwtAuthGuard } from "@/modules/auth/guards/jwt-auth.guard";
import { JwtStrategy } from "@/modules/auth/strategies/jwt.strategy";
import { GoogleStrategy } from "@/modules/auth/strategies/google.strategy";

@Module({
  imports: [
    MailModule,
    TokenModule,
    OtpModule,
    UserModule,
    AccountModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
