import ms from "ms";
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { eq } from "drizzle-orm";
import { ConfigService } from "@nestjs/config";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { TransactionHost } from "@nestjs-cls/transactional";

import { Env } from "@/config/env.config";
import { refreshTokensTable } from "@/modules/db/schema";
import { DbTransactionAdapter } from "@/modules/db/client";
import { TokenEnum } from "@/modules/token/entities/token.enum";

@Injectable()
export class TokenService {
  constructor(
    private configService: ConfigService<Env, true>,
    private jwtService: JwtService,
    private txHost: TransactionHost<DbTransactionAdapter>,
  ) {}

  async generateToken(
    userId: string,
    expiresIn: JwtSignOptions["expiresIn"],
    type: TokenEnum,
  ) {
    const payload = { sub: userId, type };

    return await this.jwtService.signAsync(payload, {
      expiresIn,
    });
  }

  async saveRefreshToken(token: string, userId: string) {
    const expiresIn = this.configService.get("JWT_REFRESH_EXPIRES_IN");

    const expiresAt = new Date(Date.now() + ms(expiresIn));
    return await this.txHost.tx.insert(refreshTokensTable).values({
      userId,
      token,
      expiresAt,
    });
  }

  async issueAuthTokens(userId: string) {
    const accessToken = await this.generateToken(
      userId,
      this.configService.get("JWT_ACCESS_EXPIRES_IN"),
      TokenEnum.ACCESS,
    );

    const refreshToken = await this.generateToken(
      userId,
      this.configService.get("JWT_REFRESH_EXPIRES_IN"),
      TokenEnum.REFRESH,
    );

    await this.saveRefreshToken(refreshToken, userId);

    return { accessToken, refreshToken };
  }

  async rotateRefreshTokens(token: string) {
    const existingRefreshToken =
      await this.txHost.tx.query.refreshTokensTable.findFirst({
        where: eq(refreshTokensTable.token, token),
      });

    if (!existingRefreshToken) {
      throw new NotFoundException("Refresh token not found");
    }

    if (existingRefreshToken.revokedAt) {
      throw new UnauthorizedException("Refresh token already revoked");
    }

    if (existingRefreshToken.expiresAt < new Date()) {
      throw new UnauthorizedException("Refresh token already expired");
    }

    await this.txHost.tx
      .update(refreshTokensTable)
      .set({ revokedAt: new Date(), updatedAt: new Date() })
      .where(eq(refreshTokensTable.id, existingRefreshToken.id));

    return await this.issueAuthTokens(existingRefreshToken.userId);
  }
}
