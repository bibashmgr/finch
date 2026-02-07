import ms, { StringValue } from "ms";
import { CookieOptions } from "express";

export function createCookieOptions(): CookieOptions {
  const isProd = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    domain: process.env.COOKIE_DOMAIN,
    path: "/",
    maxAge: ms(process.env.JWT_REFRESH_EXPIRES_IN as StringValue),
  };
}
