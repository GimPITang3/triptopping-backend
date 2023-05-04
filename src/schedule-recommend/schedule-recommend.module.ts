import { Module } from '@nestjs/common';

import { GoogleMapsModule } from 'src/google-maps/google-maps.module';

import { ScheduleRecommendService } from './schedule-recommend.service';

@Module({
  imports: [GoogleMapsModule],
  controllers: [],
  providers: [ScheduleRecommendService],
  exports: [ScheduleRecommendService],
})
export class ScheduleRecommendModule {}
