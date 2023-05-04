import { Inject, Injectable } from '@nestjs/common';

import {
  AddressType,
  Client,
  PlaceData,
  Status,
} from '@googlemaps/google-maps-services-js';
import { Plan } from 'src/plans/plan.schema';
import { GOOGLE_MAPS_ACCESS_KEY_TOKEN } from 'src/google-maps/google-maps.constants';

import {
  ItineraryDaily,
  Place,
} from 'src/plans/interfaces/itinerary.interface';

import haversineDistance from 'haversine-distance';

interface LatLng {
  lat: number;
  lng: number;
}

/** */
interface Needs {
  hunger: number;
  stamina: number;
}

@Injectable()
export class ScheduleRecommendService {
  constructor(
    private readonly client: Client,
    @Inject(GOOGLE_MAPS_ACCESS_KEY_TOKEN)
    private readonly key: string,
  ) {}

  async isEmptyObject(param: any) {
    return Object.keys(param).length === 0 && param.constructor === Object;
  }

  async retreiveCandidates(
    start: Place,
    end: Place,
  ): Promise<Partial<PlaceData>[]> {
    const startLatLng: LatLng = start.details?.geometry?.location;
    const endLatLng: LatLng = end.details?.geometry?.location;

    const midLatLng: LatLng = {
      lat: (startLatLng.lat + endLatLng.lat) / 2,
      lng: (endLatLng.lng + endLatLng.lng) / 2,
    };
    const diameter = haversineDistance(startLatLng, endLatLng);
    const radius = diameter / 2;

    const candidates: Partial<PlaceData>[] = [];

    let pagetoken: string | undefined = undefined;
    while (true) {
      const resp = await this.client.placesNearby({
        params: {
          key: this.key,
          location: midLatLng,
          pagetoken: pagetoken,
          minprice: undefined,
          maxprice: undefined,
          type: undefined,
          radius: radius,
        },
      });

      const { next_page_token, results, status, error_message } = resp.data;

      if (status !== Status.OK) {
        // TODO:
        throw new Error(`${status} ${error_message}`);
      }

      candidates.concat(results);

      if (!next_page_token) {
        break;
      }

      pagetoken = next_page_token;
    }

    return candidates;
  }

  async schedule(
    from: Place,
    to: Place,
    candidates: Partial<PlaceData>[],
    needs: Needs,
  ): Promise<Place[]> {
    const result: Place[] = [from, to];

    //

    return result;
  }

  async scheduleDay(
    plan: Plan,
    itineraryDaily: ItineraryDaily,
  ): Promise<ItineraryDaily> {
    // Remove all system-generated schedules
    const newItineraryDaily: ItineraryDaily = itineraryDaily.filter(
      (schedule) => schedule.manual && !this.isEmptyObject(schedule.manual),
    );

    // TODO:
    const start: Place = {
      type: 'place',
      details: {},
    };
    const end: Place = {
      type: 'place',
      details: {},
    };

    const candidates = await this.retreiveCandidates(start, end);

    const result = await this.schedule(start, end, candidates, {
      hunger: 0,
      stamina: 0,
    });

    //
    for (const schedule of itineraryDaily) {
      schedule.manual.duration;
      schedule.manual.time;
      if (
        schedule.type === 'place' &&
        schedule.manual?.details?.types.includes(AddressType.restaurant)
      ) {
        //
      }
    }

    return newItineraryDaily;
  }

  async recommend(plan: Plan): Promise<Plan> {
    // Make itinerary array to have exact length
    plan.itinerary = plan.itinerary.slice(0, plan.period);
    plan.itinerary = plan.itinerary.concat(
      Array.apply([], new Array(plan.period - plan.itinerary.length)),
    );

    for (const itineraryDaily of plan.itinerary) {
      this.scheduleDay(plan, itineraryDaily);
    }

    return plan;
  }
}
