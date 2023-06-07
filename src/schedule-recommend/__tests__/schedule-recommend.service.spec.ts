import { Test, TestingModule } from '@nestjs/testing';

import { ConfigModule } from '@nestjs/config';
import { GoogleMapsModule } from 'src/google-maps/google-maps.module';

import { ScheduleRecommendService } from '../schedule-recommend.service';
import { Plan } from 'src/plans/plan.schema';
import { User } from 'src/users/user.schema';

import { Duration } from 'luxon';
import { LatLngLiteral } from '@googlemaps/google-maps-services-js';

describe('ScheduleRecommendService', () => {
  let service: ScheduleRecommendService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({}), GoogleMapsModule],
      providers: [ScheduleRecommendService],
    }).compile();

    service = module.get<ScheduleRecommendService>(ScheduleRecommendService);
  });

  const city = 'osaka';
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
    const landmarks = await service.retreiveLandmarks(cityLoc);

    expect(landmarks.length).toBeGreaterThan(0);

    landmarks.sort((a, b) => b.user_ratings_total - a.user_ratings_total);

    console.log(
      'landmarks',
      landmarks.map((landmark) => ({
        name: landmark.name,
        user: landmark.user_ratings_total,
        rating: landmark.rating,
      })),
    );
  });

  it('should retreive lodgings', async () => {
    const lodgings = await service.retreiveLodging(cityLoc);

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

  describe('Plan recommendation and calculate routes', () => {
    let plan: Plan;

    beforeAll(async () => {
      plan = {
        planId: '',
        author: new User(),
        budget: 0,
        itinerary: [],
        members: [],
        name: 'New trip',
        numberOfMembers: 0,
        tags: ['vacation', 'tokyo'],
        loc: cityLoc,
        period: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    it('should recommend plan', async () => {
      const newPlan = await service.recommend(plan);

      expect(newPlan).toBeDefined();

      newPlan.itinerary.forEach((daily, index) => {
        console.log(
          `Day ${index + 1}`,
          daily.map((schedule) => {
            if (schedule.type === 'place') {
              return `${schedule.system.details.name} ${Duration.fromMillis(
                schedule.system.time,
              ).toISOTime()} ${schedule.system.details.place_id}`;
            } else {
              return '';
            }
          }),
        );
      });
    });

    it('should calculate routes', async () => {
      const newPlan = await service.calculateRoutes(plan);

      expect(newPlan).toBeDefined();
      expect(newPlan.routes).toBeDefined();
      expect(newPlan.routes.length).toBe(newPlan.period);

      newPlan.routes.forEach((route) => {
        console.log(route[0]);
      });
    });
  });
});
