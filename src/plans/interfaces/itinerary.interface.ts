import { PlaceData, RouteLeg } from '@googlemaps/google-maps-services-js';

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

  details?: RouteLeg;
}

export type ScheduleType = Place | Transport;

export type ScheduleTypes = ScheduleType['type'];

export type ScheduleSlot<T = ScheduleType> = T extends ScheduleType
  ? {
      type: T['type'];
      system?: Partial<Omit<T, 'type'>>;
      manual?: Partial<Omit<T, 'type'>>;
    }
  : never;

export type ItineraryDaily = ScheduleSlot[];

export type Itinerary = ItineraryDaily[];
