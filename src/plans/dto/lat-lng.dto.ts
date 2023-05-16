import { IsNumber } from 'class-validator';
import { LatLng } from 'src/interfaces/lat-lng.interface';

export class LatLngDto implements LatLng {
  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;
}
