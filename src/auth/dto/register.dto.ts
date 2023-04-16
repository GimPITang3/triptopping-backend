import { IsEmail, IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  nickname?: string;
}
