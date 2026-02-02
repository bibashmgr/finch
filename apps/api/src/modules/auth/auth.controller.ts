import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";

import { AuthService } from "@/modules/auth/auth.service";
import { VerifyEmailDto } from "@/modules/auth/dtos/verify-email.dto";
import { LoginWithEmailDto } from "@/modules/auth/dtos/login-with-email.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("email")
  @HttpCode(HttpStatus.OK)
  loginUser(@Body() dto: LoginWithEmailDto) {
    return this.authService.loginWithEmail(dto.email);
  }

  @Post("email/verify")
  @HttpCode(HttpStatus.OK)
  verifyEmail(@Body() dto: VerifyEmailDto) {
    return this.authService.verifyEmail(dto.email, dto.code);
  }
}
