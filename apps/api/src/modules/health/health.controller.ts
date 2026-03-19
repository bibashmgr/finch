import { HealthCheck } from "@nestjs/terminus";
import { Controller, Get } from "@nestjs/common";
import { SkipThrottle } from "@nestjs/throttler";

import { HealthService } from "@/modules/health/health.service";
import { Public } from "@/modules/auth/decorators/public.decorator";

@SkipThrottle()
@Controller("health")
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Public()
  @Get()
  @HealthCheck()
  check() {
    return this.healthService.check();
  }
}
