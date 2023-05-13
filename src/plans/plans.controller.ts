import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { PlansService } from './plans.service';

@Controller('plans')
export class PlansController {
  constructor(private plansService: PlansService) {}

  // 지워지지 않은 모든 plan을 반환한다.
  //! 테스트용 API
  @Get()
  async findAll() {
    const plans = await this.plansService.findAll();
    return plans.map((plan) => plan.toObject());
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const plan = await this.plansService.findById(id);

    return plan.toObject();
  }

  // @UseGuards(JwtGuard)
  @Post()
  async create(@Body() createPlanDto: CreatePlanDto) {
    const plan = await this.plansService.create(createPlanDto);

    return plan.toObject();
  }

  // @UseGuards(JwtGuard)
  @Patch(':id')
  async update(@Body() updatePlanDto: UpdatePlanDto) {
    // TODO:
    const plan = await this.plansService.update(updatePlanDto);

    return plan.toObject();
  }

  // @UseGuards(JwtGuard)
  @Put(':id')
  async replace(@Body() _replacePlanDto: any) {
    return;
  }

  // @UseGuards(JwtGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.plansService.delete(id);
  }

  @Get('detail/:id')
  async getDetails(@Param('id') id: string) {
    const plan = await this.plansService.getDetails(id);

    return plan;
  }
}
