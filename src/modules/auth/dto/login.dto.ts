import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class LoginDto {
  @IsEmail()
  public email: string;

  @IsString()
  @IsStrongPassword()
  public password: string;
}
