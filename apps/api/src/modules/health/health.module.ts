import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";

import { HealthService } from "@/modules/health/health.service";
import { HealthController } from "@/modules/health/health.controller";

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
