import { PlaceData } from '@googlemaps/google-maps-services-js';

export interface RecommendPlace {
  isManaul: boolean;
  place: Partial<PlaceData>;
}
