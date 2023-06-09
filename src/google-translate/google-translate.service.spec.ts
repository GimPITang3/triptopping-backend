import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { v2 } from '@google-cloud/translate';

import { GoogleTranslateModule } from './google-translate.module';
import { GoogleTranslateService } from './google-translate.service';

describe('Google Translate', () => {
  let translate: v2.Translate;
  let googleTranslateService: GoogleTranslateService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.development.local.env', '.development.env'],
        }),
        GoogleTranslateModule,
      ],
    }).compile();

    translate = moduleRef.get<v2.Translate>(v2.Translate);
    googleTranslateService = moduleRef.get<GoogleTranslateService>(
      GoogleTranslateService,
    );
  });

  it('should be defined', async () => {
    expect(translate).toBeDefined();
    expect(googleTranslateService).toBeDefined();
  });

  it('should translate', async () => {
    const [translations, metadata] = await translate.translate('Hello', 'ko');

    expect(translations).toBeDefined();
    expect(metadata).toBeDefined();
  });
});
