import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePlanDto {
  @IsString()
  name: string;

  @IsString()
  author: string;

  @IsNumber()
  numberOfMembers: number;

  @IsNumber()
  budget: number;

  @IsString({ each: true })
  tags: string[];

  @IsNumber()
  period: number;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  startDate?: Date;
}
