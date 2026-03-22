import { Module } from "@nestjs/common";

import { ReportService } from "@/modules/report/report.service";
import { ReportController } from "@/modules/report/report.controller";
import { ReportRepository } from "@/modules/report/report.repository";

@Module({
  imports: [],
  controllers: [ReportController],
  providers: [ReportService, ReportRepository],
})
export class ReportModule {}
