import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class UpdateProfileDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
