import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { Client } from '@googlemaps/google-maps-services-js';

export const GOOGLE_MAPS_ACCESS_KEY_TOKEN = 'GOOGLE_MAPS_ACCESS_KEY_TOKEN';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [
    {
      provide: Client,
      useValue: new Client(),
    },
    {
      provide: GOOGLE_MAPS_ACCESS_KEY_TOKEN,
      useFactory: async (configService: ConfigService) => {
        const key = configService.get<string>('GOOGLE_MAPS_ACCESS_KEY');

        if (typeof key !== 'string') {
          throw new Error(
            'Google Maps access key is not provided via environment variables.',
          );
        }

        return key;
      },
      inject: [ConfigService],
    },
  ],
  exports: [Client, GOOGLE_MAPS_ACCESS_KEY_TOKEN],
})
export class GoogleMapsModule {}
