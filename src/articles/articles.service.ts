import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { createId } from '@paralleldrive/cuid2';

import { Article, ArticleDocument } from './article.schema';
import { User } from 'src/users/user.schema';

import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PaginationOptionsDto } from 'src/pagination/pagination-options.dto';
import { PaginationResponseDto } from 'src/pagination/pagination-response.dto';

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
  ) {}

  async paginate(
    dto: PaginationOptionsDto,
  ): Promise<PaginationResponseDto<Article>> {
    const query = this.articleModel.find({}).sort({ createdAt: 'desc' });

    const total = await query.count().exec();
    const articles = await query.skip(dto.skip).limit(dto.limit).exec();

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
      .exec();

    if (!article) {
      throw new ArticleNotFoundError();
    }

    return article;
  }

  async create(user: User, dto: CreateArticleDto): Promise<ArticleDocument> {
    const article = new this.articleModel({
      ...dto,
      articleId: createId(),
      author: user,
    });

    await article.save();

    return article;
  }

  async update(id: string, dto: UpdateArticleDto): Promise<ArticleDocument> {
    const article = await this.articleModel.findOneAndUpdate(
      { articleId: id, deletedAt: undefined },
      { ...dto },
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
}
