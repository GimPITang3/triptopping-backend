import { IsEmail, IsString } from 'class-validator';

export class GoogleSignupDto {
  @IsString()
  code: string;

  @IsString()
  nickname: string;

  @IsEmail()
  email: string;

  @IsString()
  introduce: string;
}
