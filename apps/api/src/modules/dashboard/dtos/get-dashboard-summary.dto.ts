import { IsDateString, IsOptional } from "class-validator";

export class GetDashboardSummaryDto {
  @IsDateString()
  @IsOptional()
  startDate: string;

  @IsDateString()
  @IsOptional()
  endDate: string;
}
