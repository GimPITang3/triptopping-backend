import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

import { User } from 'src/users/user.schema';

export type PlanDocument = HydratedDocument<Plan>;

@Schema({ timestamps: true })
export class Plan {
  @Prop({ required: true, unique: true })
  planId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name, required: true })
  author: User;

  @Prop()
  members: any[];

  @Prop()
  startDate?: Date;

  @Prop({ required: true })
  period: number;

  @Prop()
  budget: number;

  @Prop()
  tags: string[];

  @Prop()
  itineraries: any[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  deletedAt: Date;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
