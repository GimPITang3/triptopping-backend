import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { DirectionsRoute } from '@googlemaps/google-maps-services-js';

import { Itinerary } from './interfaces/itinerary.interface';
import { LatLng } from 'src/interfaces/lat-lng.interface';

export type PlanDocument = HydratedDocument<Plan>;

@Schema()
class LatLngClass implements LatLng {
  @Prop()
  lat: number;

  @Prop()
  lng: number;
}

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

  @Prop({ required: true, type: () => LatLngClass })
  loc: LatLngClass;

  @Prop()
  budget: number;

  @Prop()
  tags: string[];

  @Prop()
  itinerary: Itinerary;

  @Prop()
  routes?: DirectionsRoute[][];

  /** Place ids */
  @Prop()
  excludes?: string[];

  @Prop()
  routesCalculatedAt?: Date;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  deletedAt?: Date;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
