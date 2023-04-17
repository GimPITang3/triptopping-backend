import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { PlansService } from './plans.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('plans')
export class PlansController {
  constructor(private plansService: PlansService) {}

  @Get(':id')
  async findById(@Param('id') id: string) {
    const plan = await this.plansService.findById(id);

    return plan.toObject();
  }

  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() createPlanDto: CreatePlanDto) {
    const plan = await this.plansService.create(createPlanDto);

    return plan;
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(@Param('id') id: string) {
    // TODO:
    await this.plansService.update(id);

    return;
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.plansService.delete(id);
  }
}
