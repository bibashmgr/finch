import { IsNumber, IsOptional } from "class-validator";

export class GetNotificationsDto {
  @IsNumber()
  @IsOptional()
  limit?: number;

  @IsNumber()
  @IsOptional()
  page?: number;
}
