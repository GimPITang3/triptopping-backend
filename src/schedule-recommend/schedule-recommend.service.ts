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
import { Plan, WeightedTag, WeightedTagDocument } from 'src/plans/plan.schema';
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
import { v2 } from '@google-cloud/translate';
import { TranslatePlaceData } from './interfaces/translated-place-data.interface';
import { OpenaiService } from 'src/openai/openai.service';

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
    });

    let day = 0;
    while (candidates.length > 0) {
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
      const candidate = candidates.splice(minIdx, 1)[0];
      const isNearBy = result[day].some(
        (place) =>
          haversineDistance(
            place.place.geometry.location,
            candidate.geometry.location,
          ) < 100,
      );
      if (!isNearBy) {
        result[day].push({
          place: candidate,
          isManaul: false,
        });
        day++;
        if (day >= parts) {
          day -= parts;
        }
      }
      if (result.every((day) => day.length >= 5)) {
        break;
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
    itinerary: ItineraryDaily[],
    weightedTag: WeightedTag,
  ): RecommendPlace[][] {
    const result = this.splitByDistance(
      array,
      center,
      parts,
      itinerary,
      weightedTag,
    );

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
  async retreiveLandmarks(
    cityLoc: LatLng,
  ): Promise<Partial<TranslatePlaceData>[]> {
    const resp = await this.client
      .textSearch({
        params: {
          query: 'tourist places',
          language: Language.ko,
          location: cityLoc,
          key: this.key,
        },
      })
      .catch((e) => {
        throw new Error('Error on retreive landmarks: ' + e);
      });

    if (resp.data.status !== Status.OK) {
      throw new Error(`status is not okay: ${resp.data.error_message}`);
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

  async retreiveLodging(
    cityLoc: LatLng,
  ): Promise<Partial<TranslatePlaceData>[]> {
    const resp = await this.client
      .textSearch({
        params: {
          query: 'lodging',
          language: Language.ko,
          location: cityLoc,
          key: this.key,
        },
      })
      .catch((e) => {
        throw new Error('error on retreive lodging: ' + e);
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

  async retreiveAirport(
    cityLoc: LatLng,
  ): Promise<Partial<TranslatePlaceData>[]> {
    const resp = await this.client
      .textSearch({
        params: {
          // type: AddressType.airport,
          query: 'airport',
          language: Language.ko,
          location: cityLoc,
          key: this.key,
        },
      })
      .catch((e) => {
        throw new Error('error on retreive airport: ' + e);
      });

    if (resp.data.status !== Status.OK) {
      throw new Error(`status is not okay: ${resp.data.error_message}`);
    }

    const results = resp.data.results.filter((place) =>
      place.types.includes(AddressType.airport),
    );

    if (results.length == 0) {
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
    const landmarksPerDay = this.splitToChunks(
      excludedLandmarks,
      lodging,
      plan.period,
      plan.itinerary,
      weightedTag,
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

      // const schedules: ScheduleSlot[] = [
      //   from,
      //   ...landmarksPerDay[dayIndex].map<Place>((landmark, i) => ({
      //     type: 'place',
      //     time: Duration.fromObject({
      //       hours:
      //         (22 - 1 - (7 + 1)) * (i / landmarksPerDay[dayIndex].length) +
      //         7 +
      //         1,
      //       minutes: 0,
      //     }).toMillis(),
      //     details: landmark.place,
      //   })),
      //   to,
      // ].map<ScheduleSlot>((place) => ({
      //   type: 'place',
      //   system: place,
      // }));

      // const userAdjustedSchedules: ScheduleSlot[] = daily.filter(
      //   (schedule) => schedule.manual && !isEmptyObject(schedule.manual),
      // );

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
