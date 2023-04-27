import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePlanDto {
  @IsString()
  name: string;

  @IsString()
  author: string;

  @IsNumber()
  numberOfMembers: number;

  @IsString()
  members: string[];

  @IsNumber()
  budget: number;

  @IsString({ each: true })
  tags: string[];

  @IsNumber()
  period: number;

  @IsDate()
  @IsOptional()
  startDate?: Date;
}
