import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

import { User } from 'src/users/user.schema';

export type PlanDocument = HydratedDocument<Plan>;

@Schema({ timestamps: true })
export class Plan {
  @Prop({ required: true })
  name: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name, required: true })
  author: User;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
