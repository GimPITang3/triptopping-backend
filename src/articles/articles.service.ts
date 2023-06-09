import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { createId } from '@paralleldrive/cuid2';

import { Article, ArticleDocument, Comment } from './article.schema';
import { User, UserDocument } from 'src/users/user.schema';
import { Plan, PlanDocument } from 'src/plans/plan.schema';

import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PaginationOptionsDto } from 'src/pagination/pagination-options.dto';
import { PaginationResponseDto } from 'src/pagination/pagination-response.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

export class ArticleNotFoundError extends Error {
  constructor() {
    super();
  }
}

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name)
    private readonly articleModel: Model<ArticleDocument>,
    @InjectModel(Plan.name)
    private readonly planModel: Model<PlanDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async paginate(
    dto: PaginationOptionsDto & { userId?: string },
  ): Promise<PaginationResponseDto<Article>> {
    let userDocId;

    if (dto.userId) {
      const user = await this.userModel.findOne({ userId: dto.userId }).exec();
      userDocId = user._id;
    }

    const query = this.articleModel
      .find({
        ...(userDocId && {
          author: userDocId,
        }),
      })
      .populate('author')
      .populate('comments.author')
      .populate('likes')
      .populate('plan', 'tags')
      .sort({ createdAt: 'desc' });

    const total = await query.clone().count().exec();
    const articles = await query.clone().skip(dto.skip).limit(dto.limit).exec();

    return {
      items: articles.map((article) => article.toObject()),
      limit: dto.limit,
      skip: dto.skip,
      total: total,
    };
  }

  async findById(id: string): Promise<ArticleDocument> {
    const article = await this.articleModel
      .findOne({ articleId: id, deletedAt: undefined })
      .populate('author')
      .populate('plan')
      .populate('comments.author')
      .populate('likes')
      .exec();

    if (!article) {
      throw new ArticleNotFoundError();
    }

    return article;
  }

  async create(user: User, dto: CreateArticleDto): Promise<ArticleDocument> {
    const plan = await this.planModel
      .findOne({ planId: dto.planId, deletedAt: undefined })
      .exec();

    const article = new this.articleModel({
      title: dto.title,
      content: dto.content,
      coverImageUrl: dto.coverImageUrl,
      articleId: createId(),
      author: user,
      plan: plan,
    });

    await article.save();

    return article;
  }

  async update(
    article: ArticleDocument,
    dto: UpdateArticleDto,
  ): Promise<ArticleDocument> {
    const plan = await this.planModel
      .findOne({ planId: dto.planId, deletedAt: undefined })
      .exec();

    article.title = dto.title;
    article.content = dto.content;
    article.coverImageUrl = dto.coverImageUrl;
    article.plan = plan;

    const updatedArticle = await article.save();

    return updatedArticle;
  }

  async delete(id: string) {
    const result = await this.articleModel
      .deleteOne({
        articleId: id,
        deletedAt: undefined,
      })
      .exec();

    if (!result.acknowledged) {
      throw new Error('failed to delete article');
    }
  }

  async getComments(articleId: string): Promise<Comment[]> {
    const article = await this.articleModel
      .findOne({ articleId: articleId })
      .populate('comments.author')
      .select('comments')
      .exec();

    return article.comments;
  }

  async createComment(
    user: User,
    articleId: string,
    dto: CreateCommentDto,
  ): Promise<ArticleDocument> {
    const article = await this.articleModel
      .findOne({ articleId, deletedAt: undefined })
      .populate('comments.author')
      .populate('likes')
      .populate('author')
      .exec();

    if (!article) {
      throw new ArticleNotFoundError();
    }

    article.comments.push({
      commentId: createId(),
      author: user,
      content: dto.content,
    });

    await article.save();

    return article;
  }

  async updateComment(
    articleId: string,
    commentId: string,
    dto: UpdateCommentDto,
  ): Promise<ArticleDocument> {
    const article = await this.articleModel
      .findOne({ articleId, deletedAt: undefined })
      .populate('comments.author')
      .populate('likes')
      .populate('author')
      .exec();

    if (!article) {
      throw new ArticleNotFoundError();
    }

    const commentDocId = article.comments.find(
      (comment) => comment.commentId === commentId,
    )._id;

    article.comments.id(commentDocId).updateOne({ content: dto.content });

    await article.save();

    return article;
  }

  async deleteComment(
    articleId: string,
    commentId: string,
  ): Promise<ArticleDocument> {
    const article = await this.articleModel
      .findOne({ articleId, deletedAt: undefined })
      .populate('comments.author')
      .populate('likes')
      .populate('author')
      .exec();

    if (!article) {
      throw new ArticleNotFoundError();
    }

    const commentDocId = article.comments.find(
      (comment) => comment.commentId === commentId,
    )._id;

    article.comments.id(commentDocId).deleteOne();

    await article.save();

    return article;
  }

  async setLike(
    user: User,
    articleId: string,
    add: boolean,
  ): Promise<ArticleDocument> {
    const article = await this.articleModel
      .findOne({ articleId, deletedAt: undefined })
      .populate('comments.author')
      .populate('likes')
      .populate('author')
      .exec();

    if (!article) {
      throw new ArticleNotFoundError();
    }

    if (!Array.isArray(article.likes)) {
      article.likes = [];
    }

    if (add) {
      if (article.likes.find((i) => i.userId == user.userId) === undefined) {
        article.likes.push(user);
      }
    } else {
      const idx = article.likes.findIndex((i) => i.userId == user.userId);

      if (idx !== -1) {
        article.likes.splice(idx, 1);
      }
    }

    await article.save();

    return article;
  }
}
