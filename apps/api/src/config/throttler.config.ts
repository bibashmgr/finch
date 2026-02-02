import { ConfigService } from "@nestjs/config";
import { Env } from "./env.config";
import { ThrottlerModuleOptions } from "@nestjs/throttler";

export function createThrollerConfig(
  config: ConfigService<Env, true>,
): ThrottlerModuleOptions {
  return [
    {
      ttl: 60000,
      limit: 100,
    },
  ];
}
