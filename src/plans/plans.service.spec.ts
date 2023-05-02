import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Model } from 'mongoose';

import { Plan } from './plan.schema';
import { PlansService } from './plans.service';

const mockPlan = ({}): Plan => {
  return {
    planId: '1',
    name: 'title of the plan',
    author: 'Jisu Sim',
    members: [],
    itineraries: [],
    numberOfMembers: 0,
    period: 10,
    status: '',
    budget: 1000,
    tags: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

describe.skip('PlansService', () => {
  let plansService: PlansService;
  let model: Model<Plan>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Plan.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockPlan({})),
            constructor: jest.fn().mockResolvedValue(mockPlan({})),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    plansService = moduleRef.get<PlansService>(PlansService);
    model = moduleRef.get<Model<Plan>>(getModelToken(Plan.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(plansService).toBeDefined();
    expect(model).toBeDefined();
  });

  it('should return all plans', () => {
    //
  });

  it('should insert a new plan', () => {
    //
  });

  it('should update a plan successfully', () => {
    //
  });

  it('should delete a plan successfully', () => {
    //
  });

  it('should not delete a plan', () => {
    //
  });
});
