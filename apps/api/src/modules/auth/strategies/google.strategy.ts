import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, Profile, VerifyCallback } from "passport-google-oauth20";

import { Env } from "@/config/env.config";
import { usersTable } from "@/modules/db/schema";
import { UsersRepository } from "@/modules/user/user.respository";
import { AccountRepository } from "@/modules/account/account.repository";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(
    private configService: ConfigService<Env, true>,
    private accountRepository: AccountRepository,
    private userRepository: UsersRepository,
  ) {
    super({
      clientID: configService.get("GOOGLE_CLIENT_ID"),
      clientSecret: configService.get("GOOGLE_CLIENT_SECRET"),
      callbackURL: configService.get("API_BASE_URL") + "/auth/google/callback",
      scope: ["email", "profile"],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const googleId = profile.id;
    const name = profile.displayName;
    const email = profile.emails[0].value;
    const avatarUrl = profile.photos[0].value;

    let user: typeof usersTable.$inferSelect;
    let account = await this.accountRepository.findOneByProvider(
      "google",
      googleId,
    );

    if (!account) {
      user = await this.userRepository.findOneByEmail(email);

      if (!user) {
        const [newUser] = await this.userRepository.create({
          email,
          name,
          avatarUrl,
        });
        user = newUser;
      }

      await this.accountRepository.create({
        userId: user.id,
        provider: "google",
        providerAccountId: googleId,
      });
    } else {
      user = await this.userRepository.findOneById(account.userId);
    }

    done(null, user);
  }
}
