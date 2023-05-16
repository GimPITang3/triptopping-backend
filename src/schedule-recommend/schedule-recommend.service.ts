import { Inject, Injectable } from '@nestjs/common';

import {
  AddressType,
  Client,
  DirectionsRoute,
  Language,
  PlaceData,
  PlaceInputType,
  Status,
} from '@googlemaps/google-maps-services-js';
import { Plan } from 'src/plans/plan.schema';
import { GOOGLE_MAPS_ACCESS_KEY_TOKEN } from 'src/google-maps/google-maps.constants';

import {
  ItineraryDaily,
  Place,
  ScheduleSlot,
  ScheduleType,
} from 'src/plans/interfaces/itinerary.interface';
import { Needs } from './interfaces/needs.interface';

import * as haversineDistance from 'haversine-distance';
import { Duration } from 'luxon';

import { LatLng } from 'src/interfaces/lat-lng.interface';

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function flattenScheduleSlot(schedule: ScheduleSlot): ScheduleType {
  return <ScheduleType>{
    type: schedule.type,
    ...schedule.system,
    ...schedule.manual,
  };
}

@Injectable()
export class ScheduleRecommendService {
  constructor(
    private readonly client: Client,
    @Inject(GOOGLE_MAPS_ACCESS_KEY_TOKEN)
    private readonly key: string,
  ) {}

  isEmptyObject(param: any): boolean {
    return Object.keys(param).length === 0 && param.constructor === Object;
  }

  splitByDistance(
    array: Partial<PlaceData>[],
    center: Partial<PlaceData>,
    parts: number,
  ): Partial<PlaceData>[][] {
    const result: Partial<PlaceData>[][] = [];
    interface PlaceWithDistance extends Partial<PlaceData> {
      distance: number;
    }
    const sortedPlaces: PlaceWithDistance[] = array.map((place) => {
      return {
        ...place,
        distance: haversineDistance(
          place.geometry.location,
          center.geometry.location,
        ),
      };
    });
    sortedPlaces.sort((a, b) => b.distance - a.distance);
    sortedPlaces.sort((a, b) => b.user_ratings_total - a.user_ratings_total);

    for (let i = 0; i < parts; i++) {
      result[i] = sortedPlaces.splice(0, 1);
    }
    let day = 0;
    while (sortedPlaces.length > 0) {
      let hMinDist = Number.MAX_SAFE_INTEGER;
      let minIdx = -1;
      sortedPlaces.forEach((place, idx) => {
        const hDist =
          haversineDistance(place.geometry.location, center.geometry.location) +
          haversineDistance(
            place.geometry.location,
            result[day][0].geometry.location,
          );
        if (hDist < hMinDist) {
          hMinDist = hDist;
          minIdx = idx;
        }
      });
      result[day].push(sortedPlaces.splice(minIdx, 1)[0]);

      day++;
      if (day >= parts) {
        day -= parts;
      }
    }

    for (let i = 0; i < parts; i++) {
      result[i].reverse();
    }

    return result;
  }

  splitToChunks(
    array: Partial<PlaceData>[],
    center: Partial<PlaceData>,
    parts: number,
  ): Partial<PlaceData>[][] {
    const result = this.splitByDistance(array, center, parts);

    return result;
  }

  async retreiveCityLocation(city: string): Promise<LatLng> {
    try {
      const cityResp = await this.client.findPlaceFromText({
        params: {
          input: `${city} city`,
          inputtype: PlaceInputType.textQuery,
          fields: ['geometry'],
          key: this.key,
        },
      });

      if (cityResp.data.status !== Status.OK) {
        throw new Error('status is not okay: ' + cityResp.data.error_message);
      }
      if (cityResp.data.candidates.length == 0) {
        throw new Error('no candidates');
      }

      const cityInfo = cityResp.data.candidates[0];

      if (!cityInfo.geometry?.location) {
        throw new Error('no location data');
      }

      return cityInfo.geometry.location;
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   * Retreive landmarks of city
   */
  async retreiveLandmarks(cityLoc: LatLng): Promise<Partial<PlaceData>[]> {
    const resp = await this.client.textSearch({
      params: {
        query: 'tourist places',
        language: Language.ko,
        location: cityLoc,
        key: this.key,
      },
    });

    if (resp.data.status !== Status.OK) {
      throw new Error(`status is not okay: ${resp.data.error_message}`);
    }
    if (resp.data.results.length == 0) {
      throw new Error('no results');
    }

    return resp.data.results;
  }

  async retreiveLodging(cityLoc: LatLng): Promise<Partial<PlaceData>[]> {
    const resp = await this.client.textSearch({
      params: {
        query: 'lodging',
        language: Language.ko,
        location: cityLoc,
        key: this.key,
      },
    });

    if (resp.data.status !== Status.OK) {
      throw new Error(`status is not okay: ${resp.data.error_message}`);
    }

    const results = resp.data.results.filter((place) =>
      place.types.includes(AddressType.lodging),
    );

    if (results.length == 0) {
      throw new Error('no results');
    }

    return results;
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
    const delta = to.time - from.time;
    if (delta < Duration.fromObject({ hours: 1.0 }).toMillis()) {
      return [];
    }

    const fromLatLng = from.details.geometry.location;
    const toLatLng = to.details.geometry.location;
    const mid: LatLng = {
      lat: (fromLatLng.lat + toLatLng.lat) / 2,
      lng: (fromLatLng.lng + toLatLng.lng) / 2,
    };
    const diameter = haversineDistance(fromLatLng, toLatLng);
    // const minDiameter = 5000 / (delta / 1000 / 60 / 60);
    // const radius = Math.max(diameter, minDiameter) / 2;
    const radius = diameter / 2;

    const possibleIndices: number[] = candidates
      .map((candidate, index) => [index, candidate] as const)
      .filter(([_index, candidate]) => {
        const loc = candidate.geometry.location;
        const dist = haversineDistance(loc, mid);

        return dist <= radius;
      })
      .map(([index, _candidate]) => index);

    if (possibleIndices.length == 0) {
      return [];
    }

    const randomIndex =
      possibleIndices[Math.floor(possibleIndices.length * Math.random())];

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

  async scheduleDay(
    plan: Plan,
    from: Place,
    to: Place,
    candidates: Partial<PlaceData>[],
    itineraryDaily: ItineraryDaily,
  ): Promise<ItineraryDaily> {
    // Remove all system-generated schedules
    // const newItineraryDaily: ItineraryDaily = itineraryDaily.filter(
    //   (schedule) => schedule.manual && !this.isEmptyObject(schedule.manual),
    // );

    // const result: Schedule<Place>[] = (
    //   await this.scheduleBetween(from, to, candidates, {})
    // ).map((schedule) => ({
    //   type: 'place',
    //   system: {
    //     ...schedule,
    //   },
    // }));
    const result: ScheduleSlot<Place>[] = candidates.map((place) => ({
      type: 'place',
      system: {
        details: place,
      },
    }));

    itineraryDaily.splice(0, itineraryDaily.length, ...result);

    //
    // for (const schedule of itineraryDaily) {
    //   schedule.manual.duration;
    //   schedule.manual.time;
    //   if (
    //     schedule.type === 'place' &&
    //     schedule.manual?.details?.types.includes(AddressType.restaurant)
    //   ) {
    //     //
    //   }
    // }

    // return newItineraryDaily;
    return result;
  }

  /**
   * It will fill itinerary of the given plan in-place.
   * @param plan
   */
  async recommend(plan: Plan): Promise<Plan> {
    // Make itinerary array to have exact length
    plan.itinerary = plan.itinerary.slice(0, plan.period);
    plan.itinerary = plan.itinerary.concat(
      Array(plan.period - plan.itinerary.length)
        .fill(undefined)
        .map(() => []),
    );

    const landmarks = await this.retreiveLandmarks(plan.loc);
    const lodgings = await this.retreiveLodging(plan.loc);
    lodgings.sort((a, b) => b.user_ratings_total - a.user_ratings_total);

    // Pickup lodging
    const lodging = lodgings[0];

    // Exclude landmarks that the user does not want
    landmarks.splice(
      0,
      landmarks.length,
      ...landmarks.filter(
        (landmark) => plan.excludes.includes(landmark.place_id) === false,
      ),
    );

    // Distribute landmarks
    const landmarksPerDay = this.splitToChunks(landmarks, lodging, plan.period);

    plan.itinerary.forEach((daily, dayIndex) => {
      const from: Place = {
        type: 'place',
        time: Duration.fromObject({ hours: 7, minutes: 0 }).toMillis(),
        details: lodging,
      };
      const to: Place = {
        type: 'place',
        time: Duration.fromObject({ hours: 22, minutes: 0 }).toMillis(),
        details: lodging,
      };

      // TODO: remove all schedules
      daily.splice(0, daily.length);

      const schedules: Place[] = [
        from,
        ...landmarksPerDay[dayIndex].map<Place>((landmark, i) => ({
          type: 'place',
          time: Duration.fromObject({
            hours:
              (22 - 1 - (7 + 1)) * (i / landmarksPerDay[dayIndex].length) +
              7 +
              1,
            minutes: 0,
          }).toMillis(),
          details: landmark,
        })),
        to,
      ];

      daily.splice(
        0,
        0,
        ...schedules.map<ScheduleSlot>((schedule) => ({
          type: 'place',
          system: schedule,
        })),
      );

      // const candidates = await this.retreiveCandidates(from, to);
      // await this.scheduleDay(plan, from, to, candidates, itineraryDaily);
    });

    return plan;
  }

  /**
   * It will calculate routes of the itinerary of the given plan in-place.
   * @param plan
   */
  async calculateRoutes(plan: Plan): Promise<Plan> {
    plan.routes = await Promise.all(
      plan.itinerary.map(async (daily): Promise<DirectionsRoute[]> => {
        if (daily.length < 2) return [];

        const placeIds = daily
          .map((scheduleSlot) => flattenScheduleSlot(scheduleSlot))
          .map((schedule) => {
            if (schedule.type === 'place') {
              return schedule.details.place_id;
            } else {
              return '';
            }
          })
          .map((placeId) => `place_id:${placeId}`);

        const resp = await this.client.directions({
          params: {
            origin: placeIds[0],
            destination: placeIds[daily.length - 1],
            waypoints: placeIds.slice(1, daily.length - 1),
            optimize: true,
            language: Language.ko,
            key: this.key,
          },
        });

        const { status, error_message, routes } = resp.data;

        if (status !== Status.OK) {
          throw new Error(error_message);
        }

        const route = routes[0];

        const waypoints: ScheduleSlot[] = daily.splice(1, daily.length - 2);

        const orderedWaypoints = route.waypoint_order.map(
          (order) => waypoints[order],
        );

        daily.splice(1, 0, ...orderedWaypoints);

        return routes;
      }),
    );

    return plan;
  }
}
