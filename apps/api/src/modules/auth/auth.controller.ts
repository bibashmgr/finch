import { Request, Response } from "express";
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { Env } from "@/config/env.config";
import { usersTable } from "@/modules/db/schema";
import { AuthService } from "@/modules/auth/auth.service";
import { createCookieOptions } from "@/config/cookie.config";
import { TokenService } from "@/modules/token/token.service";
import { Public } from "@/modules/auth/decorators/public.decorator";
import { VerifyEmailDto } from "@/modules/auth/dtos/verify-email.dto";
import { GoogleAuthGuard } from "@/modules/auth/guards/google-auth.guard";
import { LoginWithEmailDto } from "@/modules/auth/dtos/login-with-email.dto";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly configService: ConfigService<Env, true>,
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @Public()
  @Post("email")
  @HttpCode(HttpStatus.OK)
  loginUser(@Body() dto: LoginWithEmailDto) {
    return this.authService.loginWithEmail(dto.email);
  }

  @Public()
  @Post("email/verify")
  @HttpCode(HttpStatus.OK)
  async verifyEmail(
    @Body() dto: VerifyEmailDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.verifyEmail(dto.email, dto.code);

    const cookieOptions = createCookieOptions();
    res.cookie("access_token", tokens.accessToken, cookieOptions);
    res.cookie("refresh_token", tokens.refreshToken, cookieOptions);
    res.send({
      message: "Login successful",
    });
  }

  @Public()
  @Get("google")
  @UseGuards(GoogleAuthGuard)
  async loginWithGoogle() {}

  @Public()
  @Get("google/callback")
  @UseGuards(GoogleAuthGuard)
  async handleGoogleCallback(@Req() req: Request, @Res() res: Response) {
    const user = req.user as typeof usersTable.$inferSelect;

    if (!user) {
      throw new InternalServerErrorException("Failed to login with google");
    }

    const tokens = await this.tokenService.issueAuthTokens(user.id);

    const cookieOptions = createCookieOptions();
    res.cookie("access_token", tokens.accessToken, cookieOptions);
    res.cookie("refresh_token", tokens.refreshToken, cookieOptions);
    res.redirect(this.configService.get("CLIENT_BASE_URL") + "/dashboard");
  }

  @Post("logout")
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies["refresh_token"] as string | undefined;
    await this.authService.logoutUser(refreshToken);

    const cookieOptions = createCookieOptions();
    res.clearCookie("refresh_token", cookieOptions);
    res.clearCookie("access_token", cookieOptions);
    res.send({
      message: "Logout successful",
    });
  }
}
