import ms from "ms";
import * as bcrypt from "bcrypt";
import { customAlphabet } from "nanoid";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";

import { Env } from "@/config/env.config";
import { OtpRepository } from "@/modules/otp/otp.repository";

@Injectable()
export class OtpService {
  constructor(
    private readonly configService: ConfigService<Env, true>,
    private readonly otpRepository: OtpRepository,
  ) {}

  async saveOtpCode(email: string) {
    const nanoid = customAlphabet("1234567890", 6);
    const code = nanoid();
    const codeHash = await bcrypt.hash(code, 10);

    const expiresAt = new Date(
      Date.now() + ms(this.configService.get("OTP_EXPIRES_IN")),
    );

    await this.otpRepository.create({
      codeHash,
      email,
      expiresAt,
    });

    return code;
  }

  async verifyOtpCode(email: string, code: string) {
    const records = await this.otpRepository.findAllByEmail(email);

    let record: (typeof records)[number] | undefined;

    for (const r of records) {
      const isMatch = await bcrypt.compare(code, r.codeHash);
      if (isMatch) {
        record = r;
        break;
      }
    }

    if (!record) throw new UnauthorizedException("Invalid verification code");

    await this.otpRepository.update(record.id, {
      consumedAt: new Date(),
    });
  }
}
