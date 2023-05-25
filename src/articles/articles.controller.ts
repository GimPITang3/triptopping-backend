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
  UseGuards,
} from '@nestjs/common';

import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { User } from 'src/users/user.schema';
import { PaginationOptionsDto } from 'src/pagination/pagination-options.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async findAll(@Query() dto: PaginationOptionsDto) {
    const pagination = await this.articlesService.paginate(dto);

    return pagination;
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const article = await this.articlesService.findById(id);

    return article.toObject();
  }

  @UseGuards(JwtGuard)
  @Post()
  async create(
    @Body() dto: CreateArticleDto,
    @Req() request: Request & { user: User },
  ) {
    const article = await this.articlesService.create(request.user, dto);

    return article.toObject();
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateArticleDto) {
    const article = await this.articlesService.update(id, dto);

    return article.toObject();
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.articlesService.delete(id);
  }

  @Get(':id/comments')
  async getComments(@Param('id') id: string) {
    const comments = await this.articlesService.getComments(id);

    return comments;
  }

  @Post(':id/comments')
  async createComment(@Param('id') id: string, @Body() dto: CreateCommentDto) {
    const comment = await this.articlesService.createComment(id, dto);

    return comment;
  }

  @Post(':id/comments/:cid')
  async updateComment(
    @Param('id') id: string,
    @Param('cid') cid: string,
    @Body() dto: UpdateCommentDto,
  ) {
    const comment = await this.articlesService.updateComment(id, cid, dto);

    return comment;
  }

  @Post(':id/comments/:cid')
  async deleteComment(@Param('id') id: string, @Param('cid') cid: string) {
    await this.articlesService.deleteComment(id, cid);

    return;
  }
}
