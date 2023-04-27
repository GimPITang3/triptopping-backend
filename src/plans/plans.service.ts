import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { createId } from '@paralleldrive/cuid2';

import { CreatePlanDto } from './dto/create-plan.dto';
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
  ) {}

  async findById(planId: string): Promise<PlanDocument> {
    const plan = await this.plansModel.findOne({ planId }).exec();

    if (!plan) {
      throw new PlanNotFoundError();
    }

    return plan;
  }

  async create(createPlanDto: CreatePlanDto): Promise<PlanDocument> {
    const plan = new this.plansModel(createPlanDto);
    plan.planId = createId();
    plan.status = 'normal';
    plan.itineraries = [];

    plan.name = createPlanDto.name;
    plan.author = new Types.ObjectId(createPlanDto.author);
    plan.numberOfMembers = createPlanDto.numberOfMembers;
    plan.members = createPlanDto.members;
    plan.budget = createPlanDto.budget;
    plan.tags = createPlanDto.tags;

    plan.period = createPlanDto.period;
    if (createPlanDto.startDate) plan.startDate = createPlanDto.startDate;

    await plan.save();

    return plan;
  }

  async update(planId: string) {
    const plan = await this.plansModel.findOne({ planId }).exec();

    if (!plan) {
      throw new PlanNotFoundError();
    }

    // TODO:

    return;
  }

  async delete(planId: string) {
    const result = await this.plansModel.deleteOne({ planId }).exec();

    if (!result.acknowledged) {
      throw new Error('Delete plan was not acknowledge.');
    }
  }
}
