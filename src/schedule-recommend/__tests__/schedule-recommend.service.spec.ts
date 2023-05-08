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

import path = require('path');
import * as fs from 'fs';
import { PlaceData } from '@googlemaps/google-maps-services-js';
import { Needs } from '../interfaces/needs.interface';
import { Duration } from 'luxon';

describe('ScheduleRecommendService', () => {
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

    it.skip('should return candidates', async () => {
      const start: Place = {
        type: 'place',
        details: {
          geometry: {
            location: {
              lat: 35.6869211,
              lng: 139.6933196,
            },
            viewport: {
              northeast: {
                lat: 35.6882700802915,
                lng: 139.6946685802915,
              },
              southwest: {
                lat: 35.6855721197085,
                lng: 139.6919706197085,
              },
            },
          },
        },
      };
      const end: Place = {
        type: 'place',
        details: {
          geometry: {
            location: {
              lat: 35.6869211,
              lng: 139.6933196,
            },
            viewport: {
              northeast: {
                lat: 35.6882700802915,
                lng: 139.6946685802915,
              },
              southwest: {
                lat: 35.6855721197085,
                lng: 139.6919706197085,
              },
            },
          },
        },
      };

      const candidates = await service.retreiveCandidates(start, end);

      expect(candidates.length).toBeGreaterThan(0);
    }, 10000);

    it('should schedule between two schedules', async () => {
      const candidates: Partial<PlaceData>[] = JSON.parse(
        fs.readFileSync(path.join(__dirname, 'candidates.json'), {
          encoding: 'utf-8',
        }),
      );

      const hotelPlaceId = 'ChIJ85hbBNOMGGARYgvauINiX18';

      const hotelIndex = candidates.findIndex(
        (place) => place.place_id === hotelPlaceId,
      );
      const hotel = candidates.splice(hotelIndex, 1)[0];

      const start: Place = {
        type: 'place',
        time: Duration.fromObject({ hours: 6, minutes: 0 }).toMillis(),
        details: hotel,
      };

      const end: Place = {
        type: 'place',
        time: Duration.fromObject({ hours: 22, minutes: 0 }).toMillis(),
        details: hotel,
      };

      const needs: Needs = {
        food: 100,
      };

      const schedules = await service.scheduleBetween(
        start,
        end,
        candidates,
        needs,
      );

      expect(schedules.length).toBeGreaterThanOrEqual(2);

      console.log(
        schedules.map((schedule) =>
          [
            schedule.details.name,
            Duration.fromMillis(schedule.time).toISOTime(),
            schedule.details.types.join('/'),
            [schedule.details.geometry.location]
              .map((loc) => `${loc.lat} ${loc.lng}`)
              .join(''),
          ].join('     '),
        ),
      );

      console.log(
        schedules.map((schedule) => schedule.details.geometry.location),
      );
    });

    it.skip('should get scheduled itinerary of a day', async () => {
      const itineraryDaily: ItineraryDaily = [];
      const newItineraryDaily = await service.scheduleDay(
        plan,
        null,
        null,
        [],
        itineraryDaily,
      );

      expect(newItineraryDaily).toBeDefined();
    });

    it.skip('should get new plan from existing plan', async () => {
      const newPlan = await service.recommend(plan);

      expect(newPlan).toBeDefined();
    });
  });
});
