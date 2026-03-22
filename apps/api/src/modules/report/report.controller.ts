import { Controller, Get, Query } from "@nestjs/common";

import { usersTable } from "@/modules/db/schema";
import { ReportService } from "@/modules/report/report.service";
import { GetReportsDto } from "@/modules/report/dtos/get-reports.dto";
import { CurrentUser } from "@/modules/auth/decorators/current-user.decorator";

@Controller("reports")
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  getReports(
    @Query() query: GetReportsDto,
    @CurrentUser() currentUser: typeof usersTable.$inferSelect,
  ) {
    return this.reportService.getReports(currentUser.id, query.period);
  }
}
