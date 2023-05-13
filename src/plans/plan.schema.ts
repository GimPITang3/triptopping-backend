import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

import { Itinerary } from './interfaces/itinerary.interface';
import { DirectionsRoute } from '@googlemaps/google-maps-services-js';

export type PlanDocument = HydratedDocument<Plan>;

@Schema({ timestamps: true })
export class Plan {
  @Prop({ required: true, unique: true })
  /** DB independent id, auto-generated. */
  planId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  author: Types.ObjectId;

  @Prop()
  numberOfMembers: number;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] })
  members: Types.ObjectId[];

  @Prop()
  startDate?: Date;

  @Prop({ required: true })
  period: number;

  @Prop()
  budget: number;

  @Prop()
  tags: string[];

  @Prop()
  itinerary: Itinerary;

  @Prop()
  routes?: DirectionsRoute[][];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  deletedAt?: Date;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
