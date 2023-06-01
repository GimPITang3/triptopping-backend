import { Module } from '@nestjs/common';

import { GoogleMapsModule } from 'src/google-maps/google-maps.module';
import { GoogleTranslateModule } from 'src/google-translate/google-translate.module';
import { OpenaiModule } from 'src/openai/openai.module';

import { ScheduleRecommendService } from './schedule-recommend.service';
import { ScheduleRecommendController } from './schedule-recommend.controller';

@Module({
  imports: [GoogleMapsModule, GoogleTranslateModule, OpenaiModule],
  controllers: [ScheduleRecommendController],
  providers: [ScheduleRecommendService],
  exports: [ScheduleRecommendService],
})
export class ScheduleRecommendModule {}
