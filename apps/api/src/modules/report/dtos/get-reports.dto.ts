import { IsEnum, IsTimeZone } from "class-validator";

import { ReportPeriodEnum } from "@/modules/report/entities/report-period.enum";

export class GetReportsDto {
  @IsEnum(Object.values(ReportPeriodEnum))
  period: ReportPeriodEnum;

  @IsTimeZone()
  timezone: string;
}
