import { Test, TestingModule } from '@nestjs/testing';

import { ConfigModule } from '@nestjs/config';
import { GoogleMapsModule } from 'src/google-maps/google-maps.module';

import { ScheduleRecommendService } from './schedule-recommend.service';
import { Plan } from 'src/plans/plan.schema';
import { Types } from 'mongoose';
import {
  ItineraryDaily,
  Place,
} from 'src/plans/interfaces/itinerary.interface';

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
        time: 0,
        duration: 0,
        details: {
          geometry: {
            location: {
              lat: 0,
              lng: 0,
            },
            viewport: {
              northeast: { lat: 0, lng: 0 },
              southwest: { lat: 0, lng: 0 },
            },
          },
        },
      };
      const end: Place = {
        type: 'place',
      };
      const candidates = await service.retreiveCandidates(start, end);

      expect(candidates.length).toBeGreaterThan(0);
    });

    it.skip('should get scheduled itinerary of a day', async () => {
      const itineraryDaily: ItineraryDaily = [];
      const newItineraryDaily = await service.scheduleDay(plan, itineraryDaily);

      expect(newItineraryDaily).toBeDefined();
    });

    it.skip('should get new plan from existing plan', async () => {
      const newPlan = await service.recommend(plan);

      expect(newPlan).toBeDefined();
    });
  });
});
