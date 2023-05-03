import { Inject, Injectable, OnModuleInit } from '@nestjs/common';

import { Client } from '@googlemaps/google-maps-services-js';
import { GOOGLE_MAPS_ACCESS_KEY_TOKEN } from './google-maps.constants';

@Injectable()
export class GoogleMapsService implements OnModuleInit {
  constructor(
    private readonly client: Client,
    @Inject(GOOGLE_MAPS_ACCESS_KEY_TOKEN)
    private readonly key: string,
  ) {}

  async onModuleInit() {
    //
  }
}
