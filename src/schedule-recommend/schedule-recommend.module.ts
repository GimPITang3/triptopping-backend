import { Module } from '@nestjs/common';

import { GoogleMapsModule } from 'src/google-maps/google-maps.module';

import { ScheduleRecommendService } from './schedule-recommend.service';
import { GoogleTranslateModule } from 'src/google-translate/google-translate.module';
import { OpenaiModule } from 'src/openai/openai.module';

@Module({
  imports: [GoogleMapsModule, GoogleTranslateModule, OpenaiModule],
  controllers: [],
  providers: [ScheduleRecommendService],
  exports: [ScheduleRecommendService],
})
export class ScheduleRecommendModule {}
