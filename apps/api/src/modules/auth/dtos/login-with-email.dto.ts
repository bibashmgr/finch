import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class LoginWithEmailDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
