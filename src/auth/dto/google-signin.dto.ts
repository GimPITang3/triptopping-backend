import { IsString } from 'class-validator';

export class GoogleSigninDto {
  @IsString()
  code: string;
}
