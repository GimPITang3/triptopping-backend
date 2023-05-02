import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePlanDto {
  @IsString()
  planId: string;

  @IsString()
  name: string;

  @IsNumber()
  numberOfMembers: number;

  @IsString({ each: true })
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