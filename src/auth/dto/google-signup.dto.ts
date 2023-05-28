import { IsString } from 'class-validator';

export class GoogleSignupDto {
  @IsString()
  code: string;

  @IsString()
  nickname: string;
}
