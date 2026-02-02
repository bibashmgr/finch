import { IsNotEmpty, IsString, IsEmail, Length } from "class-validator";

export class VerifyEmailDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  code: string;
}
