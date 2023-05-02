import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { createId } from '@paralleldrive/cuid2';

import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { Plan, PlanDocument } from './plan.schema';
import { Type } from 'class-transformer';

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

    if (!plan || plan.status === 'deleted') {
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
    plan.budget = createPlanDto.budget;
    plan.tags = createPlanDto.tags;

    plan.period = createPlanDto.period;
    if (createPlanDto.startDate) plan.startDate = createPlanDto.startDate;

    await plan.save();

    return plan;
  }

  async update(updatePlanDto: UpdatePlanDto): Promise<PlanDocument> {
    const planId = updatePlanDto.planId;
    const plan = await this.plansModel.findOne( { planId }).exec();

    if (!plan || plan.status === 'deleted') {
      throw new PlanNotFoundError();
    }

    // TODO:

    plan.itineraries = [];

    plan.name = updatePlanDto.name;
    plan.numberOfMembers = updatePlanDto.numberOfMembers;

    plan.members = updatePlanDto.members.map((e) => {return new Types.ObjectId(e)});
    plan.budget = updatePlanDto.budget;
    plan.tags = updatePlanDto.tags;

    plan.period = updatePlanDto.period;
    if (updatePlanDto.startDate) plan.startDate = updatePlanDto.startDate;

    return plan;
  }

  async delete(planId: string) {
    const plan = await this.plansModel.findOne( { planId }).exec();

    plan.status = 'deleted';

    if (!plan || plan.status === 'deleted') {
      throw new PlanNotFoundError();
    }
  }
}
