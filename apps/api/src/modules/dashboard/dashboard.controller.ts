import { Controller, Get, HttpCode, HttpStatus, Query } from "@nestjs/common";

import { usersTable } from "@/modules/db/schema";
import { DashboardService } from "@/modules/dashboard/dashboard.service";
import { CurrentUser } from "@/modules/auth/decorators/current-user.decorator";
import { GetDashboardSummaryDto } from "@/modules/dashboard/dtos/get-dashboard-summary.dto";

@Controller("dashboard")
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get("/summary")
  @HttpCode(HttpStatus.OK)
  getSummary(
    @Query() { startDate, endDate }: GetDashboardSummaryDto,
    @CurrentUser() currentUser: typeof usersTable.$inferSelect,
  ) {
    return this.dashboardService.getSummary({
      userId: currentUser.id,
      startDate,
      endDate,
    });
  }
}
