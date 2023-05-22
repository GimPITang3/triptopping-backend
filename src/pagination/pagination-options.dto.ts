import { IsNumber } from 'class-validator';

export class PaginationOptionsDto {
  @IsNumber()
  skip: number;

  @IsNumber()
  limit: number;
}
