import { PlaceData } from '@googlemaps/google-maps-services-js';

export interface Place {
  type: 'place';

  /** milli seconds */
  time?: number;
  /** milli seconds */
  duration?: number;
  cost?: number;

  details?: Partial<PlaceData>;
}

export interface Transport {
  type: 'transport';

  /** milli seconds */
  time?: number;
  /** milli seconds */
  duration?: number;
  cost?: number;
}

export type ScheduleType = Place | Transport;

export type Schedule<T> = T extends { type: string }
  ? {
      type: T['type'];
      system?: Partial<Omit<T, 'type'>>;
      manual?: Partial<Omit<T, 'type'>>;
    }
  : never;

export type ScheduleSlot = Schedule<ScheduleType>;

export type ItineraryDaily = ScheduleSlot[];

export type Itinerary = ItineraryDaily[];