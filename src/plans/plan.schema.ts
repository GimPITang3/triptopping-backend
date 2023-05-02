import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { PlaceData } from '@googlemaps/google-maps-services-js';
import { Type } from '@nestjs/common';

export type PlanDocument = HydratedDocument<Plan>;

interface Place {
  type: 'place';

  time: Date;
  duration: number;
  cost: number;

  details: Partial<PlaceData>;
}

interface Transport {
  type: 'transport';

  time: Date;
  duration: number;
  cost: number;
}

type ItineraryType = Place | Transport;

type Itinerary<T> = T extends { type: string }
  ? {
      type: T['type'];
      system?: Partial<Omit<T, 'type'>>;
      manual?: Partial<Omit<T, 'type'>>;
    }
  : never;

type ItinerarySlot = Itinerary<ItineraryType>;

type ItinerariesDay = ItinerarySlot[];

type Itineraries = ItinerariesDay[];

@Schema({ timestamps: true })
export class Plan {
  @Prop({ required: true, unique: true })
  planId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  status: string;

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
  itineraries: Itineraries;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  deletedAt?: Date;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
