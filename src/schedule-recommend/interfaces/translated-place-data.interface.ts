import { PlaceData } from '@googlemaps/google-maps-services-js';

export interface TranslatePlaceData extends PlaceData {
  translated_name: string;
}
