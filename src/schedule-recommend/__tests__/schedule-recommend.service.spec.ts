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

import { candidates } from './candidates';

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
        candidates,
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
        candidates,
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
        expect(itineraryDaily.length).toBeGreaterThan(0);
      }
    });
  });
});
