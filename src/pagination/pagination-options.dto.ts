import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class PaginationOptionsDto {
  @Type(() => Number)
  skip: number;

  @Type(() => Number)
  limit: number;
}
