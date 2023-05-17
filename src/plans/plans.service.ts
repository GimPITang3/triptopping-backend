import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { createId } from '@paralleldrive/cuid2';

import { ScheduleRecommendService } from 'src/schedule-recommend/schedule-recommend.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { Plan, PlanDocument } from './plan.schema';

export class PlanNotFoundError extends Error {
  constructor() {
    super('Plan not found');
  }
}

@Injectable()
export class PlansService {
  constructor(
    @InjectModel(Plan.name) private readonly plansModel: Model<PlanDocument>,
    private readonly scheduleRecommend: ScheduleRecommendService,
  ) {}

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

  async create(createPlanDto: CreatePlanDto): Promise<PlanDocument> {
    const plan = new this.plansModel({
      ...createPlanDto,
      planId: createId(),
      itinerary: [],
      author: new Types.ObjectId(createPlanDto.author),
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

    await plan.save();

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
