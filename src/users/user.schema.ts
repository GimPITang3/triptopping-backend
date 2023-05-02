import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
class GoogleProvider {
  @Prop({ required: true, unique: true })
  id: string;
}

const GoogleProviderSchema = SchemaFactory.createForClass(GoogleProvider);

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  /** DB independent ID of user, auto-generated. */
  userId: string;

  @Prop()
  nickname: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ type: GoogleProviderSchema })
  google: GoogleProvider;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
