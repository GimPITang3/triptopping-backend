import { IsNumber } from 'class-validator';
import { LatLng } from 'src/interfaces/LatLng.interface';

export class LatLngDto implements LatLng {
  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;
}
