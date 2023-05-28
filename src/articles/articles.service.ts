import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { createId } from '@paralleldrive/cuid2';

import { Article, ArticleDocument, Comment } from './article.schema';
import { User } from 'src/users/user.schema';
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
  ) {}

  async paginate(
    dto: PaginationOptionsDto,
  ): Promise<PaginationResponseDto<Article>> {
    const query = this.articleModel
      .find({})
      .populate('author')
      .sort({ createdAt: 'desc' });

    const total = await query.clone().count().exec();
    const articles = await query
      .clone()
      .skip(parseInt(dto.skip.toString()))
      .limit(parseInt(dto.limit.toString()))
      .exec();

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

    if (!plan) {
      throw new Error('Plan not found');
    }

    const article = new this.articleModel({
      title: dto.title,
      content: dto.content,
      articleId: createId(),
      author: user,
      plan: plan,
    });

    await article.save();

    return article;
  }

  async update(id: string, dto: UpdateArticleDto): Promise<ArticleDocument> {
    const plan = await this.planModel
      .findOne({ planId: dto.planId, deletedAt: undefined })
      .populate('comments.author')
      .exec();

    if (!plan) {
      throw new Error('Plan not found');
    }

    const article = await this.articleModel.findOneAndUpdate(
      { articleId: id, deletedAt: undefined },
      {
        ...{ title: dto.title },
        ...{ content: dto.content },
        ...{ plan: plan },
      },
      { returnOriginal: false },
    );

    if (!article) {
      throw new ArticleNotFoundError();
    }

    return article;
  }

  async delete(id: string) {
    const result = await this.articleModel.deleteOne({
      articleId: id,
      deletedAt: undefined,
    });

    if (!result.acknowledged) {
      throw new Error('failed to delete article');
    }
  }

  async getComments(articleId: string): Promise<Comment[]> {
    const article = await this.articleModel
      .findOne({ articleId: articleId })
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

  async incLikes(articleId: string): Promise<ArticleDocument> {
    const article = await this.articleModel
      .findOne({ articleId, deletedAt: undefined })
      .populate('comments.author')
      .exec();

    if (!article) {
      throw new ArticleNotFoundError();
    }

    article.likes++;

    await article.save();

    return article;
  }
}
