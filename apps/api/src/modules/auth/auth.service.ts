import { Transactional } from "@nestjs-cls/transactional";
import { Injectable, NotFoundException } from "@nestjs/common";

import { usersTable } from "@/modules/db/schema";
import { OtpService } from "@/modules/otp/otp.service";
import { MailService } from "@/modules/mail/mail.service";
import { TokenService } from "@/modules/token/token.service";
import { UsersRepository } from "@/modules/user/user.respository";
import { AccountRepository } from "@/modules/account/account.repository";

@Injectable()
export class AuthService {
  constructor(
    private otpService: OtpService,
    private mailService: MailService,
    private tokenService: TokenService,
    private userRepository: UsersRepository,
    private accountRepository: AccountRepository,
  ) {}

  @Transactional()
  async loginWithEmail(email: string) {
    const code = await this.otpService.saveOtpCode(email);
    await this.mailService.sendEmailVerificationMail(email, code);
    return { message: "Verification code sent successfully" };
  }

  @Transactional()
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

  @Transactional()
  async logoutUser(refreshToken: string | undefined) {
    if (!refreshToken) {
      throw new NotFoundException("Refresh token is not provided");
    }

    return await this.tokenService.revokeRefreshTokens(refreshToken);
  }
}
