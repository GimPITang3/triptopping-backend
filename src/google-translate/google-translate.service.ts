import { Injectable } from '@nestjs/common';

import { v2 } from '@google-cloud/translate';

@Injectable()
export class GoogleTranslateService {
  constructor(private readonly client: v2.Translate) {}
}
