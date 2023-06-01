import { Status } from '@googlemaps/google-maps-services-js';

export class GoogleMapsServiceError extends Error {
  constructor(public status: Status, public errorMessage: string) {
    super(`${status} ${errorMessage}`);
  }
}
