import { Injectable } from '@nestjs/common';

@Injectable()
export class ScheduleRecommendService {
  async recommend(plan: object) {
    return plan;
  }
}
