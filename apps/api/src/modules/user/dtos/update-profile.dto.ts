import { IsNotEmpty, IsString, IsUrl, IsOptional } from "class-validator";

export class UpdateProfileDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  @IsOptional()
  avatarUrl: string;
}
