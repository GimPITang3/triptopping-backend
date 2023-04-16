import { IsEmail, IsOptional, IsString, ValidateNested } from 'class-validator';

class GoogleProvider {
  @IsString()
  id: string;
}

export class CreateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  nickname?: string;

  @ValidateNested()
  google?: GoogleProvider;
}
