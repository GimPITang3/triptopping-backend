import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleRecommendService } from './schedule-recommend.service';

describe('ScheduleRecommendService', () => {
  let service: ScheduleRecommendService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduleRecommendService],
    }).compile();

    service = module.get<ScheduleRecommendService>(ScheduleRecommendService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
