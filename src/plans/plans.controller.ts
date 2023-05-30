import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import { PlansService } from './plans.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { ExcludePlacesDto } from './dto/exclude-places.dto';
import { PaginationOptionsDto } from 'src/pagination/pagination-options.dto';

import { UserNotFoundError } from 'src/errors/user-not-found.error';
import { Request } from 'express';
import { User } from 'src/users/user.schema';
import { InviteMemberDto } from './dto/invite-member.dto';
import { GoogleMapsServiceError } from 'src/errors/google-maps-service';

@Controller()
export class PlansController {
  constructor(private plansService: PlansService) {}

  @Get('plans')
  async findAll() {
    const plans = await this.plansService.findAll();
    return plans.map((plan) => plan.toObject());
  }

  @Get('users/:uid/plans')
  async paginate(
    @Query() dto: PaginationOptionsDto,
    @Param('uid') userId: string,
  ) {
    try {
      const result = await this.plansService.paginate(userId, dto);

      return result;
    } catch (e) {
      if (e instanceof UserNotFoundError) {
        throw new HttpException(e.message, HttpStatus.NOT_FOUND);
      } else {
        throw e;
      }
    }
  }

  @Get('plans/:id')
  async findById(@Param('id') id: string) {
    const plan = await this.plansService.findById(id);

    return plan.toObject();
  }

  @UseGuards(JwtGuard)
  @Post('plans')
  async create(
    @Body() createPlanDto: CreatePlanDto,
    @Req() request: Request & { user: User },
  ) {
    const plan = await this.plansService.create(request.user, createPlanDto);

    return plan.toObject();
  }

  @UseGuards(JwtGuard)
  @Patch('plans/:id')
  async update(@Param('id') id: string, @Body() updatePlanDto: UpdatePlanDto) {
    const plan = await this.plansService.update(id, updatePlanDto);

    return plan.toObject();
  }

  @UseGuards(JwtGuard)
  @Put('plans/:id')
  async replace(@Body() _replacePlanDto: any) {
    // TODO:
    return;
  }

  @UseGuards(JwtGuard)
  @Delete('plans/:id')
  async delete(@Param('id') id: string) {
    await this.plansService.delete(id);
  }

  @Get('plans/:id/detail')
  async getDetails(@Param('id') id: string) {
    try {
      const plan = await this.plansService.getDetails(id);

      return plan.toObject();
    } catch (e) {
      if (e instanceof GoogleMapsServiceError) {
        throw new HttpException(
          `Failed to get details: ${e.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else {
        throw e;
      }
    }
  }

  @Patch('plans/:id/hotel')
  async updateHotel(
    @Param('id') id: string,
    @Body() updatePlanDto: UpdatePlanDto,
  ) {
    const plan = await this.plansService.updateHotel(id, updatePlanDto);

    return plan.toObject();
  }

  @UseGuards(JwtGuard)
  @Post('plans/:id/excludes')
  @HttpCode(200)
  async excludePlaces(@Param('id') id: string, @Body() dto: ExcludePlacesDto) {
    await this.plansService.excludePlaces(id, dto.placeIds);
  }

  @UseGuards(JwtGuard)
  @Post('plans/:id/members')
  async inviteMember(@Param('id') id: string, @Body() dto: InviteMemberDto) {
    const plan = await this.plansService.inviteMember(id, dto);

    return plan.toObject();
  }
}
