import { Controller, Get, Query, UseGuards } from '@nestjs/common';

import { ScheduleRecommendService } from './schedule-recommend.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller()
export class ScheduleRecommendController {
  constructor(
    private readonly scheduleRecommendService: ScheduleRecommendService,
  ) {}

  @UseGuards(JwtGuard)
  @Get('fast-recommend')
  async fastRecommend(@Query('lat') lat: number, @Query('lng') lng: number) {
    const result = await this.scheduleRecommendService.fastRecommend({
      lat: lat,
      lng: lng,
    });

    return result;
  }
}
