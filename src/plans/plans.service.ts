import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { createId } from '@paralleldrive/cuid2';

import { ScheduleRecommendService } from 'src/schedule-recommend/schedule-recommend.service';

import { Plan, PlanDocument } from './plan.schema';
import { User, UserDocument } from 'src/users/user.schema';

import { UserNotFoundError } from 'src/errors/user-not-found.error';

import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { PaginationResponseDto } from 'src/pagination/pagination-response.dto';
import { PaginationOptionsDto } from 'src/pagination/pagination-options.dto';

export class PlanNotFoundError extends Error {
  constructor() {
    super('Plan not found');
  }
}

@Injectable()
export class PlansService {
  constructor(
    @InjectModel(User.name) private readonly usersModel: Model<UserDocument>,
    @InjectModel(Plan.name) private readonly plansModel: Model<PlanDocument>,
    private readonly scheduleRecommend: ScheduleRecommendService,
  ) {}

  async paginate(
    userId: string,
    dto: PaginationOptionsDto,
  ): Promise<PaginationResponseDto<Plan>> {
    const user = await this.usersModel.findOne({ userId }).exec();

    if (!user) {
      throw new UserNotFoundError();
    }

    const query = this.plansModel.find({
      author: user._id,
      deletedAt: undefined,
    });

    const total = await query.clone().count().exec();
    const plans = await query
      .clone()
      .skip(dto.skip)
      .limit(dto.limit)
      .select('-routes -itinerary')
      .exec();

    return {
      skip: dto.skip,
      limit: dto.limit,
      total: total,
      items: plans.map((plan) => plan.toObject()),
    };
  }

  async findAll(): Promise<PlanDocument[]> {
    const plans = await this.plansModel
      .find({ deletedAt: undefined })
      .select('-routes -itinerary')
      .exec();

    return plans;
  }

  async findById(planId: string): Promise<PlanDocument> {
    const plan = await this.plansModel
      .findOne({ planId, deletedAt: undefined })
      .exec();

    if (!plan) {
      throw new PlanNotFoundError();
    }

    return plan;
  }

  async create(
    user: User,
    createPlanDto: CreatePlanDto,
  ): Promise<PlanDocument> {
    const plan = new this.plansModel({
      ...createPlanDto,
      planId: createId(),
      itinerary: [],
      author: user,
      members: [],
    });

    await this.scheduleRecommend.recommend(plan);

    await plan.save();

    return plan;
  }

  async update(
    planId: string,
    updatePlanDto: UpdatePlanDto,
  ): Promise<PlanDocument> {
    const plan = await this.plansModel
      .findOneAndUpdate(
        { planId, deletedAt: undefined },
        {
          ...updatePlanDto,
        },
        {
          returnOriginal: false,
        },
      )
      .exec();

    if (!plan) {
      throw new PlanNotFoundError();
    }

    await this.scheduleRecommend.recommend(plan);
    await this.plansModel.updateOne({ planId }, plan);

    return plan;
  }

  async updateHotel(
    planId: string,
    updatePlanDto: UpdatePlanDto,
  ): Promise<PlanDocument> {
    const plan = await this.plansModel
      .findOneAndUpdate(
        { planId, deletedAt: undefined },
        {
          ...updatePlanDto,
        },
        {
          returnOriginal: false,
        },
      )
      .exec();

    if (!plan) {
      throw new PlanNotFoundError();
    }

    await this.scheduleRecommend.updateHotel(plan);
    await this.plansModel.updateOne({ planId }, plan);
    return plan;
  }

  async delete(planId: string) {
    const plan = await this.plansModel
      .findOne({ planId, deletedAt: undefined })
      .exec();

    if (!plan) {
      throw new PlanNotFoundError();
    }

    plan.deletedAt = new Date();

    await plan.save();
  }

  async getDetails(planId: string): Promise<PlanDocument> {
    const plan = await this.plansModel.findOne({
      planId,
      deletedAt: undefined,
    });

    if (!plan) {
      throw new PlanNotFoundError();
    }

    const routesOutdated =
      !plan.routes ||
      plan.routes.length === 0 ||
      (plan.routesCalculatedAt &&
        plan.routesCalculatedAt.getTime() < plan.updatedAt.getTime());

    if (routesOutdated) {
      await this.scheduleRecommend.calculateRoutes(plan);

      plan.routesCalculatedAt = new Date();

      await plan.save();
    }

    return plan;
  }

  async excludePlaces(planId: string, placeIds: string[]) {
    const plan = await this.plansModel.findOne({
      planId,
      deletedAt: undefined,
    });

    if (!plan) {
      throw new PlanNotFoundError();
    }

    plan.excludes = Array.from(new Set(plan.excludes.concat(placeIds)));

    await plan.save();
  }
}
