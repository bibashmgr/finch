import { HealthCheck } from "@nestjs/terminus";
import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";

import { HealthService } from "@/modules/health/health.service";
import { Public } from "@/modules/auth/decorators/public.decorator";

@Controller("health")
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  @HealthCheck()
  check() {
    return this.healthService.check();
  }
}
