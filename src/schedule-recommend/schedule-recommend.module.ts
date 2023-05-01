import { Module } from '@nestjs/common';
import { ScheduleRecommendService } from './schedule-recommend.service';

@Module({
  providers: [ScheduleRecommendService]
})
export class ScheduleRecommendModule { }
