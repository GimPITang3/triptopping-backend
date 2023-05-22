import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/users/user.schema';

export type ArticleDocument = HydratedDocument<Article>;

@Schema({ _id: false, timestamps: true })
class Comment {
  @Prop()
  content: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name, required: true })
  author: User;

  @Prop()
  createdAt: Date;
}

const CommentSchema = SchemaFactory.createForClass(Comment);

@Schema({ timestamps: true })
export class Article {
  @Prop({ isRequired: true })
  title: string;

  @Prop({ unique: true })
  articleId: string;

  @Prop({ isRequired: true })
  content: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name, required: true })
  author: User;

  @Prop([{ type: CommentSchema }])
  comments: Comment[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  deletedAt?: Date;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
