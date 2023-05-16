import { Type } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { LatLngDto } from './lat-lng.dto';
import { Plan } from '../plan.schema';
import { Itinerary } from '../interfaces/itinerary.interface';

type IUpdatePlanDto = Pick<
  Partial<InstanceType<typeof Plan>>,
  'name' | 'budget' | 'tags' | 'period' | 'startDate' | 'loc' | 'itinerary'
>;

export class UpdatePlanDto implements IUpdatePlanDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  budget?: number;

  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsNumber()
  @IsOptional()
  period?: number;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  startDate?: Date;

  @ValidateNested()
  @IsOptional()
  loc?: LatLngDto;

  @IsOptional()
  itinerary?: Itinerary;
}
