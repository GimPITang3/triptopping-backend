import { IsEmail, IsString, ValidateNested } from 'class-validator';

class GoogleProvider {
  @IsString()
  id: string;
}

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  nickname: string;

  @IsString()
  introduce: string;

  @ValidateNested()
  google?: GoogleProvider;
}
