import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { createId } from '@paralleldrive/cuid2';

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
  ) {}

  async findAll(): Promise<PlanDocument[]> {
    const plans = await this.plansModel.find({ deletedAt: undefined }).exec();
    return plans;
  }

  async findById(planId: string): Promise<PlanDocument> {
    const plan = await this.plansModel.findOne({ planId }).exec();

    if (!plan || plan.deletedAt !== undefined) {
      throw new PlanNotFoundError();
    }

    return plan;
  }

  async create(createPlanDto: CreatePlanDto): Promise<PlanDocument> {
    const plan = new this.plansModel(createPlanDto);
    plan.planId = createId();
    plan.itinerary = [];

    plan.name = createPlanDto.name;
    plan.author = new Types.ObjectId(createPlanDto.author);
    plan.numberOfMembers = createPlanDto.numberOfMembers;
    plan.budget = createPlanDto.budget;
    plan.tags = createPlanDto.tags;

    plan.period = createPlanDto.period;
    if (createPlanDto.startDate) plan.startDate = createPlanDto.startDate;

    await plan.save();

    return plan;
  }

  async update(updatePlanDto: UpdatePlanDto): Promise<PlanDocument> {
    const planId = updatePlanDto.planId;
    const plan = await this.plansModel.findOne({ planId }).exec();

    if (!plan || plan.deletedAt !== undefined) {
      throw new PlanNotFoundError();
    }

    // TODO:

    plan.itinerary = [];

    plan.name = updatePlanDto.name;
    plan.numberOfMembers = updatePlanDto.numberOfMembers;

    plan.members = updatePlanDto.members.map((e) => {
      return new Types.ObjectId(e);
    });
    plan.budget = updatePlanDto.budget;
    plan.tags = updatePlanDto.tags;

    plan.period = updatePlanDto.period;
    if (updatePlanDto.startDate) plan.startDate = updatePlanDto.startDate;

    return plan;
  }

  async delete(planId: string) {
    const plan = await this.plansModel.findOne({ planId }).exec();

    if (!plan || plan.deletedAt !== undefined) {
      throw new PlanNotFoundError();
    }

    // TODO:
  }
}
