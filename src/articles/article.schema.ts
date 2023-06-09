import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

import { Plan } from 'src/plans/plan.schema';
import { User } from 'src/users/user.schema';

export type CommentDocument = HydratedDocument<Comment>;
export type ArticleDocument = HydratedDocument<
  Article,
  { comments: Types.DocumentArray<Comment> }
>;

@Schema({ timestamps: true })
export class Comment {
  static readonly modelName = 'Comment';

  @Prop({ unique: true })
  commentId: string;

  @Prop()
  content: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name, required: true })
  author: User;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  deletedAt?: Date;
}

const CommentSchema = SchemaFactory.createForClass(Comment);

@Schema({ timestamps: true, versionKey: false })
export class Article {
  static readonly modelName = 'Article';

  @Prop({ isRequired: true })
  title: string;

  @Prop({ unique: true })
  articleId: string;

  @Prop({ isRequired: true })
  content: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name, required: true })
  author: User;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Plan.name })
  plan?: Plan;

  @Prop()
  coverImageUrl?: string;

  @Prop({ type: [CommentSchema], default: [] })
  comments: Comment[];

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: User.name, default: [] })
  likes: User[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  deletedAt?: Date;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
ArticleSchema.pre('find', function () {
  this.populate('author');
});
