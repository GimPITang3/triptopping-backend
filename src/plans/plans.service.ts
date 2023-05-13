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
    const plans = await this.plansModel.find({ deletedAt: undefined }).exec();
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

  async update(updatePlanDto: UpdatePlanDto): Promise<PlanDocument> {
    const planId = updatePlanDto.planId;
    const plan = await this.plansModel
      .findOne({ planId, deletedAt: undefined })
      .exec();

    if (!plan) {
      throw new PlanNotFoundError();
    }

    plan.name = updatePlanDto.name;
    plan.numberOfMembers = updatePlanDto.numberOfMembers;

    plan.members = updatePlanDto.members.map((e) => new Types.ObjectId(e));
    plan.budget = updatePlanDto.budget;
    plan.tags = updatePlanDto.tags;

    plan.period = updatePlanDto.period;
    if (updatePlanDto.startDate) plan.startDate = updatePlanDto.startDate;

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
}
