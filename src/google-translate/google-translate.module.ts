import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { v2 } from '@google-cloud/translate';

import { GoogleTranslateService } from './google-translate.service';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [
    {
      provide: v2.Translate,
      useFactory: (configService: ConfigService) => {
        return new v2.Translate({
          key: configService.get<string>('GOOGLE_MAPS_ACCESS_KEY'),
        });
      },
      inject: [ConfigService],
    },
    GoogleTranslateService,
  ],
  exports: [v2.Translate, GoogleTranslateService],
})
export class GoogleTranslateModule {}
