import ms from "ms";
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";

import { Env } from "@/config/env.config";
import { TokenEnum } from "@/modules/token/entities/token.enum";
import { TokenRepository } from "@/modules/token/token.repository";

@Injectable()
export class TokenService {
  constructor(
    private readonly configService: ConfigService<Env, true>,
    private readonly jwtService: JwtService,
    private readonly tokenRepository: TokenRepository,
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

  async issueAuthTokens(userId: string) {
    const accessToken = await this.generateToken(
      userId,
      this.configService.get("JWT_ACCESS_EXPIRES_IN"),
      TokenEnum.ACCESS,
    );

    const refreshTokenExpiresIn = this.configService.get(
      "JWT_REFRESH_EXPIRES_IN",
    );
    const refreshTokenExpiration = new Date(
      Date.now() + ms(refreshTokenExpiresIn),
    );

    const refreshToken = await this.generateToken(
      userId,
      this.configService.get("JWT_REFRESH_EXPIRES_IN"),
      TokenEnum.REFRESH,
    );

    await this.tokenRepository.saveRefreshToken({
      userId,
      token: refreshToken,
      expiresAt: refreshTokenExpiration,
    });

    return { accessToken, refreshToken };
  }

  async revokeRefreshTokens(token: string) {
    const existingRefreshToken =
      await this.tokenRepository.findRefreshToken(token);

    if (!existingRefreshToken) {
      throw new NotFoundException("Refresh token not found");
    }

    if (existingRefreshToken.revokedAt) {
      throw new UnauthorizedException("Refresh token already revoked");
    }

    if (existingRefreshToken.expiresAt < new Date()) {
      throw new UnauthorizedException("Refresh token already expired");
    }

    await this.tokenRepository.updateRefreshToken(existingRefreshToken.id, {
      revokedAt: new Date(),
    });
  }

  async rotateRefreshTokens(token: string | undefined) {
    const existingRefreshToken =
      await this.tokenRepository.findRefreshToken(token);

    if (!existingRefreshToken) {
      throw new NotFoundException("Refresh token not found");
    }

    if (existingRefreshToken.revokedAt) {
      throw new UnauthorizedException("Refresh token already revoked");
    }

    if (existingRefreshToken.expiresAt < new Date()) {
      throw new UnauthorizedException("Refresh token already expired");
    }

    await this.tokenRepository.updateRefreshToken(existingRefreshToken.id, {
      revokedAt: new Date(),
    });

    return await this.issueAuthTokens(existingRefreshToken.userId);
  }
}
