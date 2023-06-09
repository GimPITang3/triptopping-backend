import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CaslModule } from 'src/casl/casl.module';

import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';

import { Article, ArticleSchema } from './article.schema';
import { Plan, PlanSchema } from 'src/plans/plan.schema';
import { User, UserSchema } from 'src/users/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Article.name, schema: ArticleSchema },
      { name: Plan.name, schema: PlanSchema },
      { name: User.name, schema: UserSchema },
    ]),
    CaslModule,
  ],
  providers: [ArticlesService],
  controllers: [ArticlesController],
  exports: [ArticlesService],
})
export class ArticlesModule {}
