import { Request } from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { GetUser } from 'src/auth/get-user.decorator';

import { ArticlesService } from './articles.service';
import { User } from 'src/users/user.schema';

import { CaslGuard } from 'src/casl/casl.guard';
import { Ability } from 'src/casl/ability.decorator';
import { AppAbility } from 'src/casl/casl-ability.factory';

import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PaginationOptionsDto } from 'src/pagination/pagination-options.dto';

@Controller()
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get('articles')
  async paginate(@Query() dto: PaginationOptionsDto) {
    const pagination = await this.articlesService.paginate(dto);

    return pagination;
  }

  @Get('users/:uid/articles')
  async paginateForUser(
    @Query() dto: PaginationOptionsDto,
    @Param('uid') userId: string,
  ) {
    const pagination = await this.articlesService.paginate({ ...dto, userId });

    return pagination;
  }

  @Get('articles/:id')
  async findById(@Param('id') id: string) {
    const article = await this.articlesService.findById(id);

    return article.toObject();
  }

  @UseGuards(JwtGuard, CaslGuard)
  @Post('articles')
  async create(
    @Body() dto: CreateArticleDto,
    @GetUser() user: User,
    @Ability() ability: AppAbility,
  ) {
    if (!ability.can('create', 'Article')) {
      throw new UnauthorizedException();
    }

    const article = await this.articlesService.create(user, dto);

    return article.toObject();
  }

  @UseGuards(JwtGuard, CaslGuard)
  @Patch('articles/:id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateArticleDto,
    @Ability() ability: AppAbility,
  ) {
    const article = await this.articlesService.findById(id);

    if (!ability.can('update', article)) {
      throw new UnauthorizedException();
    }

    const updatedArticle = await this.articlesService.update(article, dto);

    return updatedArticle.toObject();
  }

  @UseGuards(JwtGuard, CaslGuard)
  @Delete('articles/:id')
  async delete(@Param('id') id: string, @Ability() ability: AppAbility) {
    const article = await this.articlesService.findById(id);

    if (!ability.can('delete', article)) {
      throw new UnauthorizedException();
    }

    await this.articlesService.delete(id);
  }

  @Get('articles/:id/comments')
  async getComments(@Param('id') id: string) {
    const comments = await this.articlesService.getComments(id);

    return comments;
  }

  @UseGuards(JwtGuard, CaslGuard)
  @Post('articles/:id/comments')
  async createComment(
    @Param('id') id: string,
    @Body() dto: CreateCommentDto,
    @GetUser() user: User,
    @Ability() ability: AppAbility,
  ) {
    if (!ability.can('create', 'Comment')) {
      throw new UnauthorizedException();
    }

    const article = await this.articlesService.createComment(user, id, dto);

    return article.toObject();
  }

  @UseGuards(JwtGuard, CaslGuard)
  @Patch('articles/:id/comments/:cid')
  async updateComment(
    @Param('id') id: string,
    @Param('cid') cid: string,
    @Body() dto: UpdateCommentDto,
    @Ability() ability: AppAbility,
  ) {
    // TODO: provide sophisticated comment object
    if (!ability.can('update', 'Comment')) {
      throw new UnauthorizedException();
    }

    const article = await this.articlesService.updateComment(id, cid, dto);

    return article.toObject();
  }

  @UseGuards(JwtGuard, CaslGuard)
  @Delete('articles/:id/comments/:cid')
  async deleteComment(
    @Param('id') id: string,
    @Param('cid') cid: string,
    @Ability() ability: AppAbility,
  ) {
    // TODO: provide sophisticated comment object
    if (!ability.can('delete', 'Comment')) {
      throw new UnauthorizedException();
    }

    const article = await this.articlesService.deleteComment(id, cid);

    return article.toObject();
  }

  @UseGuards(JwtGuard)
  @Post('articles/:id/like')
  async like(
    @Param('id') id: string,
    @Req() request: Request & { user: User },
  ) {
    const article = await this.articlesService.setLike(request.user, id, true);

    return article.toObject();
  }

  @UseGuards(JwtGuard)
  @Delete('articles/:id/like')
  async unlike(
    @Param('id') id: string,
    @Req() request: Request & { user: User },
  ) {
    const article = await this.articlesService.setLike(request.user, id, false);

    return article.toObject();
  }
}
