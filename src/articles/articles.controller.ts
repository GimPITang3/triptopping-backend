import { Request } from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { User } from 'src/users/user.schema';
import { PaginationOptionsDto } from 'src/pagination/pagination-options.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async findAll(@Body() dto: PaginationOptionsDto) {
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
}
