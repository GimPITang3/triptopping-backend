import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';

import { Client, PlaceInputType } from '@googlemaps/google-maps-services-js';

import {
  GOOGLE_MAPS_ACCESS_KEY_TOKEN,
  GoogleMapsModule,
} from './google-maps.module';

describe('Google Maps', () => {
  let client: Client;
  let key: string;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.development.local.env', '.development.env'],
        }),
        GoogleMapsModule,
      ],
    }).compile();

    client = moduleRef.get<Client>(Client);
    key = moduleRef.get<string>(GOOGLE_MAPS_ACCESS_KEY_TOKEN);
  });

  it('must be defined', async () => {
    expect(client).toBeDefined();
    expect(key).toBeDefined();
  });

  it('Find place from text', async () => {
    const result = await client.findPlaceFromText({
      params: {
        input: '광화문',
        inputtype: PlaceInputType.textQuery,
        key,
      },
    });

    expect(result.data.candidates.length).toBeGreaterThanOrEqual(1);

    for (const candidate of result.data.candidates) {
      const details = await client.placeDetails({
        params: {
          place_id: candidate.place_id,
          key,
        },
      });

      expect(details.data.result.place_id).toBeDefined();
    }
  });
});
