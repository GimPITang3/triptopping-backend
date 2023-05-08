import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Plan, PlanSchema } from './plan.schema';

import { ScheduleRecommendModule } from 'src/schedule-recommend/schedule-recommend.module';
import { PlansController } from './plans.controller';
import { PlansService } from './plans.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Plan.name, schema: PlanSchema }]),
    ScheduleRecommendModule,
  ],
  providers: [PlansService],
  controllers: [PlansController],
  exports: [PlansService],
})
export class PlansModule {}
