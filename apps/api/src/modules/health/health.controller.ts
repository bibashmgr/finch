import { HealthCheck } from "@nestjs/terminus";
import { Controller, Get } from "@nestjs/common";

import { HealthService } from "@/modules/health/health.service";
import { SkipThrottle } from "@nestjs/throttler";

@SkipThrottle()
@Controller("health")
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @HealthCheck()
  check() {
    return this.healthService.check();
  }
}
