import { IsEnum, IsOptional } from "class-validator";

import { ReportPeriodEnum } from "@/modules/report/entities/report-period.enum";

export class GetReportsDto {
  @IsEnum(Object.values(ReportPeriodEnum))
  @IsOptional()
  period: ReportPeriodEnum;
}
