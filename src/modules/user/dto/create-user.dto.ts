import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  public name: string;

  @ApiProperty()
  @IsEmail()
  public email: string;

  @ApiProperty()
  @IsString()
  @IsStrongPassword()
  public password: string;
}
