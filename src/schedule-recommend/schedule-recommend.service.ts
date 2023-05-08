import { Inject, Injectable } from '@nestjs/common';

import {
  AddressType,
  Client,
  Language,
  PlaceData,
  Status,
} from '@googlemaps/google-maps-services-js';
import { Plan } from 'src/plans/plan.schema';
import { GOOGLE_MAPS_ACCESS_KEY_TOKEN } from 'src/google-maps/google-maps.constants';

import {
  ItineraryDaily,
  Place,
} from 'src/plans/interfaces/itinerary.interface';
import { Needs } from './interfaces/needs.interface';

import * as haversineDistance from 'haversine-distance';
import { Duration } from 'luxon';

interface LatLng {
  lat: number;
  lng: number;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
    const diameter = Math.min(
      Math.max(haversineDistance(startLatLng, endLatLng), 2000),
      10000,
    );
    const radius = diameter / 2;

    let candidates: Partial<PlaceData>[] = [];

    let pagetoken: string | undefined = undefined;
    const minprice: number | undefined = undefined;
    const maxprice: number | undefined = undefined;
    const placeType: AddressType | undefined = undefined;
    while (true) {
      const resp = await this.client.placesNearby({
        params: {
          key: this.key,
          location: midLatLng,
          language: Language.ko,
          ...(pagetoken ? { pagetoken } : {}),
          ...(minprice ? { minprice } : {}),
          ...(maxprice ? { maxprice } : {}),
          ...(placeType ? { type: placeType } : {}),
          radius: radius,
        },
        raxConfig: {
          retryDelay: 2000,
          shouldRetry: (_err) => {
            return true;
          },
          backoffType: 'static',
        },
      });

      const { next_page_token, results, status, error_message } = resp.data;

      if (status !== Status.OK) {
        throw new Error(`${status} ${error_message}`);
      }

      candidates = candidates.concat(results);

      if (!next_page_token) {
        break;
      }
      pagetoken = next_page_token;

      await sleep(2000);
    }

    return candidates;
  }

  async scheduleBetween(
    from: Place,
    to: Place,
    candidates: Partial<PlaceData>[],
    needs: Needs,
  ): Promise<Place[]> {
    if (candidates.length == 0) {
      return [];
    }
    if (to.time - from.time < Duration.fromObject({ hours: 1.5 }).toMillis()) {
      return [];
    }

    const minFoodRatioPerHour = 3 / (18 - 8);
    if (needs.food && needs.food < minFoodRatioPerHour) {
      const restaurantCandidates = candidates.filter(
        (candidate) =>
          candidate.types && candidate.types.includes(AddressType.restaurant),
      );

      const perRestaurant = 1 / Duration.fromMillis(to.time - from.time).hours;
      const restaurantsNum = Math.min(
        Math.round(0.3 / perRestaurant),
        restaurantCandidates.length,
      );

      const restaurants: Place[] = [];

      for (let i = 0; i < restaurantsNum; i++) {
        const randomIndex = Math.floor(
          restaurantCandidates.length * Math.random(),
        );
        restaurants.push({
          type: 'place',
          time: ((to.time - from.time) / (restaurantsNum + 1)) * i,
          details: restaurantCandidates.splice(randomIndex, 1)[0],
        });
      }

      const results: Place[] = [
        //
      ];

      return results;
    } else {
      const randomIndex = Math.floor(candidates.length * Math.random());
      const waypoint: Place = {
        type: 'place',
        time: from.time + (to.time - from.time) / 2,
        details: candidates.splice(randomIndex, 1)[0],
      };

      const result: Place[] = [
        ...(await this.scheduleBetween(from, waypoint, candidates, needs)),
        waypoint,
        ...(await this.scheduleBetween(waypoint, to, candidates, needs)),
      ];

      return result;
    }
  }

  async scheduleDay(
    plan: Plan,
    from: Place,
    to: Place,
    candidates: Partial<PlaceData>[],
    itineraryDaily: ItineraryDaily,
  ): Promise<ItineraryDaily> {
    // Remove all system-generated schedules
    const newItineraryDaily: ItineraryDaily = itineraryDaily.filter(
      (schedule) => schedule.manual && !this.isEmptyObject(schedule.manual),
    );

    const result = await this.scheduleBetween(from, to, candidates, {
      food: 0,
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
      // this.scheduleDay(plan, itineraryDaily);
    }

    return plan;
  }
}
