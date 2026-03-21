import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";

import { usersTable } from "@/modules/db/schema";
import { OtpService } from "@/modules/otp/otp.service";
import { MailService } from "@/modules/mail/mail.service";
import { TokenService } from "@/modules/token/token.service";
import { UsersRepository } from "@/modules/user/user.respository";
import { AccountRepository } from "@/modules/account/account.repository";

@Injectable()
export class AuthService {
  constructor(
    private readonly otpService: OtpService,
    private readonly mailService: MailService,
    private readonly tokenService: TokenService,
    private readonly userRepository: UsersRepository,
    private readonly accountRepository: AccountRepository,
  ) {}

  async loginWithEmail(email: string) {
    const code = await this.otpService.saveOtpCode(email);
    await this.mailService.sendEmailVerificationMail(email, code);
    return { message: "Verification code sent successfully" };
  }

  async verifyEmail(email: string, code: string) {
    await this.otpService.verifyOtpCode(email, code);

    let user: typeof usersTable.$inferSelect;
    let account = await this.accountRepository.findByProvider("email", email);

    if (!account) {
      user = await this.userRepository.findByEmail(email);

      if (!user) {
        user = await this.userRepository.create({
          email,
          name: email.split("@")[0],
        });
      }

      await this.accountRepository.create({
        userId: user.id,
        provider: "email",
        providerAccountId: email,
      });
    } else {
      user = await this.userRepository.findById(account.userId);
    }

    return await this.tokenService.issueAuthTokens(user.id);
  }

  async handleGoogleCallback(user: typeof usersTable.$inferSelect | null) {
    if (!user) {
      throw new InternalServerErrorException("Failed to login with google");
    }

    return await this.tokenService.issueAuthTokens(user.id);
  }

  async refreshToken(token: string | undefined) {
    if (!token) {
      throw new NotFoundException("Refresh token is not provided");
    }

    return await this.tokenService.rotateRefreshTokens(token);
  }

  async logoutUser(token: string | undefined) {
    if (!token) {
      throw new NotFoundException("Refresh token is not provided");
    }

    return await this.tokenService.revokeRefreshTokens(token);
  }
}
