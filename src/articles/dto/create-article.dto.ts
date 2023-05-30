import { IsOptional, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  planId: string;

  @IsString()
  @IsOptional()
  coverImageUrl?: string;
}
