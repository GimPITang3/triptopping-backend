import { IsEmail, IsOptional, IsString, ValidateNested } from 'class-validator';

class GoogleProvider {
  @IsString()
  id: string;

  @IsString()
  @IsOptional()
  profileUrl?: string;
}

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  nickname: string;

  @IsString()
  @IsOptional()
  introduce?: string;

  @ValidateNested()
  google?: GoogleProvider;
}
