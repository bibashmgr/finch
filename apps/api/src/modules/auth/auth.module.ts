import { Module } from "@nestjs/common";

import { MailModule } from "@/modules/mail/mail.module";
import { AuthService } from "@/modules/auth/auth.service";
import { TokenModule } from "@/modules/token/token.module";
import { AuthController } from "@/modules/auth/auth.controller";

@Module({
  imports: [TokenModule, MailModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
