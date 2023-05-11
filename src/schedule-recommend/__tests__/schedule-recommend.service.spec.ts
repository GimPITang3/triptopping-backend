import { Test, TestingModule } from '@nestjs/testing';

import { ConfigModule } from '@nestjs/config';
import { GoogleMapsModule } from 'src/google-maps/google-maps.module';

import { ScheduleRecommendService } from '../schedule-recommend.service';
import { Plan } from 'src/plans/plan.schema';
import { Types } from 'mongoose';
import {
  ItineraryDaily,
  Place,
} from 'src/plans/interfaces/itinerary.interface';

import { places } from './places';

import { Needs } from '../interfaces/needs.interface';
import { Duration } from 'luxon';
import {
  AddressType,
  LatLngLiteral,
  PlaceData,
} from '@googlemaps/google-maps-services-js';

describe('ScheduleRecommendService', () => {
  let service: ScheduleRecommendService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({}), GoogleMapsModule],
      providers: [ScheduleRecommendService],
    }).compile();

    service = module.get<ScheduleRecommendService>(ScheduleRecommendService);
  });

  const city = 'sapporo';
  let cityLoc: LatLngLiteral;

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should retreive city location', async () => {
    cityLoc = await service.retreiveCityLocation(city);

    expect(cityLoc).toBeDefined();

    console.log(JSON.stringify(cityLoc));
  });

  it('should retreive landmarks', async () => {
    const landmarks = await service.retreiveLandmarks(city, cityLoc);

    expect(landmarks.length).toBeGreaterThan(0);

    landmarks.sort((a, b) => b.user_ratings_total - a.user_ratings_total);

    console.log(
      landmarks.map((landmark) => ({
        name: landmark.name,
        user: landmark.user_ratings_total,
        rating: landmark.rating,
      })),
    );
  });

  it('should retreive lodgings', async () => {
    const lodgings = await service.retreiveLodging(city, cityLoc);

    expect(lodgings.length).toBeGreaterThan(0);

    lodgings.sort((a, b) => b.user_ratings_total - a.user_ratings_total);

    console.log(
      lodgings.map((place) => ({
        name: place.name,
        user: place.user_ratings_total,
        rating: place.rating,
        types: place.types,
      })),
    );
  });

  describe('Plan recommendation', () => {
    let plan: Plan;

    beforeEach(async () => {
      plan = {
        planId: '',
        author: new Types.ObjectId(),
        budget: 0,
        itinerary: [],
        members: [],
        name: 'New trip',
        numberOfMembers: 0,
        tags: ['vacation'],
        period: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    it('should recomment plan', async () => {
      const newPlan = await service.recommend(plan);

      expect(newPlan).toBeDefined();

      newPlan.itinerary.forEach((daily, index) => {
        console.log(
          `Day ${index + 1}`,
          daily.map((schedule) => {
            if (schedule.type === 'place') {
              return `${schedule.system.details.name} ${Duration.fromMillis(
                schedule.system.time,
              ).toISOTime()}`;
            } else {
              return '';
            }
          }),
        );
      });
    });
  });
});

describe.skip('ScheduleRecommendService', () => {
  let service: ScheduleRecommendService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({}), GoogleMapsModule],
      providers: [ScheduleRecommendService],
    }).compile();

    service = module.get<ScheduleRecommendService>(ScheduleRecommendService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Plan recommendation', () => {
    let plan: Plan;
    let candidates: Partial<PlaceData>[];

    let start: Place;
    let end: Place;

    beforeEach(async () => {
      plan = {
        planId: '',
        author: new Types.ObjectId(),
        budget: 0,
        itinerary: [],
        members: [],
        name: 'New trip',
        numberOfMembers: 0,
        tags: ['vacation'],
        period: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      candidates = places.slice();

      const hotelPlaceId = 'ChIJ85hbBNOMGGARYgvauINiX18';

      const hotelIndex = candidates.findIndex(
        (place) => place.place_id === hotelPlaceId,
      );
      const hotel = candidates.splice(hotelIndex, 1)[0];

      start = {
        type: 'place',
        time: Duration.fromObject({ hours: 6, minutes: 0 }).toMillis(),
        details: hotel,
      };

      end = {
        type: 'place',
        time: Duration.fromObject({ hours: 22, minutes: 0 }).toMillis(),
        details: hotel,
      };
    });

    it.skip('should return candidates', async () => {
      const candidates = await service.retreiveCandidates(start, end);

      expect(candidates.length).toBeGreaterThan(0);
    }, 10000);

    it('should schedule between two schedules', async () => {
      const needs: Needs = {
        // food: 100,
      };

      const schedules = await service.scheduleBetween(
        start,
        end,
        candidates.slice(),
        needs,
      );

      expect(schedules.length).toBeGreaterThanOrEqual(2);
    });

    it('should get scheduled itinerary of a day', async () => {
      const itineraryDaily: ItineraryDaily = [];
      const newItineraryDaily = await service.scheduleDay(
        plan,
        start,
        end,
        candidates.slice(),
        itineraryDaily,
      );

      expect(newItineraryDaily).toBeDefined();
    });

    it('should get new plan from existing plan', async () => {
      const newPlan = await service.recommend(plan);

      expect(newPlan).toBeDefined();
      expect(newPlan.itinerary.length).toBeGreaterThan(0);

      for (const itineraryDaily of newPlan.itinerary) {
        expect(itineraryDaily).toBeDefined();

        console.log(
          itineraryDaily.map((daily) => {
            if (daily.type === 'place') {
              return daily.system.details.geometry.location;
            } else {
              return '';
            }
          }),
        );

        expect(itineraryDaily.length).toBeGreaterThan(0);
      }
    });

    it.skip('asdf', async () => {
      let types = candidates.flatMap((candidate) => candidate.types);
      types = Array.from(new Set(types));

      const establishments = candidates
        .filter((candidate) =>
          candidate.types.includes(AddressType.establishment),
        )
        .map((candidate) => candidate.name);

      const interests = candidates
        .filter((candidate) =>
          candidate.types.includes(AddressType.point_of_interest),
        )
        .map((candidate) => candidate.name);

      console.log(types);
      console.log(establishments);
      console.log(interests);
    });
  });
});
