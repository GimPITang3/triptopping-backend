import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';

import {
  AddressType,
  Client,
  Language,
  PlaceInputType,
} from '@googlemaps/google-maps-services-js';

import { GoogleMapsModule } from './google-maps.module';
import { GOOGLE_MAPS_ACCESS_KEY_TOKEN } from './google-maps.constants';

describe.skip('Google Maps', () => {
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

  it('should find place from text', async () => {
    const result = await client.findPlaceFromText({
      params: {
        input: '광화문',
        inputtype: PlaceInputType.textQuery,
        key,
      },
    });

    expect(result.data.candidates.length).toBeGreaterThanOrEqual(1);
  });

  it('should get detail of a place', async () => {
    const placeId = 'ChIJrUQcQuuifDUR-IWAEQylVek';
    const details = await client.placeDetails({
      params: {
        place_id: placeId,
        key,
      },
      timeout: 1000,
    });

    expect(details.data.result.place_id).toBeDefined();
  });

  it('should get image', async () => {
    const photoreference =
      'AZose0mnmeAtlDxGkDTQwUItsIYovHstwsjPza5V93qohVcCC9Ie-zDOz4ryLV3_zDFRsdIHU3AQPVKlqIfWtyhAegI-LIR4Z2F04_1pW-EK3EooZzZxc9j30JXhhUq63fnPY33kQsNpjldmwjLjchbIkrUZ0kagljeVq0gil0B9gwWEOhaB';

    const photo = await client.placePhoto({
      params: {
        photoreference,
        maxheight: 1024,
        maxwidth: 1024,
        key,
      },
      responseType: 'arraybuffer',
    });

    expect(photo.data).toBeInstanceOf(Buffer);
  });

  it('should fine near-by places', async () => {
    const near = await client.placesNearby({
      params: {
        location: {
          lat: 37.5721418,
          lng: 126.9772436,
        },
        radius: 200,
        type: 'cafe',
        key,
      },
    });

    expect(near.data.results.length).toBeGreaterThanOrEqual(1);
  });
});

describe('GoogleMaps Testtest', () => {
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

  it.skip('Plz find city', async () => {
    const city = 'tokyo';

    const resp = await client.findPlaceFromText({
      params: {
        input: `${city}`,
        inputtype: PlaceInputType.textQuery,
        language: Language.ko,
        fields: ['geometry', 'name'],
        key,
      },
    });

    const cityLoc = resp.data.candidates[0].geometry.location;

    console.log(JSON.stringify(resp.data.candidates[0]));

    const lodgingResp = await client.placesNearby({
      params: {
        location: cityLoc,
        radius: 50000,
        language: Language.ko,
        type: AddressType.lodging,
        key,
      },
    });

    console.log(
      'ad;lkfjasl;kdfjal;dj',
      lodgingResp.data.results
        .map((i) => ({
          name: i.name,
          rating: i.rating,
          user: i.user_ratings_total,
        }))
        .sort((a, b) => (b.rating || 0) - (a.rating || 0)),
    );
  });

  it('WTF', async () => {
    const city = 'tokyo';

    const resp = await client.textSearch({
      params: {
        // query: `${city} tourist places`,
        query: `${city} lodging`,
        language: Language.ko,
        // region: region,
        location: {
          lat: 35.6761919,
          lng: 139.6503106,
        },
        key,
      },
    });

    console.log(resp);

    console.log(
      resp.data.results
        .map((i) => ({
          name: i.name,
          user: i.user_ratings_total,
          rating: i.rating,
        }))
        .sort((a, b) => (b.user || 0) - (a.user || 0)),
    );
  });
});
