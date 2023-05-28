import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Plan, PlanSchema } from './plan.schema';
import { User, UserSchema } from 'src/users/user.schema';

import { ScheduleRecommendModule } from 'src/schedule-recommend/schedule-recommend.module';
import { PlansController } from './plans.controller';
import { PlansService } from './plans.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Plan.name, schema: PlanSchema },
      { name: User.name, schema: UserSchema },
    ]),
    ScheduleRecommendModule,
  ],
  providers: [PlansService],
  controllers: [PlansController],
  exports: [PlansService],
})
export class PlansModule {}
