import { Test } from '@nestjs/testing';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ArticlesModule } from './articles.module';
import { ArticlesService } from './articles.service';

describe('Articles service', () => {
  let articlesService: ArticlesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.development.local.env', '.development.env'],
        }),
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            uri: configService.get<string>('MONGODB_URI'),
          }),
          inject: [ConfigService],
        }),
        ArticlesModule,
      ],
    }).compile();

    articlesService = moduleRef.get<ArticlesService>(ArticlesService);
  });

  it('must be defined', () => {
    expect(articlesService).toBeDefined();
  });
});
