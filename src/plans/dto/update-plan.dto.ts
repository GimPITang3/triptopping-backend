import { Type } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { LatLngDto } from './lat-lng.dto';

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

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  startDate?: Date;

  @ValidateNested()
  loc?: LatLngDto;
}
