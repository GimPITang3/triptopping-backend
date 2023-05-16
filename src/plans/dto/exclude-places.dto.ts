import { IsString } from 'class-validator';

export class ExcludePlacesDto {
  @IsString({ each: true })
  placeIds: string[];
}
