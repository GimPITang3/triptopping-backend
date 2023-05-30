import { Inject, Injectable } from '@nestjs/common';

import {
  AddressType,
  Client,
  DirectionsRoute,
  Language,
  PlaceData,
  PlaceInputType,
  PlaceType1,
  Status,
} from '@googlemaps/google-maps-services-js';
import { v2 } from '@google-cloud/translate';
import * as haversineDistance from 'haversine-distance';
import { Duration } from 'luxon';

import { Plan, WeightedTag, WeightedTagDocument } from 'src/plans/plan.schema';
import { GOOGLE_MAPS_ACCESS_KEY_TOKEN } from 'src/google-maps/google-maps.constants';

import {
  ItineraryDaily,
  Place,
  ScheduleSlot,
  ScheduleType,
} from 'src/plans/interfaces/itinerary.interface';

import { LatLng } from 'src/interfaces/lat-lng.interface';
import { TranslatePlaceData } from './interfaces/translated-place-data.interface';
import { OpenaiService } from 'src/openai/openai.service';
import { GoogleMapsServiceError } from 'src/errors/google-maps-service';

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

// TODO: change to other place...
interface RecommendPlace {
  isManaul: boolean;
  place: Partial<PlaceData>;
}

@Injectable()
export class ScheduleRecommendService {
  constructor(
    private readonly client: Client,
    @Inject(GOOGLE_MAPS_ACCESS_KEY_TOKEN)
    private readonly key: string,
    private readonly translate: v2.Translate,
    private readonly openai: OpenaiService,
  ) {}

  splitByDistance(
    array: Partial<TranslatePlaceData>[],
    center: Partial<TranslatePlaceData>,
    parts: number,
    itineray: ItineraryDaily[],
    weightedTag: WeightedTag,
    isCreated: boolean,
  ): RecommendPlace[][] {
    // sorting...
    const result: RecommendPlace[][] = [];
    itineray.forEach((day, idx) => {
      result[idx] = day
        .filter((slot) => slot.type === 'place' && slot.manual)
        .map((slot) => ({
          place: slot.manual.details as Partial<TranslatePlaceData>,
          isManaul: true,
        }));
    });

    interface PlaceWithDistance extends Partial<TranslatePlaceData> {
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
    sortedPlaces.sort((a, b) => a.distance - b.distance);
    sortedPlaces.sort((a, b) => a.user_ratings_total - b.user_ratings_total);

    // distributing...
    const selected = result.map(() => false);
    while (selected.findIndex((value) => value === false) !== -1) {
      let completeSelect = false;
      const place = sortedPlaces.pop();
      if (!place) break;
      // 이미 끝 점을 넣어 놓은 경우
      for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result[i].length; j++) {
          if (result[i][j].place.place_id === place.place_id) {
            if (selected[i]) {
              completeSelect = true;
              break;
            }
            selected[i] = true;
            result[i].unshift(result[i].splice(j, 1)[0]);
            completeSelect = true;
            break;
          }
        }
      }
      if (completeSelect) {
        continue;
      }

      // 끝 점이 없는 경우 -> 이 끝 점이 들어가 있는 것 중에서 가장 어울리는 곳으로 넣어야함.
      let hMinDist = Number.MAX_SAFE_INTEGER;
      let idx = 0;
      for (let i = 0; i < result.length; i++) {
        if (selected[i]) continue;
        let hDist = result[i].reduce(
          (acc, cur) =>
            acc +
            haversineDistance(
              center.geometry.location,
              cur.place.geometry.location,
            ) +
            haversineDistance(
              cur.place.geometry.location,
              place.geometry.location,
            ),
          0,
        );
        if (hDist === 0) hDist = Number.MAX_SAFE_INTEGER - 1;
        if (hDist < hMinDist) {
          hMinDist = hDist;
          idx = i;
        }
      }
      result[idx].unshift({ place, isManaul: false });
      selected[idx] = true;
    }

    const candidates = sortedPlaces.filter(
      (place) =>
        !result
          .flatMap((day) => day.map((place) => place.place.place_id))
          .includes(place.place_id),
    );

    const sum = Object.values(weightedTag).reduce(
      (acc, value) => acc + value,
      0,
    );
    Object.keys(weightedTag).forEach((key) => {
      weightedTag[key] /= sum;
      if (weightedTag[key] === Infinity) {
        weightedTag[key] = 0;
      }
    });

    let day = 0;
    const complete = Array(parts).fill(false);
    while (candidates.length > 0 && !complete.every((value) => value)) {
      let hMinDist = Number.MAX_SAFE_INTEGER;
      let minIdx = -1;
      candidates.forEach((place, idx) => {
        const weight = place.types.reduce((acc, cur) => {
          return acc + (weightedTag[cur] || 0);
        }, 0);
        const hDist =
          (haversineDistance(
            place.geometry.location,
            center.geometry.location,
          ) +
            haversineDistance(
              place.geometry.location,
              result[day][0].place.geometry.location,
            )) *
          (1 - weight);

        if (hDist < hMinDist) {
          hMinDist = hDist;
          minIdx = idx;
        }
      });
      const dayLength = isCreated ? itineray[day].length - 4 : 5;
      if (result[day].length < dayLength) {
        const candidate = candidates.splice(minIdx, 1)[0];
        const isNearBy = result[day].some(
          (place) =>
            haversineDistance(
              place.place.geometry.location,
              candidate.geometry.location,
            ) < 200,
        );
        if (!isNearBy) {
          result[day].push({
            place: candidate,
            isManaul: false,
          });
        }
      } else {
        complete[day] = true;
      }
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

  async addRestaurants(chunks: RecommendPlace[][], excludes: string[]) {
    const findMinDistRestaurantIndex = (
      place: Partial<PlaceData>,
      restaurants: Partial<PlaceData>[],
    ) => {
      let minDist = Number.MAX_SAFE_INTEGER;
      let minIdx = -1;
      restaurants
        .filter((restaurant) => !excludes.includes(restaurant.place_id))
        .forEach((restaurant, idx) => {
          const dist = haversineDistance(
            place.geometry.location,
            restaurant.geometry.location,
          );
          if (dist < minDist) {
            minDist = dist;
            minIdx = idx;
          }
        });
      return minIdx;
    };
    const promises = chunks.map(async (chunk) => {
      if (
        chunk.some(
          (place) =>
            place.isManaul &&
            place.place.types.includes(AddressType.restaurant),
        )
      ) {
        return;
      }
      const restaurants1 = await this.retreiveRestaurant(
        chunk[0].place.geometry.location,
      );
      const firstIndex = findMinDistRestaurantIndex(
        chunk[0].place,
        restaurants1,
      );
      const first = restaurants1.splice(firstIndex, 1)[0];
      const restaurants2 = await this.retreiveRestaurant(
        chunk[chunk.length - 1].place.geometry.location,
      );
      const secondIndex = findMinDistRestaurantIndex(
        chunk[chunk.length - 1].place,
        restaurants2,
      );
      const second = restaurants2.splice(secondIndex, 1)[0];

      chunk.splice(4, 0, { isManaul: false, place: second });
      chunk.splice(2, 0, { isManaul: false, place: first });
    });
    await Promise.all(promises);

    return chunks;
  }

  async splitToChunks(
    landmarks: Partial<PlaceData>[],
    center: Partial<PlaceData>,
    parts: number,
    itinerary: ItineraryDaily[],
    weightedTag: WeightedTag,
    isCreated: boolean,
    excludes: string[],
  ): Promise<RecommendPlace[][]> {
    const splitedChunks = this.splitByDistance(
      landmarks,
      center,
      parts,
      itinerary,
      weightedTag,
      isCreated,
    );

    await this.addRestaurants(splitedChunks, excludes);

    return splitedChunks;
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
        throw new GoogleMapsServiceError(
          cityResp.data.status,
          cityResp.data.error_message,
        );
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

  async retreivePlaces(
    query: string,
    loc: LatLng,
    type?: PlaceType1,
    radius?: number,
  ): Promise<Partial<TranslatePlaceData>[]> {
    const resp = await this.client
      .textSearch({
        params: {
          type,
          radius,
          query,
          language: Language.ko,
          location: loc,
          key: this.key,
        },
      })
      .catch((e) => {
        throw new Error('Error on retreive landmarks: ' + e);
      });

    if (resp.data.status !== Status.OK) {
      throw new GoogleMapsServiceError(
        resp.data.status,
        resp.data.error_message,
      );
    }
    if (resp.data.results.length == 0) {
      throw new Error('no results');
    }

    const promises = resp.data.results.map(
      async (place: Partial<TranslatePlaceData>) => {
        let [translations] = await this.translate.translate(place.name, 'ko');

        translations = Array.isArray(translations)
          ? translations[0]
          : translations;

        place.translated_name = translations;
        return place;
      },
    );

    const translatedData = await Promise.all(promises);

    return translatedData;
  }

  /**
   * Retreive places of city
   */
  async retreiveLandmarks(
    cityLoc: LatLng,
  ): Promise<Partial<TranslatePlaceData>[]> {
    return await this.retreivePlaces('tourist places', cityLoc);
  }

  async retreiveLodging(
    cityLoc: LatLng,
  ): Promise<Partial<TranslatePlaceData>[]> {
    return await this.retreivePlaces('lodging', cityLoc, AddressType.lodging);
  }

  async retreiveAirport(
    cityLoc: LatLng,
  ): Promise<Partial<TranslatePlaceData>[]> {
    return await this.retreivePlaces('airport', cityLoc, AddressType.airport);
  }

  async retreiveRestaurant(loc: LatLng): Promise<Partial<PlaceData>[]> {
    return await this.retreivePlaces(
      'restaurant',
      loc,
      AddressType.restaurant,
      1500,
    );
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
      const resp = await this.client
        .placesNearby({
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
        })
        .catch((e) => {
          throw new Error('error on retreive candidates: ' + e);
        });

      const { next_page_token, results, status, error_message } = resp.data;

      if (status !== Status.OK) {
        throw new GoogleMapsServiceError(status, error_message);
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

  async updateHotel(plan: Plan): Promise<Plan> {
    const lodgings = await this.retreiveLodging(plan.loc);
    const index = lodgings.findIndex(
      (lodging) => !plan.excludes.includes(lodging.place_id),
    );
    const isKorea =
      plan.loc.lat > 33 &&
      plan.loc.lat < 43 &&
      plan.loc.lng > 124 &&
      plan.loc.lng < 132;
    plan.itinerary.forEach((daily, day) => {
      if (isKorea) {
        daily[0].system.details = lodgings[index];
        daily[daily.length - 1].system.details = lodgings[index];
      } else {
        if (day === 0) {
          daily[daily.length - 1].system.details = lodgings[index];
        } else if (day === plan.itinerary.length - 1) {
          daily[0].system.details = lodgings[index];
        } else {
          daily[0].system.details = lodgings[index];
          daily[daily.length - 1].system.details = lodgings[index];
        }
      }
    });
    return plan;
  }

  /**
   * It will fill itinerary of the given plan in-place.
   * @param plan
   */
  async recommend(plan: Plan): Promise<Plan> {
    // Make itinerary array to have exact length
    plan.itinerary = plan.itinerary.slice(0, plan.period);
    const isCreated = plan.itinerary.length > 0;
    if (plan.itinerary.length < plan.period) {
      plan.itinerary = plan.itinerary.concat(
        Array(plan.period - plan.itinerary.length)
          .fill(undefined)
          .map(() => []),
      );
    }
    let weightedTagPromise: Promise<WeightedTag>;
    if (!plan.tagWeight) {
      weightedTagPromise = this.openai.getTagWeights(plan.tags);
    } else {
      const weightedTag = (plan.tagWeight as WeightedTagDocument).toObject();
      delete weightedTag._id;
      weightedTagPromise = Promise.resolve(weightedTag);
    }
    const isKorea =
      plan.loc.lat > 33 &&
      plan.loc.lat < 43 &&
      plan.loc.lng > 124 &&
      plan.loc.lng < 132;
    // Retrive Landmarks and lodgings
    const landmarksPromise = this.retreiveLandmarks(plan.loc);
    const lodgingsPromise = this.retreiveLodging(plan.loc);
    const airportsPromise = this.retreiveAirport(plan.loc);

    const [landmarks, lodgings, airports] = await Promise.all([
      landmarksPromise,
      lodgingsPromise,
      airportsPromise,
    ]);
    // Pickup best lodging
    lodgings.sort((a, b) => b.user_ratings_total - a.user_ratings_total);
    const lodging = lodgings[0];
    const airport = airports[0];

    // Exclude landmarks that the user does not want
    const excludedLandmarks = landmarks.filter(
      (landmark) => !plan.excludes.includes(landmark.place_id),
    );
    const weightedTag = await weightedTagPromise;
    plan.tagWeight = weightedTag;
    // Distribute landmarks
    const landmarksPerDay = await this.splitToChunks(
      excludedLandmarks,
      lodging,
      plan.period,
      plan.itinerary,
      weightedTag,
      isCreated,
      plan.excludes,
    );
    // Plan daily itinerary
    plan.itinerary.forEach((daily, dayIndex) => {
      const from: ScheduleSlot = {
        type: 'place',
        system: {
          details: !isKorea && dayIndex === 0 ? airport : lodging,
        },
      };
      const to: ScheduleSlot = {
        type: 'place',
        system: {
          details:
            !isKorea && dayIndex === plan.itinerary.length - 1
              ? airport
              : lodging,
        },
      };

      const schedules: ScheduleSlot[] = [
        from,
        ...landmarksPerDay[dayIndex].map<ScheduleSlot>((landmarks, i) => {
          const data: ScheduleSlot = {
            type: 'place',
          };
          data[landmarks.isManaul ? 'manual' : 'system'] = {
            time: Duration.fromObject({
              hours:
                (22 - 1 - (7 + 1)) * (i / landmarksPerDay[dayIndex].length) +
                7 +
                1,
              minutes: 0,
            }).toMillis(),
            details: landmarks.place,
          };
          return data;
        }),
        to,
      ];

      // Remove all schedules
      daily.splice(0, daily.length);

      daily.splice(0, 0, ...schedules);
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
          throw new GoogleMapsServiceError(status, error_message);
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
