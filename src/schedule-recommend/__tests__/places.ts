import { PlaceData } from '@googlemaps/google-maps-services-js';

export const places: Partial<PlaceData>[] = <Partial<PlaceData>[]>[
  {
    geometry: {
      location: {
        lat: 35.6803997,
        lng: 139.7690174,
      },
      viewport: {
        northeast: {
          lat: 35.81744534519053,
          lng: 139.918874338966,
        },
        southwest: {
          lat: 35.51904202902757,
          lng: 139.5628610838164,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/geocode-71.png',
    icon_background_color: '#7B9EB0',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
    name: '도쿄',
    photos: [
      {
        height: 1799,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/110543873949960736982">saleem zaid</a>',
        ],
        photo_reference:
          'AZose0k9fl1rTBRN97pBqa6cLjtjMHEDuv_Aj-c35PmvxwrXsBv9ofnvdhqDNeEbo67WcMTyAEDPRj91pVCckeH7GfHwWNBlNijNmq4BoO-HJrAiy6VFEJHdPQtP3jZtEa1xPV3jEJIvrrKem9Emro2DF7lHIUcPuRQoOu0gSDWp48uexlS4',
        width: 1080,
      },
    ],
    place_id: 'ChIJXSModoWLGGARILWiCfeu2M0',
    reference: 'ChIJXSModoWLGGARILWiCfeu2M0',
    scope: 'GOOGLE',
    types: ['colloquial_area', 'locality', 'political'],
    vicinity: '도쿄',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.68981,
        lng: 139.69619,
      },
      viewport: {
        northeast: {
          lat: 35.69114538029149,
          lng: 139.6976464802915,
        },
        southwest: {
          lat: 35.6884474197085,
          lng: 139.6949485197085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png',
    icon_background_color: '#909CE1',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet',
    name: '카도야 호텔',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 4912,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/111474847467765255149">かどやホテル</a>',
        ],
        photo_reference:
          'AZose0kj1LHu-ggMh8uSNo9cgwRFkPGdEuj7hZNAHDjH1V1Y0cFenh9_xKRxHpM3Ny6bE0PbzFEY8gM5sNQEFb45x688UJ6oQtCUeTqyBjY3XufULr27YIbOE2-zSmLvc0r_9rMLvoHX_Hmmaq2w4i_K_Eq_I21IN1HI4f0N5mMQk82sIUQ5',
        width: 7360,
      },
    ],
    place_id: 'ChIJl2Rt_tOMGGARSbquYusMyFw',
    plus_code: {
      compound_code: 'MMQW+WF 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMQW+WF',
    },
    rating: 3.8,
    reference: 'ChIJl2Rt_tOMGGARSbquYusMyFw',
    scope: 'GOOGLE',
    types: ['lodging', 'point_of_interest', 'establishment'],
    user_ratings_total: 693,
    vicinity: '1-chōme-23-1 Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.6858024,
        lng: 139.6905633,
      },
      viewport: {
        northeast: {
          lat: 35.6872844302915,
          lng: 139.6918680302915,
        },
        southwest: {
          lat: 35.6845864697085,
          lng: 139.6891700697085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png',
    icon_background_color: '#4B96F3',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet',
    name: 'ザ・コンランショップ 新宿本店',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 2160,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/104628469942189002880">heromichi</a>',
        ],
        photo_reference:
          'AZose0koF_tLKC1t2y7Rd7YX5b9TM1pGymKKBGSbHUFqGSusGUsy5XIeMu0EAoYZXXqHwTN8vUomTlQef50slnShG8gokVcjGiQfU2YwEf8AOYm1qZ-Dj3o2X1n06H1ebqF9aycMKA5MSNrx-_7hvHJNnkbM0AAgxbZvHz7HS2gdZ8QDjhuG',
        width: 2880,
      },
    ],
    place_id: 'ChIJeZd_LC3zGGARtrkHYeCaX3g',
    plus_code: {
      compound_code: 'MMPR+86 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMPR+86',
    },
    rating: 4.1,
    reference: 'ChIJeZd_LC3zGGARtrkHYeCaX3g',
    scope: 'GOOGLE',
    types: [
      'home_goods_store',
      'furniture_store',
      'store',
      'point_of_interest',
      'establishment',
    ],
    user_ratings_total: 218,
    vicinity:
      '新宿パークタワー3・4F, 3-chōme-7−１ Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.690456,
        lng: 139.694012,
      },
      viewport: {
        northeast: {
          lat: 35.69153943029151,
          lng: 139.6953109802915,
        },
        southwest: {
          lat: 35.68884146970851,
          lng: 139.6926130197085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: '올데이 다이닝 주린',
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 1367,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/106058114416464385004">オールデイ ダイニング 樹林</a>',
        ],
        photo_reference:
          'AZose0nTWRtFq2ftcw7vDMIB-iVbKjyekSwhecvyOU-kuGdjvSr2pk-us0zrQiNdIK1NYBc6Cz5h5m2kchRZWKmkownWvUSdTJsPg6_NbSEa-XIGx4sIU23M2HoTAw_bgXcsOlgwhPXfJsK9HfrGdI6TaL1IADBHvndDNwyCZ5zIoO60kcfd',
        width: 2048,
      },
    ],
    place_id: 'ChIJE2tqZtSMGGARt24OI2Lv-MA',
    plus_code: {
      compound_code: 'MMRV+5J 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMRV+5J',
    },
    price_level: 3,
    rating: 4.1,
    reference: 'ChIJE2tqZtSMGGARt24OI2Lv-MA',
    scope: 'GOOGLE',
    types: [
      'restaurant',
      'meal_takeaway',
      'cafe',
      'food',
      'point_of_interest',
      'establishment',
    ],
    user_ratings_total: 867,
    vicinity:
      'Keio Plaza Hotel, 本館2階, 2-chōme-2−１ Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.6869211,
        lng: 139.6933196,
      },
      viewport: {
        northeast: {
          lat: 35.6882700802915,
          lng: 139.6946685802915,
        },
        southwest: {
          lat: 35.6855721197085,
          lng: 139.6919706197085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png',
    icon_background_color: '#909CE1',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet',
    name: '신주쿠 워싱턴 호텔',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 3840,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/117299521569385846536">ワシントンホテル 本館</a>',
        ],
        photo_reference:
          'AZose0mbzrCk2JrVdxIEizzEZgJm2solG4oweq1jZP1fd7ZmNTTVicg3wTgv5nvC4mRP46qUUw0ZBFUhSzcvFcDf_nyRVzHz_Vqp4POn8t_PO7Qg9ovwXqPLQPbzo9MsiEyPR3jyiELBx0AdSjawIzxfdhAnU3iFBubbm--6bhpFrv8IZAuq',
        width: 5760,
      },
    ],
    place_id: 'ChIJ85hbBNOMGGARYgvauINiX18',
    plus_code: {
      compound_code: 'MMPV+Q8 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMPV+Q8',
    },
    rating: 3.8,
    reference: 'ChIJ85hbBNOMGGARYgvauINiX18',
    scope: 'GOOGLE',
    types: ['lodging', 'point_of_interest', 'establishment'],
    user_ratings_total: 7270,
    vicinity: '3-chōme-2-9 Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.6902759,
        lng: 139.6958439,
      },
      viewport: {
        northeast: {
          lat: 35.6914876302915,
          lng: 139.6972271302915,
        },
        southwest: {
          lat: 35.68878966970851,
          lng: 139.6945291697085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: "Y's Buffet restaurant",
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 3024,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/113164865626122576603">ワイズ キャフェテリア エステック情報ビル 店 (新宿)</a>',
        ],
        photo_reference:
          'AZose0kaVY0i819UjsrNYsxiorBwIo-y9cGjYWWbIJFlAqietWBxvqoNvi-T8npj1GNpnhf59ocgOMZCPIB-vJkO8_8YyLzinu76wa7C59VT-RvRuNqc6Lcqagx8QRtA6KBzcPWr_HhHdLDGXA6dyB60koWYsw1AwJQcrvAddZt83o5bpQa-',
        width: 4032,
      },
    ],
    place_id: 'ChIJ2yXsBNSMGGARtNM0cPYyQzw',
    plus_code: {
      compound_code: 'MMRW+48 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMRW+48',
    },
    price_level: 1,
    rating: 3.6,
    reference: 'ChIJ2yXsBNSMGGARtNM0cPYyQzw',
    scope: 'GOOGLE',
    types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 145,
    vicinity:
      'S-tec Information Building, 4階, 1-chōme-24−１ Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.6854269,
        lng: 139.6908388,
      },
      viewport: {
        northeast: {
          lat: 35.6871006802915,
          lng: 139.6920240802915,
        },
        southwest: {
          lat: 35.6844027197085,
          lng: 139.6893261197085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png',
    icon_background_color: '#909CE1',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet',
    name: '파크 하얏트 도쿄',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 1665,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/109537818637335574465">Park Hyatt Tokyo</a>',
        ],
        photo_reference:
          'AZose0mcWBZfgmsApwKBUdnN_Q9d9APfruMPA43y-1HeK2UytOPioqgg1Y6xX5QefC_jO5PUhsB6c_zjQ_IW_K1K2xNPOh6Ma9mpJ52KWkxxbvDb1OiDksLUdvd7o_DFIhZZ5-g_E4g2_zp5lRJhAKKQPIBXYZH_pHcuXmx_F6T3XZ4p-VmX',
        width: 2496,
      },
    ],
    place_id: 'ChIJJ7La1yzzGGARln2OypSj2Cw',
    plus_code: {
      compound_code: 'MMPR+58 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMPR+58',
    },
    rating: 4.5,
    reference: 'ChIJJ7La1yzzGGARln2OypSj2Cw',
    scope: 'GOOGLE',
    types: ['lodging', 'point_of_interest', 'establishment'],
    user_ratings_total: 4064,
    vicinity: '3-chōme-7-1 Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.6868361,
        lng: 139.6960712,
      },
      viewport: {
        northeast: {
          lat: 35.6881849302915,
          lng: 139.6974184802915,
        },
        southwest: {
          lat: 35.6854869697085,
          lng: 139.6947205197085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: 'Araumi',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 2268,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/106819444371643103166">Ya Ta</a>',
        ],
        photo_reference:
          'AZose0kp53kPsIXrNP8D3BJfzDvFQvaQDYWuSZMkVmd-hu_doy1xoAy7JLvQk09alznRbwBp6_fm4zjEr-euC1bC5rN_S3EAPqGpwDkdzsH6qYubRY5pF8V-xrCw_PB79qHjMTs6zx7-OQLXzaOrg3Cta-Kx9fuv1M3XsDSeiXZeRjKk4RNU',
        width: 4032,
      },
    ],
    place_id: 'ChIJCflEIdKMGGARjz5PvIkQEUQ',
    plus_code: {
      compound_code: 'MMPW+PC 일본 도쿄도 시부야구',
      global_code: '8Q7XMMPW+PC',
    },
    rating: 3.4,
    reference: 'ChIJCflEIdKMGGARjz5PvIkQEUQ',
    scope: 'GOOGLE',
    types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 497,
    vicinity: '2-chōme-16-9 Yoyogi, Shibuya City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.6872655,
        lng: 139.6975002,
      },
      viewport: {
        northeast: {
          lat: 35.6886726802915,
          lng: 139.6988045302915,
        },
        southwest: {
          lat: 35.6859747197085,
          lng: 139.6961065697085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
    icon_background_color: '#7B9EB0',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
    name: 'ヘアーカウニス(hair Kaunis)',
    photos: [
      {
        height: 500,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/113499078622424815861">アイリ ヘアー(IRIE HAIR)</a>',
        ],
        photo_reference:
          'AZose0nn4d8NOTkaTWjlqfJG6Ml4jmFKmUmXFTKQYLeUhQcuN6M9SQwp4ubzbFiN3aWAC6IBelqLIjpTiAkikL4xBk3N-G533RNJBfxvDQ9K306yMKxlJUDU7Cd8UjfmFec0qDFvGPmiALLEjIy25_k27tYy3ItS5M1kykix9YK2jKh0J8_-',
        width: 666,
      },
    ],
    place_id: 'ChIJS_BTadGMGGARYUmTLhcR4qU',
    plus_code: {
      compound_code: 'MMPX+W2 일본 도쿄도 시부야구',
      global_code: '8Q7XMMPX+W2',
    },
    rating: 4.3,
    reference: 'ChIJS_BTadGMGGARYUmTLhcR4qU',
    scope: 'GOOGLE',
    types: ['hair_care', 'point_of_interest', 'establishment'],
    user_ratings_total: 12,
    vicinity: '羽田ビル ２０２, 2-chōme-5−１ Yoyogi, Shibuya City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.6886299,
        lng: 139.6983116,
      },
      viewport: {
        northeast: {
          lat: 35.6899699302915,
          lng: 139.6997083302915,
        },
        southwest: {
          lat: 35.6872719697085,
          lng: 139.6970103697085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
    icon_background_color: '#7B9EB0',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
    name: 'アイフル 新宿南口甲州街道店 無人契約コーナー',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 497,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/102343659838654551428">アイフル 新宿南口甲州街道店 無人契約コーナー</a>',
        ],
        photo_reference:
          'AZose0lyB8UTn8kTZGsDcAgKhj5rZrB_2WW_7VMrWfY4n8_XfQFP78GmU3U1Z2ekbye6u3KF-2w_QE3UtnLY3VU1kvIWNN02i_nhNZxYv8981NXBNLxtbwI9qrooPtFViuKJ0wntCEa1Wp95YbZe5l3ES6362uyg8epoQ-lZrwv0G3ZBokwu',
        width: 885,
      },
    ],
    place_id: 'ChIJ10JAl9GMGGARYAUZ3XM145Q',
    plus_code: {
      compound_code: 'MMQX+F8 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMQX+F8',
    },
    rating: 3,
    reference: 'ChIJ10JAl9GMGGARYAUZ3XM145Q',
    scope: 'GOOGLE',
    types: ['finance', 'point_of_interest', 'establishment'],
    user_ratings_total: 1,
    vicinity: '山兼新宿ビル５Ｆ, 1-chōme-18−６ Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.6896981,
        lng: 139.6965618,
      },
      viewport: {
        northeast: {
          lat: 35.69107093029151,
          lng: 139.6980040302915,
        },
        southwest: {
          lat: 35.68837296970851,
          lng: 139.6953060697085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/cafe_pinlet',
    name: '프론토 니시신주쿠',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 3024,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/106986579069823166050">S T</a>',
        ],
        photo_reference:
          'AZose0mJrhIn1McYmtjXTG8Q5aWOZAPBh7baAh271KlgGGsIeT5fTf0f7ybhEjiVAv_xWMivCCNkyZYz4qUuX0rPM-2nnY4KJMra4B_dtymOmw-eutWv5A3nj_692beNWjhAGh61BmXc4GadK6xPTrFympHpB9XSNVCgWVeVsPnefjF_enGU',
        width: 4032,
      },
    ],
    place_id: 'ChIJKaP2UNGMGGARgKAoClztbmk',
    plus_code: {
      compound_code: 'MMQW+VJ 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMQW+VJ',
    },
    price_level: 2,
    rating: 3.5,
    reference: 'ChIJKaP2UNGMGGARgKAoClztbmk',
    scope: 'GOOGLE',
    types: ['cafe', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 631,
    vicinity:
      'Nishi-Shinjuku Showa Building, 1F, 1-chōme-13−１２ Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.6857715,
        lng: 139.6910577,
      },
      viewport: {
        northeast: {
          lat: 35.68729088029151,
          lng: 139.6921728802915,
        },
        southwest: {
          lat: 35.68459291970851,
          lng: 139.6894749197085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
    icon_background_color: '#7B9EB0',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
    name: 'Club On The Park',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 4332,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/102309058196805431215">Canopus 91</a>',
        ],
        photo_reference:
          'AZose0nqteKpcgbwAKB2rHhK4tdZp4O2zfzoz3zx--6-87pvuVzQHiibBb3a9OC8fRcSBJjWfohbZ_S_rz2RnHl72w8I7d2wcysAeCUp4krafB549r7Bp2VCAazylelKkUexWdKkvcoCVnDAKy-OTSIIyztnsLRJYEbdNUvGpFk7oAmLsPB4',
        width: 3378,
      },
    ],
    place_id: 'ChIJVcSZLi3zGGAR_iTEQSH30qE',
    plus_code: {
      compound_code: 'MMPR+8C 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMPR+8C',
    },
    rating: 4.5,
    reference: 'ChIJVcSZLi3zGGAR_iTEQSH30qE',
    scope: 'GOOGLE',
    types: ['spa', 'point_of_interest', 'establishment'],
    user_ratings_total: 27,
    vicinity: 'Park Hyatt Tokyo, 3-chōme-7-1-2 Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.6900856,
        lng: 139.6943105,
      },
      viewport: {
        northeast: {
          lat: 35.6913542302915,
          lng: 139.6954602302915,
        },
        southwest: {
          lat: 35.6886562697085,
          lng: 139.6927622697085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/cafe_pinlet',
    name: 'Art Lounge Duet',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 1365,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/117340680269609370245">アートラウンジ デュエット</a>',
        ],
        photo_reference:
          'AZose0kM74GKLLTJvWekAZWbbq_0zLLFFRVSfH5mJBpqCfmN3USbL8EaXkaqnoe3Ud1YT90A3n46BIk4X-1xhkdefHPnmLPL0NjwonzMt3p3mq3MWjL2Pr0isoeJqWMaDvmEVmVX7unV0bXaFl2GnAXn_mMerYxgz2_sKF0x7E0jwGcpWqFu',
        width: 2048,
      },
    ],
    place_id: 'ChIJ4WIcdNSMGGARTrVIbeD_7LI',
    plus_code: {
      compound_code: 'MMRV+2P 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMRV+2P',
    },
    price_level: 3,
    rating: 3.9,
    reference: 'ChIJ4WIcdNSMGGARTrVIbeD_7LI',
    scope: 'GOOGLE',
    types: [
      'cafe',
      'night_club',
      'bar',
      'store',
      'food',
      'point_of_interest',
      'establishment',
    ],
    user_ratings_total: 174,
    vicinity:
      '京王プラザホテル 本館 3階, 2-chōme-2−１ Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.68798409999999,
        lng: 139.6935305,
      },
      viewport: {
        northeast: {
          lat: 35.68924533029149,
          lng: 139.6946420802915,
        },
        southwest: {
          lat: 35.68654736970849,
          lng: 139.6919441197085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: 'Higashiyama Shinjuku Main Store',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 1280,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/111057484673161422262">個室和食 東山 新宿本店</a>',
        ],
        photo_reference:
          'AZose0lVV_cmYTHUjDlHdv7-ScCxZ45nxXfmIxKAw6QKVlNnpXtR1IQS1i-fJdRQgwc_1WYBzlyViiGMejzywTZlX6QIHZkNj5d3OCdxQiu1W4Go77VBBwbQp1AKgNvnMPDhLutJPc_QJ8pYmm57KoI1AELtJ39vv47cUV7sHoYLe3IPUBsG',
        width: 1280,
      },
    ],
    place_id: 'ChIJR4sOntOMGGARoWOvHsUP_L0',
    plus_code: {
      compound_code: 'MMQV+5C 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMQV+5C',
    },
    price_level: 3,
    rating: 4.1,
    reference: 'ChIJR4sOntOMGGARoWOvHsUP_L0',
    scope: 'GOOGLE',
    types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 327,
    vicinity:
      'Shinjuku NS Building, 29階, 2-chōme-4−１ Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.6897753,
        lng: 139.6971402,
      },
      viewport: {
        northeast: {
          lat: 35.6911230802915,
          lng: 139.6984285802915,
        },
        southwest: {
          lat: 35.6884251197085,
          lng: 139.6957306197085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
    icon_background_color: '#7B9EB0',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
    name: 'mahaloa lani',
    opening_hours: {
      open_now: true,
    },
    place_id: 'ChIJn7rDRdGMGGARIsqKw944Tb4',
    plus_code: {
      compound_code: 'MMQW+WV 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMQW+WV',
    },
    rating: 3.6,
    reference: 'ChIJn7rDRdGMGGARIsqKw944Tb4',
    scope: 'GOOGLE',
    types: ['hair_care', 'point_of_interest', 'establishment'],
    user_ratings_total: 5,
    vicinity: '田畑ビル, ４F, 1-chōme-12−９ Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.6898654,
        lng: 139.6971447,
      },
      viewport: {
        northeast: {
          lat: 35.69122728029149,
          lng: 139.6984275802915,
        },
        southwest: {
          lat: 35.68852931970849,
          lng: 139.6957296197085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: 'Watanabe Soba',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 4032,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/114383447242133077886">pei tanaka</a>',
        ],
        photo_reference:
          'AZose0l0vhC8G2nkusUa1w1GVVmsMyItTEJnNsdzsEUzNehtvDA27dFu5R8i9uZDWD9uDsElWACWI6ZqZZ6U8eY5Ct_a4qrM3Pi-qb3xqWab7zpEy_UnH2s4vbkSm5KD2ecoIY8woVi1BMpmKo6kBPvRKOCwli54OCv7Bom7dBMNLb4OwolD',
        width: 3024,
      },
    ],
    place_id: 'ChIJ2xj2RdGMGGARNAfVn_4178Y',
    plus_code: {
      compound_code: 'MMQW+WV 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMQW+WV',
    },
    price_level: 2,
    rating: 4,
    reference: 'ChIJ2xj2RdGMGGARNAfVn_4178Y',
    scope: 'GOOGLE',
    types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 627,
    vicinity: '八洋ビル, 1-chōme-12−１０ Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.6897582,
        lng: 139.6943055,
      },
      viewport: {
        northeast: {
          lat: 35.6911962802915,
          lng: 139.6954577302915,
        },
        southwest: {
          lat: 35.6884983197085,
          lng: 139.6927597697085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: 'Duo Fourchettes',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 1370,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/104687235377008736661">デュオ フルシェット</a>',
        ],
        photo_reference:
          'AZose0nshSuPd5n5Ml95BHHdV9yPHpdxp3lkXPrYM7IKeLOPDQxJqbP-zD70IVONc5_YhPm-u4B2TLBiNrZ-BW1Z1ZoazIUHA6P6rOfOwNnK1DftZ-0IcIeoxsfZa3w9bRStPh8duo_Ndx-5wkqO4mokfnNHGYKOAJ3ES7Z6hlQi8O6pmcvx',
        width: 2048,
      },
    ],
    place_id: 'ChIJE2tqZtSMGGARXWmtD5CPZwY',
    plus_code: {
      compound_code: 'MMQV+WP 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMQV+WP',
    },
    price_level: 3,
    rating: 4.1,
    reference: 'ChIJE2tqZtSMGGARXWmtD5CPZwY',
    scope: 'GOOGLE',
    types: [
      'meal_takeaway',
      'restaurant',
      'food',
      'point_of_interest',
      'establishment',
    ],
    user_ratings_total: 92,
    vicinity: '京王プラザホテル内, 2-chōme-2−１ Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.6909101,
        lng: 139.6912738,
      },
      viewport: {
        northeast: {
          lat: 35.69214608029149,
          lng: 139.6927830802915,
        },
        southwest: {
          lat: 35.68944811970849,
          lng: 139.6900851197085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png',
    icon_background_color: '#909CE1',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet',
    name: '하얏트 리젠시 도쿄',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 4032,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/105307404899194283596">fukuro ike</a>',
        ],
        photo_reference:
          'AZose0na6ZSic1BK6b-6N65VXaLw70JMtywdIcecQ9_J4RpJzvgOegbExasqDekP-v8QtFhkMoCRqwPebwrzX1mob9rA-QSizBAg9xIfZdUCUIUURd5TMNQtJeKy6aVUR_jhTeXHu3bH7XUIdPqBwNJulScmRMi6Y8t-AkOXOF33jfgcWrPp',
        width: 3024,
      },
    ],
    place_id: 'ChIJR3s9zSrzGGARck5SsvgMA6Q',
    plus_code: {
      compound_code: 'MMRR+9G 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMRR+9G',
    },
    rating: 4.2,
    reference: 'ChIJR3s9zSrzGGARck5SsvgMA6Q',
    scope: 'GOOGLE',
    types: ['lodging', 'point_of_interest', 'establishment'],
    user_ratings_total: 5350,
    vicinity: '2-chōme-7-2 Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.6908535,
        lng: 139.6912172,
      },
      viewport: {
        northeast: {
          lat: 35.6923250802915,
          lng: 139.6929145802915,
        },
        southwest: {
          lat: 35.6896271197085,
          lng: 139.6902166197085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: 'Jade Garden',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 336,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/108285947907022346614">中国料理「翡翠宮」</a>',
        ],
        photo_reference:
          'AZose0nZ_aLTfp_4U8RdYpmpSsShEyvdwZQougQeb5qJSZleSZVsl-RyaB3izrsoe-OtVJcOrB0rFwWoDHbH2xOOXVJSGdykpcokXEH8cPmP3zjaySIGbVK3YFvByXnu1oLdofR3JaP1pWDPjRdl9MsLhv1tZr-WzZS4xt3rxbTr5T7lgns',
        width: 448,
      },
    ],
    place_id: 'ChIJR3s9zSrzGGARp32UICZCSTM',
    plus_code: {
      compound_code: 'MMRR+8F 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMRR+8F',
    },
    rating: 4.4,
    reference: 'ChIJR3s9zSrzGGARp32UICZCSTM',
    scope: 'GOOGLE',
    types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 203,
    vicinity: '2-chōme-7-2 Nishishinjuku, Shinjuku City',
  },
  {
    geometry: {
      location: {
        lat: 35.6938253,
        lng: 139.7033559,
      },
      viewport: {
        northeast: {
          lat: 35.72989945846674,
          lng: 139.745138558259,
        },
        southwest: {
          lat: 35.67327798164246,
          lng: 139.6732557771647,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/geocode-71.png',
    icon_background_color: '#7B9EB0',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
    name: '신주쿠구',
    photos: [
      {
        height: 3024,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/101685427424017274933">Damjan Cvetkov-Dimitrov</a>',
        ],
        photo_reference:
          'AZose0lOzTo8ji8WJwUQ9mpJIha7ACNGA1T3NaMpwHJ1Yl8fn063ueANe4IHFN26VXxRBpqpGl-TyCXc02YtnXt79KNozA0paWgCZZ0gmGt-QldTulBvUlT5IqHhmH2MczorRqTsM7gQSo9vky3fnB37gicQza5M2FgFGdn9nObH_M674k8e',
        width: 4032,
      },
    ],
    place_id: 'ChIJS_23WSCNGGAR0u8y4o_GYew',
    reference: 'ChIJS_23WSCNGGAR0u8y4o_GYew',
    scope: 'GOOGLE',
    types: ['locality', 'political'],
    vicinity: '신주쿠구',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.6880367,
        lng: 139.6935125,
      },
      viewport: {
        northeast: {
          lat: 35.6898364802915,
          lng: 139.6947215802915,
        },
        southwest: {
          lat: 35.6871385197085,
          lng: 139.6920236197085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: 'CoCo Ichibanya',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 960,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/115862629829929880484">Alberto Gozzelino</a>',
        ],
        photo_reference:
          'AZose0kSrBkulgIvD9FG_2TjMV8_AOHfYsrnu1Q4yZBnkP9RcbW8eukVR7cFhCCDm9lGnj3QL25hglcF21Zu5YeUHtJyqmaKM0_essJBCfHIEuQAxhALHL-X4_0IkZ2-3pmNvW-29YatByXWwERBBhctj1rgSmJHSGqKzB2wxtcno3tnt9RD',
        width: 1280,
      },
    ],
    place_id: 'ChIJXQ4NntOMGGARptLUPdFxbEw',
    plus_code: {
      compound_code: 'MMQV+6C 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMQV+6C',
    },
    price_level: 2,
    rating: 4,
    reference: 'ChIJXQ4NntOMGGARptLUPdFxbEw',
    scope: 'GOOGLE',
    types: ['restaurant', 'point_of_interest', 'food', 'establishment'],
    user_ratings_total: 346,
    vicinity: 'Shinjuku NS Building, 2-chōme-4-1 Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.6888489,
        lng: 139.6978162,
      },
      viewport: {
        northeast: {
          lat: 35.69018413029149,
          lng: 139.6991730302915,
        },
        southwest: {
          lat: 35.6874861697085,
          lng: 139.6964750697085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: 'Chinmaya Nishi-Shinjuku',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 2304,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/115365209007991200015">ぴぴねこ</a>',
        ],
        photo_reference:
          'AZose0nek5zjI3yBy3XyA4MqIL0aa_OuTopPafsHQXeH025nfyw4rtCR4xRS_7vbMDdMl3LNA8ghVwTtFymZP3nXizMaeGx9vUhI1aYuF4Pq27wEgFzVUjW2XSx2sibf_60lHqErdoo69UHS2SXxWmXhjF29yCel3ajlmEDAQG2YtXrrk26U',
        width: 4096,
      },
    ],
    place_id: 'ChIJDc3vZ9GMGGARWi3OJ1OT160',
    plus_code: {
      compound_code: 'MMQX+G4 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMQX+G4',
    },
    price_level: 1,
    rating: 3.6,
    reference: 'ChIJDc3vZ9GMGGARWi3OJ1OT160',
    scope: 'GOOGLE',
    types: ['restaurant', 'point_of_interest', 'food', 'establishment'],
    user_ratings_total: 582,
    vicinity: '菊水ビル1階, 1-chōme-16−５ Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.6869211,
        lng: 139.6933196,
      },
      viewport: {
        northeast: {
          lat: 35.6882700802915,
          lng: 139.6946685802915,
        },
        southwest: {
          lat: 35.6855721197085,
          lng: 139.6919706197085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
    icon_background_color: '#7B9EB0',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
    name: '東京 新宿 結婚式場│ウエストシティホール＆ウエディングアイ',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 320,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/110859867977088896351">ウエストシティホール&amp;ウエディング アイ【東京 新宿 ホテルウエディング 1.5次会 会費制 2次会 会議 セミナー】</a>',
        ],
        photo_reference:
          'AZose0nMUWft1xAi2qq_AUW4yb_oewG5eRKR-UmbsRi1kYSzBjlQklA4VTS2s_KEoyqkJQPFmXBIpQXn9CYKsjAbOdUtXl6VmSQ0xBd-EXnmIkJurLWuhv9b8de5bJqY3VuI_HyAJZMHHYDi62H_yGbXZmydx75BKwvKQT3gRJy0st8Q1ttI',
        width: 480,
      },
    ],
    place_id: 'ChIJc1KJBNOMGGARvnXg9A3neSo',
    plus_code: {
      compound_code: 'MMPV+Q8 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMPV+Q8',
    },
    rating: 4,
    reference: 'ChIJc1KJBNOMGGARvnXg9A3neSo',
    scope: 'GOOGLE',
    types: ['lodging', 'point_of_interest', 'establishment'],
    user_ratings_total: 16,
    vicinity:
      '新宿ワシントンホテル地下 一階, 3-chōme-2−９ Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.6889145,
        lng: 139.6977969,
      },
      viewport: {
        northeast: {
          lat: 35.6902123802915,
          lng: 139.6991751302915,
        },
        southwest: {
          lat: 35.6875144197085,
          lng: 139.6964771697085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: 'Negishi Kikusui Building',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 4032,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/104246949568074196913">Lam Mandy</a>',
        ],
        photo_reference:
          'AZose0k5W1H4wr1VjVlvIugqwOLV03Sn7Xf4ciPZTr_JkCgN9gSRFPhHEfCETMffbJ0QJQwkl4rEU3EQuWQCSG__XNVvEe55-zJMR8sGLil5Hr42xU3tsEAceQis__jYp3RbiGEl7sW2x7EThBCpR4vdmMeqcDNHpowzv02eFrH4V_DXfCR5',
        width: 3024,
      },
    ],
    place_id: 'ChIJYSroDdGMGGARDu-833Aj-0A',
    plus_code: {
      compound_code: 'MMQX+H4 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMQX+H4',
    },
    price_level: 2,
    rating: 3.9,
    reference: 'ChIJYSroDdGMGGARDu-833Aj-0A',
    scope: 'GOOGLE',
    types: ['restaurant', 'point_of_interest', 'food', 'establishment'],
    user_ratings_total: 556,
    vicinity: '菊水ビル 2F, 1-chōme-16−５ Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.6895595,
        lng: 139.6933003,
      },
      viewport: {
        northeast: {
          lat: 35.6909378302915,
          lng: 139.6948326802915,
        },
        southwest: {
          lat: 35.6882398697085,
          lng: 139.6921347197085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: 'Koga',
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 2448,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/107549238237340996255">くわねまるち（kwn）</a>',
        ],
        photo_reference:
          'AZose0lyBh7neXff2UB2pfNFkPt6KbFMNRDtAbA-hlg8U6oMqLsL2K7ObMhq6zryjess1z2kJf2Wl4g3kPfZ4HyI2lLPGtRw3tRtTCQVUurlY9bsSJt8ub4vQ40m0GYEvxG6Hj_Ccmz3XLHRAh9fllwimmQEmWXssszp2W0M7aLNdSL3cjnR',
        width: 3264,
      },
    ],
    place_id: 'ChIJoTcat9SMGGARuCAumMg0tMI',
    plus_code: {
      compound_code: 'MMQV+R8 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMQV+R8',
    },
    rating: 3.6,
    reference: 'ChIJoTcat9SMGGARuCAumMg0tMI',
    scope: 'GOOGLE',
    types: ['restaurant', 'point_of_interest', 'food', 'establishment'],
    user_ratings_total: 34,
    vicinity: '2-chōme-8-8-1 Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.68948229999999,
        lng: 139.6965801,
      },
      viewport: {
        northeast: {
          lat: 35.69081103029149,
          lng: 139.6978534302915,
        },
        southwest: {
          lat: 35.6881130697085,
          lng: 139.6951554697085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: 'Hinoya Curry',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 2448,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/116209971521857609656">cafeすけ</a>',
        ],
        photo_reference:
          'AZose0lpQ5bQXDB6qqBUUoVh4rwtnVTRLv3Ar7GbnXq_UrZFG-Bs4A-wf_S7I6MJ41TwqIFmDgrGkRCQtKMRc4gpKLoz-g9FKFLRr1_QYHMTDbYrKCstEEmPGB2efpe0QNwgWDVz6FWMvO275u56QqPqHafhW8XlzdiXqBlDXltbBpKly429',
        width: 3264,
      },
    ],
    place_id: 'ChIJVVXOW9GMGGARzJ3xnMJyAXY',
    plus_code: {
      compound_code: 'MMQW+QJ 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMQW+QJ',
    },
    price_level: 2,
    rating: 3.7,
    reference: 'ChIJVVXOW9GMGGARzJ3xnMJyAXY',
    scope: 'GOOGLE',
    types: ['restaurant', 'point_of_interest', 'food', 'establishment'],
    user_ratings_total: 385,
    vicinity: '大和家ビル 1F, 1-chōme-13−７ Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.6881076,
        lng: 139.6935704,
      },
      viewport: {
        northeast: {
          lat: 35.6898719302915,
          lng: 139.6947505302915,
        },
        southwest: {
          lat: 35.6871739697085,
          lng: 139.6920525697085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: 'ごだいご 新宿NSビル店',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 720,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/100757266865595481061">ごだいご新宿NSビル店</a>',
        ],
        photo_reference:
          'AZose0n5HFf_wNpH98HdAR4I8SvQ6pOnUXB8Jgxbn3j-oYrgyrkQPQ-_KDLm-mqNt7fy-6di5-Xt0-zB1upqEE-xuPF-0EIp3g8tXhtKRx4NL5D3zf2bZYihc69GI25ufgICVN9HF2sPpQ7nPJafnO_PwOMQt55xuZk1cnD0iyuY2lfPAORF',
        width: 900,
      },
    ],
    place_id: 'ChIJXQ4NntOMGGAR6KWamA18A-o',
    plus_code: {
      compound_code: 'MMQV+6C 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMQV+6C',
    },
    price_level: 2,
    rating: 3.9,
    reference: 'ChIJXQ4NntOMGGAR6KWamA18A-o',
    scope: 'GOOGLE',
    types: ['restaurant', 'point_of_interest', 'food', 'establishment'],
    user_ratings_total: 329,
    vicinity: '新宿 NS ビル ２９F, 2-chōme-4−１ Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.6870282,
        lng: 139.6988425,
      },
      viewport: {
        northeast: {
          lat: 35.68845968029149,
          lng: 139.7005208802915,
        },
        southwest: {
          lat: 35.68576171970849,
          lng: 139.6978229197085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png',
    icon_background_color: '#909CE1',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet',
    name: '호텔 선루트 플라자 신주쿠',
    photos: [
      {
        height: 4928,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/102312346733017568594">ホテルサンルートプラザ新宿</a>',
        ],
        photo_reference:
          'AZose0lNu-QW1u3Ogsc3_uaGQjI5DJwpqXRppxRZkcE9o8gAKMHwgeMGYZAnBIGGJXACtvAN18o6GNfWZ8icm0-kSz05Jq-0RsUE2j6uy7vbV9jfBLvPK3y8VbooXJuec4xML8SQS2rGcCv4WLPc2nlyRjOxrVZwGi7WR9b1BP7fhvu2DtTb',
        width: 3280,
      },
    ],
    place_id: 'ChIJNe9mqeOLGGARV5mPNz_El_A',
    plus_code: {
      compound_code: 'MMPX+RG 일본 도쿄도 시부야구',
      global_code: '8Q7XMMPX+RG',
    },
    rating: 4.1,
    reference: 'ChIJNe9mqeOLGGARV5mPNz_El_A',
    scope: 'GOOGLE',
    types: ['lodging', 'point_of_interest', 'establishment'],
    user_ratings_total: 3375,
    vicinity: '2-chōme-3-1 Yoyogi, Shibuya City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.6889645,
        lng: 139.6986438,
      },
      viewport: {
        northeast: {
          lat: 35.69024983029149,
          lng: 139.6998252302915,
        },
        southwest: {
          lat: 35.6875518697085,
          lng: 139.6971272697085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: 'Shabu Shabu Izakaya Sinjuku Kishuuya',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 2832,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/103433547230198614591">紀州屋</a>',
        ],
        photo_reference:
          'AZose0lHljNyzObK9AUeeeTDOW9Ard-Y9j0LZxsSjkj5BAtUReFfH-VqTS9TdAFhxidET_TjqSxRq5cEFvuInGGuEQbeSgzfF858ePnolsPEyAu7YYDzHmZYRQbbZ4s3Z09XeLFHpaBYYK4FXI0yprMc9rK9DMTqVLEtG7YnAAI6zME5QGYG',
        width: 4256,
      },
    ],
    place_id: 'ChIJp901AdGMGGARtqUv7UcdipY',
    plus_code: {
      compound_code: 'MMQX+HF 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMQX+HF',
    },
    price_level: 2,
    rating: 3.9,
    reference: 'ChIJp901AdGMGGARtqUv7UcdipY',
    scope: 'GOOGLE',
    types: ['restaurant', 'point_of_interest', 'food', 'establishment'],
    user_ratings_total: 221,
    vicinity: '紀州屋, 1-chōme-18−１ Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.688056,
        lng: 139.6984366,
      },
      viewport: {
        northeast: {
          lat: 35.68935468029149,
          lng: 139.6998496802915,
        },
        southwest: {
          lat: 35.68665671970849,
          lng: 139.6971517197085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/cafe_pinlet',
    name: 'Doutor',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 768,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/100287400955167917483">Vinay Kumar Patel</a>',
        ],
        photo_reference:
          'AZose0kZ_V0nNl4IrPGn-GVxAJ43FUtaWp2wds5fjgCxoiQKAJtppQ_QdTGzf71Gg4oAz0z-0sAQDatX9yi8gstIDXivYGydNOz-8dh1q4FUkVT57RNqF2c4HKqYF9Yois5rLPOph448fKSjOMfnGNa4r1IbHC0caB7HRDVs-JwYYvm5mOXY',
        width: 1079,
      },
    ],
    place_id: 'ChIJp_RBrtGMGGAR-W26EM4emDU',
    plus_code: {
      compound_code: 'MMQX+69 일본 도쿄도 시부야구',
      global_code: '8Q7XMMQX+69',
    },
    price_level: 1,
    rating: 3.3,
    reference: 'ChIJp_RBrtGMGGAR-W26EM4emDU',
    scope: 'GOOGLE',
    types: ['cafe', 'point_of_interest', 'food', 'establishment'],
    user_ratings_total: 537,
    vicinity: '新宿サンセイビル １Ｆ, 2-chōme-10−１ Yoyogi, Shibuya City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.687627,
        lng: 139.6983662,
      },
      viewport: {
        northeast: {
          lat: 35.68906133029149,
          lng: 139.6997331802915,
        },
        southwest: {
          lat: 35.6863633697085,
          lng: 139.6970352197085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png',
    icon_background_color: '#909CE1',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet',
    name: 'JR Kyushu Hotel Blossom Shinjuku',
    photos: [
      {
        height: 3266,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/113095928105158063724">JR九州ホテル ブラッサム新宿</a>',
        ],
        photo_reference:
          'AZose0liZQJSrFIhF9dna8zS14qst2GM6-abrEzLJjoAu2zZ5Xwr5P02bEgBK8tW9ykndanHAJVQsGfPOUGCxu_0yKxRu-v4ejFwiU7-MNxeMeFIotwVHuUo9C_wtRP_jNpxA427lrmHQJGSnTyOBUmt8znLlWW_oSECJlKafvZn7KrT8-CX',
        width: 4898,
      },
    ],
    place_id: 'ChIJh7zrtdGMGGARK2IbCPWPqnU',
    plus_code: {
      compound_code: 'MMQX+38 일본 도쿄도 시부야구',
      global_code: '8Q7XMMQX+38',
    },
    rating: 4.3,
    reference: 'ChIJh7zrtdGMGGARK2IbCPWPqnU',
    scope: 'GOOGLE',
    types: ['lodging', 'point_of_interest', 'establishment'],
    user_ratings_total: 1364,
    vicinity: '2-chōme-6-2 Yoyogi, Shibuya City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.6869787,
        lng: 139.6972801,
      },
      viewport: {
        northeast: {
          lat: 35.6884634802915,
          lng: 139.6985633802915,
        },
        southwest: {
          lat: 35.6857655197085,
          lng: 139.6958654197085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
    icon_background_color: '#7B9EB0',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
    name: 'Zenrosai Hall / Space zero',
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 3024,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/104662617902606566633">Sadaaki Yokotsuka</a>',
        ],
        photo_reference:
          'AZose0nKCrf0lbUW4CcCRWw_hb18E9cuTXO1qon7jXCg7-qPr3a0SjLGjQmR2V0Z_yXnEy6L-agdyyJkGTE8ztMqgpmgQHQQhLNYOo4H66jA0BF_THutKvE58L5EpHunoyu_NR0Z82LFNyn-H8bbcvkxMWi1UMGrNILe6g6fRCD4GuQGgF2D',
        width: 3024,
      },
    ],
    place_id: 'ChIJWfbTktGMGGAREWdwN9rYT2M',
    plus_code: {
      compound_code: 'MMPW+QW 일본 도쿄도 시부야구',
      global_code: '8Q7XMMPW+QW',
    },
    rating: 3.9,
    reference: 'ChIJWfbTktGMGGAREWdwN9rYT2M',
    scope: 'GOOGLE',
    types: ['point_of_interest', 'establishment'],
    user_ratings_total: 580,
    vicinity: 'こくみん共済 coop 会館, 2-chōme-12−１０ Yoyogi, Shibuya City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.6858994,
        lng: 139.690513,
      },
      viewport: {
        northeast: {
          lat: 35.68733133029149,
          lng: 139.6918356302915,
        },
        southwest: {
          lat: 35.68463336970849,
          lng: 139.6891376697085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/bar_pinlet',
    name: '피크 라운지',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 970,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/104546746627707069632">The Peak Lounge</a>',
        ],
        photo_reference:
          'AZose0kE9sbnbZ9T2SAz0j816wYiVaUQnjB-YXXHvmrJM5irSRIg8oF9-PtI9e-7eX8mfoTPXWyq2LReWn3L0CxbSBNbHwJRHeNt1rnKBMQxeBgb4Evn1LdG6ThWhxUhRkAxQ1FotD2uhRPs_2Enin7Ol03sX2yQR3dmVlaZXTJ_CIfMyvMF',
        width: 1453,
      },
    ],
    place_id: 'ChIJe55UKC3zGGARV1b3-UCXPTk',
    plus_code: {
      compound_code: 'MMPR+96 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMPR+96',
    },
    price_level: 3,
    rating: 4.4,
    reference: 'ChIJe55UKC3zGGARV1b3-UCXPTk',
    scope: 'GOOGLE',
    types: [
      'bar',
      'cafe',
      'night_club',
      'point_of_interest',
      'food',
      'establishment',
    ],
    user_ratings_total: 639,
    vicinity:
      'Park Hyatt Tokyo, 41F, 3-chōme-7−１−２ Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.686188,
        lng: 139.689079,
      },
      viewport: {
        northeast: {
          lat: 35.6874766302915,
          lng: 139.6904803802915,
        },
        southwest: {
          lat: 35.68477866970851,
          lng: 139.6877824197085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/school-71.png',
    icon_background_color: '#7B9EB0',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/school_pinlet',
    name: 'Shinjuku-ward Tsunohazu Library',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 4012,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/110807531686252733131">Masahiko Motono</a>',
        ],
        photo_reference:
          'AZose0n_Ia2KKqEEikXXOOW7y78SCAfswLaZ_bDvXY3koKZlvWUOn41tydtRVmJhrow6-OsBcq8aYCAQ4PZTpCecaYIePVZ8SZ85ATYk-M7KFzNqkVHOzajg63u2iBtrOkq4AZkkCEhjMb7U5JPzmIwQhMNdHyCfMopHnm2UkrWsc6dwlcX9',
        width: 6010,
      },
    ],
    place_id: 'ChIJzwAzjCzzGGAR7mz4i7iri-I',
    plus_code: {
      compound_code: 'MMPQ+FJ 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMPQ+FJ',
    },
    rating: 3.8,
    reference: 'ChIJzwAzjCzzGGAR7mz4i7iri-I',
    scope: 'GOOGLE',
    types: ['library', 'point_of_interest', 'establishment'],
    user_ratings_total: 75,
    vicinity: '4-chōme-33-7 Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.6895285,
        lng: 139.697141,
      },
      viewport: {
        northeast: {
          lat: 35.6908819802915,
          lng: 139.6984381302915,
        },
        southwest: {
          lat: 35.6881840197085,
          lng: 139.6957401697085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: 'Hot Spoon',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 3000,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/114956800298541905874">Me Ryo</a>',
        ],
        photo_reference:
          'AZose0n6mb9l15RzcfEyIJDn9s9cmuPs4F9nLshxRXCSoo1p3Fl24fSHU97OOG8e8MNcsGjzBSOWZYAEoXEgevm1rfckBajLWiAZwtm9fMw89BCUDJKfwajZsIDphs1chErfKSFyVCbOdHsTEJsHkfOS3eEcltcwb4MeTdM5zYWZCdB2U1eS',
        width: 4000,
      },
    ],
    place_id: 'ChIJq6rtQ9GMGGARM8KWc2liqUE',
    plus_code: {
      compound_code: 'MMQW+RV 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMQW+RV',
    },
    price_level: 2,
    rating: 4,
    reference: 'ChIJq6rtQ9GMGGARM8KWc2liqUE',
    scope: 'GOOGLE',
    types: ['restaurant', 'point_of_interest', 'food', 'establishment'],
    user_ratings_total: 663,
    vicinity: 'アベビル 2F, 1-chōme-12−７ Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.6868119,
        lng: 139.6959822,
      },
      viewport: {
        northeast: {
          lat: 35.6881771302915,
          lng: 139.6973257302915,
        },
        southwest: {
          lat: 35.6854791697085,
          lng: 139.6946277697085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: '三是 市場仲間 新宿店',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 2448,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/110663583587622570811">Yukio Saito</a>',
        ],
        photo_reference:
          'AZose0nXkv5QNbKmUmiO-FMTnjZ84NNTWeA63RVQPL87FUEY4cTN6DlHrdbG3v3CAG4afRG7sm8iQf42iQpPTzgPQcGm1CWHLX4VG-A47GJulF91NP3j7nbhP4B_neuYyZQvpwjd_i4fm2WrN2iIAFjjyhH3UCBmlg136Um4FLHCTzy7vfw',
        width: 2448,
      },
    ],
    place_id: 'ChIJTUVAItKMGGAR-pfJaDyiGno',
    plus_code: {
      compound_code: 'MMPW+P9 일본 도쿄도 시부야구',
      global_code: '8Q7XMMPW+P9',
    },
    price_level: 1,
    rating: 3.7,
    reference: 'ChIJTUVAItKMGGAR-pfJaDyiGno',
    scope: 'GOOGLE',
    types: ['restaurant', 'point_of_interest', 'food', 'establishment'],
    user_ratings_total: 118,
    vicinity: '2-chōme-16-9 Yoyogi, Shibuya City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.6868541,
        lng: 139.6963824,
      },
      viewport: {
        northeast: {
          lat: 35.6882420302915,
          lng: 139.6976852802915,
        },
        southwest: {
          lat: 35.6855440697085,
          lng: 139.6949873197085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
    icon_background_color: '#7B9EB0',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
    name: 'Garret',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 853,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/116058387925163988965">Garret 新宿店【ギャレット】</a>',
        ],
        photo_reference:
          'AZose0mUYPZYpspq941wcqrwCKUuAwjowmN3UE7JbNX8Rz45yci0Xpe3_Rpgah0cEIj0ZA7SzPuxAYS5eBTGTwisZI5zA6VfpBgmggTSoAwlUW_dfPWF9qI20MY059Qot9xw6nWBgalM5OI9AL53Lu8MVvttGa8-bMCC0wSAKyGAK5lJYqdr',
        width: 1280,
      },
    ],
    place_id: 'ChIJn2pXitGMGGARyhtZvgsFIno',
    plus_code: {
      compound_code: 'MMPW+PH 일본 도쿄도 시부야구',
      global_code: '8Q7XMMPW+PH',
    },
    rating: 4.7,
    reference: 'ChIJn2pXitGMGGARyhtZvgsFIno',
    scope: 'GOOGLE',
    types: ['hair_care', 'point_of_interest', 'establishment'],
    user_ratings_total: 15,
    vicinity: '加瀬ビル 402, 2-chōme-15−９ Yoyogi, Shibuya City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.68987190000001,
        lng: 139.6970721,
      },
      viewport: {
        northeast: {
          lat: 35.69123088029149,
          lng: 139.6983996802915,
        },
        southwest: {
          lat: 35.68853291970849,
          lng: 139.6957017197085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: 'Shinjuku Ichi',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 1773,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/107748321934325600619">沖縄料理いち</a>',
        ],
        photo_reference:
          'AZose0lyM0SEJkDpRzh-K0QfkDOET_MxCOdndEFnK32wWUpHewfmbPvybFneE-WaxIFyb_qmwA4vkylqh9F0Wx2aCuc9KE_9Cb39iIvSz-H_5isQZhvy4DLkebwHhjMEHIqfwRIJtp8eXGTVp4hSpRDhjx0DCqZ5K1H69EKpOERcHmAXBqvI',
        width: 2364,
      },
    ],
    place_id: 'ChIJ2xj2RdGMGGARpwU0iwhS-jo',
    plus_code: {
      compound_code: 'MMQW+WR 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMQW+WR',
    },
    price_level: 2,
    rating: 3.8,
    reference: 'ChIJ2xj2RdGMGGARpwU0iwhS-jo',
    scope: 'GOOGLE',
    types: ['restaurant', 'point_of_interest', 'food', 'establishment'],
    user_ratings_total: 168,
    vicinity: '八洋ビル B1F, 1-chōme-12−１０ Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.68915729999999,
        lng: 139.6971745,
      },
      viewport: {
        northeast: {
          lat: 35.6905032802915,
          lng: 139.6984716802915,
        },
        southwest: {
          lat: 35.6878053197085,
          lng: 139.6957737197085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
    icon_background_color: '#7B9EB0',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
    name: 'mielhair 新宿店',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 1970,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/106179098892174942518">mielhair 新宿店</a>',
        ],
        photo_reference:
          'AZose0nl98iittyeyDjPKn2O4KHbIWtOxMOSMlGAhPfuvi3AfovHRC_8AJHQZlHqludBsxLKXp_K_A25zpyPlm7s80DLWQCRiBxz3IEQVxpUwuttSTolKWfT1FWa_JnxVXvOIESGPknylPVNd0OSJ17HtE2JqzXvFGl-ANmEpwRrwuJfz94H',
        width: 3500,
      },
    ],
    place_id: 'ChIJTTLb5CWNGGARxFyMXcyJPN8',
    plus_code: {
      compound_code: 'MMQW+MV 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMQW+MV',
    },
    rating: 3.5,
    reference: 'ChIJTTLb5CWNGGARxFyMXcyJPN8',
    scope: 'GOOGLE',
    types: ['hair_care', 'point_of_interest', 'establishment'],
    user_ratings_total: 75,
    vicinity: '西新宿ビル ２Ｆ, 1-chōme-15−１０ Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.6895716,
        lng: 139.6969009,
      },
      viewport: {
        northeast: {
          lat: 35.6909295802915,
          lng: 139.6983164302915,
        },
        southwest: {
          lat: 35.6882316197085,
          lng: 139.6956184697085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
    icon_background_color: '#7B9EB0',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
    name: 'アロマ ヘアー ルーム 新宿店(AROMA hair room)',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 1479,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/105317557400798447636">アロマ ヘアー ルーム 新宿店(AROMA hair room)</a>',
        ],
        photo_reference:
          'AZose0lAgGdraRD0S7xCn0hyE5X4FFvBqMbzBkvyPJ30JzZjAIhg6EuKZPE2pLx8aJolXXSrVrpOLP7LKZ9G-FQHR7By0bqTh6PlhKTtqYE_q2l9ukMKU0T1n-norLjmcqrwYN5UgHwxL5QlrsYJHPGJzBLKQyZ9ApPkuVp8TQsx_6N4Sefs',
        width: 1109,
      },
    ],
    place_id: 'ChIJ52PURNGMGGAR7VkpCEwcxto',
    plus_code: {
      compound_code: 'MMQW+RQ 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMQW+RQ',
    },
    rating: 3.7,
    reference: 'ChIJ52PURNGMGGAR7VkpCEwcxto',
    scope: 'GOOGLE',
    types: ['hair_care', 'point_of_interest', 'establishment'],
    user_ratings_total: 184,
    vicinity: '西新ビル, 1-chōme-13−３ Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.6895624,
        lng: 139.6967792,
      },
      viewport: {
        northeast: {
          lat: 35.6909568802915,
          lng: 139.6981254802915,
        },
        southwest: {
          lat: 35.6882589197085,
          lng: 139.6954275197085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: '톤친칸',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 3072,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/115365209007991200015">ぴぴねこ</a>',
        ],
        photo_reference:
          'AZose0lV7OfFWpoVIwfQ0Wu9dKXUMQB1ARSePpPscOyZWJ9m_-Hm2e3QJTAy2qnwtBhc79RhwSnGVw-1XqSG2sH7ZPhN4MpuLDaCc8oIpcqnYxQEF8KXSSlCsCkBIvzgEop7879QG3VkwCmfA1qfJPTQfevi261-pB9rEcwOvMLv7Imv1V5G',
        width: 4096,
      },
    ],
    place_id: 'ChIJYyEsRdGMGGARH6RVyBKbjjA',
    plus_code: {
      compound_code: 'MMQW+RP 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMQW+RP',
    },
    rating: 4,
    reference: 'ChIJYyEsRdGMGGARH6RVyBKbjjA',
    scope: 'GOOGLE',
    types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 2320,
    vicinity: 'たかはしビル, 1-chōme-13−８ Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.6896342,
        lng: 139.6921007,
      },
      viewport: {
        northeast: {
          lat: 35.69078314999999,
          lng: 139.6937419302915,
        },
        southwest: {
          lat: 35.68698455000001,
          lng: 139.6910439697085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/civic_building-71.png',
    icon_background_color: '#7B9EB0',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/civic-bldg_pinlet',
    name: '도쿄 도청사',
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 4032,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/111855112406731253346">Yossy</a>',
        ],
        photo_reference:
          'AZose0khF_03dTnzJyZC-psNpCAxtjDezilUIt_9vFHJI7xXtTLkslFiVCnwygdzwcb-K3dOaVp2QyUvLXBBK1bZ3gJt6MHEu2aOEFdstuRYaC0YmSjuBxDYHFcdH40TKCFIAnWMdyQyaAx2HW26ZVJ5FI_EsiQOpCnn1zZKq09Y6YODplBm',
        width: 3024,
      },
    ],
    place_id: 'ChIJoTcat9SMGGAR6GGG8zdcZvE',
    plus_code: {
      compound_code: 'MMQR+VR 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMQR+VR',
    },
    rating: 4.3,
    reference: 'ChIJoTcat9SMGGAR6GGG8zdcZvE',
    scope: 'GOOGLE',
    types: [
      'tourist_attraction',
      'city_hall',
      'local_government_office',
      'point_of_interest',
      'establishment',
    ],
    user_ratings_total: 3935,
    vicinity: '2-chōme-8-1 Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.6898742,
        lng: 139.6965706,
      },
      viewport: {
        northeast: {
          lat: 35.6912032802915,
          lng: 139.6978430302915,
        },
        southwest: {
          lat: 35.6885053197085,
          lng: 139.6951450697085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png',
    icon_background_color: '#4B96F3',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/convenience_pinlet',
    name: '내추럴로손 신주쿠역니시점',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 4032,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/116889022560112045541">T N</a>',
        ],
        photo_reference:
          'AZose0kmHP2MgXNzAEU3p0XIc1e3gFRxff3H91keGvbq3uToGH7qiDagdxlcz1b5GXMYRPVRqO91VUwsD3oGnBGYW9MhaHgW5WMmYWgaRTK6rqUnI0fhXD9TEd6hynF9RFE9vp35oWCd5RJ76BOkWDs4k-wHgFtfPmPjnMIKknABDXG4sJje',
        width: 3024,
      },
    ],
    place_id: 'ChIJsVGNUNGMGGARje-B0m2yMLI',
    plus_code: {
      compound_code: 'MMQW+WJ 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMQW+WJ',
    },
    rating: 3.9,
    reference: 'ChIJsVGNUNGMGGARje-B0m2yMLI',
    scope: 'GOOGLE',
    types: [
      'convenience_store',
      'atm',
      'finance',
      'food',
      'point_of_interest',
      'store',
      'establishment',
    ],
    user_ratings_total: 45,
    vicinity:
      'Nishi-Shinjuku Showa Building, 1-chōme-13-12 Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.688421,
        lng: 139.6934289,
      },
      viewport: {
        northeast: {
          lat: 35.6900286302915,
          lng: 139.6946797802915,
        },
        southwest: {
          lat: 35.6873306697085,
          lng: 139.6919818197085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: 'Tonkatsu Ise Shinjuku NS Building',
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 1080,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/109912267429293838157">김말똥</a>',
        ],
        photo_reference:
          'AZose0kyF8wKkYYPjcPfq6xlnz7KUdyVd07E7qs1rn35N4_kzarfuLQUnh0xeMN4bMYWoclKiFoQwg5BILUkHgDZsS5NXL4KwF3wJqKifsI8q2tu3RDTHm7fCWAwaZBviazsbuK3u1m3Mq-cXQsoJVyALsPI2ZPTd0mKpAnGKYuEETljCZid',
        width: 1920,
      },
    ],
    place_id: 'ChIJXQ4NntOMGGAR1vUDBh1inok',
    plus_code: {
      compound_code: 'MMQV+99 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMQV+99',
    },
    price_level: 2,
    rating: 3.8,
    reference: 'ChIJXQ4NntOMGGAR1vUDBh1inok',
    scope: 'GOOGLE',
    types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 98,
    vicinity: '2-chōme-4-1 Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.6853191,
        lng: 139.6910159,
      },
      viewport: {
        northeast: {
          lat: 35.6864643302915,
          lng: 139.6922728302915,
        },
        southwest: {
          lat: 35.6837663697085,
          lng: 139.6895748697085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: '뉴욕 그릴',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 2510,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/109280054257056497017">New York Grill</a>',
        ],
        photo_reference:
          'AZose0ka0KcpGjuMZ5KtuK4_3c4RMIgA1Nd7l-xw5n9FjJUHXSEVMNric1MuDx5UCZi8-G28OFkVW4xgxsB_K_-ed9lMuWeEsuzzYC2M7ad_gTtj1GfAuGI4GXv4ho8ueBIZ-U-5iqIjbIVEMIRKGQAWIEHNC5sxU33c-bkyu5ASf-IflBR8',
        width: 3227,
      },
    ],
    place_id: 'ChIJeZd_LC3zGGARwuG7DoPkZ9Q',
    plus_code: {
      compound_code: 'MMPR+4C 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMPR+4C',
    },
    price_level: 4,
    rating: 4.5,
    reference: 'ChIJeZd_LC3zGGARwuG7DoPkZ9Q',
    scope: 'GOOGLE',
    types: ['bar', 'restaurant', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 1486,
    vicinity:
      'Park Hyatt Tokyo, 52階, 3-chōme-7-1-2 Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.6878408,
        lng: 139.6986386,
      },
      viewport: {
        northeast: {
          lat: 35.68924578029149,
          lng: 139.6999484802915,
        },
        southwest: {
          lat: 35.6865478197085,
          lng: 139.6972505197085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: '新潟・佐渡の旬と地酒 いかの墨',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 756,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/102863021327859476085">新潟・佐渡の旬と地酒 いかの墨</a>',
        ],
        photo_reference:
          'AZose0n_ddUcdsdLwN6nURREcSTJ33TzBGeOdAPVxuvaUWzRTMAYkNj2EyP_iJ7emnpl8aMz5DO1Cm1odAnurC15JKp92sY7UYqfUVENfNJgFKeBhzWLIfUvKw96LfmD7wI6RtCpxr6NiD3ih4aXD7z3ANuWFF8X1hlcvY9OHYF55yZBZ4O2',
        width: 756,
      },
    ],
    place_id: 'ChIJqYZ8tNGMGGARvFNGJbOcIWg',
    plus_code: {
      compound_code: 'MMQX+4F 일본 도쿄도 시부야구',
      global_code: '8Q7XMMQX+4F',
    },
    price_level: 3,
    rating: 4.1,
    reference: 'ChIJqYZ8tNGMGGARvFNGJbOcIWg',
    scope: 'GOOGLE',
    types: [
      'meal_delivery',
      'meal_takeaway',
      'restaurant',
      'food',
      'point_of_interest',
      'establishment',
    ],
    user_ratings_total: 481,
    vicinity: '景雲荘 ビル 2・3F, 2-chōme-6−３ Yoyogi, Shibuya City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.6857771,
        lng: 139.6925092,
      },
      viewport: {
        northeast: {
          lat: 35.6870103802915,
          lng: 139.6939581802915,
        },
        southwest: {
          lat: 35.6843124197085,
          lng: 139.6912602197085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png',
    icon_background_color: '#909CE1',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet',
    name: '케이오 프레소 인 신주쿠',
    photos: [
      {
        height: 3268,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/110807531686252733131">Masahiko Motono</a>',
        ],
        photo_reference:
          'AZose0mqgCqAp5WZ5cAaWFMEl-7XnB4ixlqlAmmtNeNFhx0_HbyK2es58kzsqCZQ6XpDLXXSPMGzT7mt3BCtlxJfOdK4Bgs2GOA_zfGEkL25QcTcE858q52fY9XkWVxI_mKFgRLRlqojz5EGX_rS8qk-ImkG4RQPXDFEboe4fTKIBAk9KZiu',
        width: 4895,
      },
    ],
    place_id: 'ChIJW3425tKMGGARP5n1s4QD6BU',
    plus_code: {
      compound_code: 'MMPV+82 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMPV+82',
    },
    rating: 3.7,
    reference: 'ChIJW3425tKMGGARP5n1s4QD6BU',
    scope: 'GOOGLE',
    types: ['lodging', 'point_of_interest', 'establishment'],
    user_ratings_total: 1302,
    vicinity: '3-chōme-4-5 Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.6894695,
        lng: 139.6971502,
      },
      viewport: {
        northeast: {
          lat: 35.69077023029149,
          lng: 139.6985240802915,
        },
        southwest: {
          lat: 35.6880722697085,
          lng: 139.6958261197085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: 'Furansutei Shinjukunishiguchiten',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 2250,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/106373251267437926474">kaz ura (usacy)</a>',
        ],
        photo_reference:
          'AZose0mskx1I1YQOm6Ro1M41WHO4O6rvLsB2t2hW_GNO2PX0P9wGQeAP2Jgqn6gtPbomHnzPILYioik83N13qfgu1sx0rJPf9ufjCAOTWLysNou5awQV6fV9906cyyzpclvK8ki0y_KeX61042p7DpheiRPd69_jIBf1Eo_-g1IeSgLSx9Me',
        width: 4000,
      },
    ],
    place_id: 'ChIJzVHtQtGMGGARYg906dP790c',
    plus_code: {
      compound_code: 'MMQW+QV 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMQW+QV',
    },
    price_level: 2,
    rating: 3.5,
    reference: 'ChIJzVHtQtGMGGARYg906dP790c',
    scope: 'GOOGLE',
    types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 380,
    vicinity: '新宿月光荘ビル B1Ｆ, 1-chōme-12−６ Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.690348,
        lng: 139.695967,
      },
      viewport: {
        northeast: {
          lat: 35.6915268802915,
          lng: 139.6972886802915,
        },
        southwest: {
          lat: 35.6888289197085,
          lng: 139.6945907197085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/cafe_pinlet',
    name: 'Renoir Shinjuku Nishiguchi S-tec Bldg.',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 600,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/115700124132662740184">喫茶室ルノアール 新宿西口エステックビル店</a>',
        ],
        photo_reference:
          'AZose0mEGAimSQSPvxZwFysQSgI78PGZoc6K922-sk_6xXn8tSJ6cae4OzZhpkurKSpCL98xMc4tAd7sChGE8cP4gcVatCplZ3R_lG0s9c3oik4XMeSwII8Uzzg0RRWqa_eUX9FMkQOGdt2Hca_kLvH6GbpFxh4WK6NXaqaNw5DpcEcsTqJT',
        width: 800,
      },
    ],
    place_id: 'ChIJEy93BNSMGGARwLzjSOzBwMc',
    plus_code: {
      compound_code: 'MMRW+49 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMRW+49',
    },
    price_level: 2,
    rating: 3.7,
    reference: 'ChIJEy93BNSMGGARwLzjSOzBwMc',
    scope: 'GOOGLE',
    types: ['cafe', 'food', 'point_of_interest', 'store', 'establishment'],
    user_ratings_total: 334,
    vicinity:
      'S-tec Information Building, B1F, 1-chōme-24−１ Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.68957200000001,
        lng: 139.696901,
      },
      viewport: {
        northeast: {
          lat: 35.6909312802915,
          lng: 139.6983158802915,
        },
        southwest: {
          lat: 35.6882333197085,
          lng: 139.6956179197085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: 'Steak shabu-shabu Pandora',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 680,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/100205039323186533851">ステーキしゃぶしゃぶ パンドラ</a>',
        ],
        photo_reference:
          'AZose0lRLPjD04waDDA25oU3nmIpjZf4lh_WZDpD0jD9cjLoF3QovdQOepNi0AEu62_l0rEd_9h_MTiX9Xb8sJnhuBoZ_SEukOsJbw53aF_ayuMS8aGGLTXIfKKdPTPqZHcEXL8A3gFSXngSpauxJ618iy7vmHd6PmCXvKsJv82XUmVw_o7J',
        width: 920,
      },
    ],
    place_id: 'ChIJJdMqW9GMGGARiLsLtata3_Q',
    plus_code: {
      compound_code: 'MMQW+RQ 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMQW+RQ',
    },
    price_level: 2,
    rating: 4,
    reference: 'ChIJJdMqW9GMGGARiLsLtata3_Q',
    scope: 'GOOGLE',
    types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 374,
    vicinity: '西新ビル 2F, 1-chōme-13−３ Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.689036,
        lng: 139.6971356,
      },
      viewport: {
        northeast: {
          lat: 35.69038358029149,
          lng: 139.6984689802915,
        },
        southwest: {
          lat: 35.68768561970849,
          lng: 139.6957710197085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: '名代 箱根そば 新宿西口店',
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 1334,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/108837823927111832226">名代 箱根そば</a>',
        ],
        photo_reference:
          'AZose0kVGAMyng_4pme1UNT1n6ax1y2Ip5BY5r7Hff5e4jsat4QQdziUX5sRTUfa-R05k-unN41yy5_ZLtpF2KuP9FFebcnN9qQ4y8Ry3hdybo0fO63P6V-iRHdOuxNdhphtfub2Z69thUK8tkV_aTWxztOh3Hnjf18JK6z8lAEfbK9Xl2gL',
        width: 2000,
      },
    ],
    place_id: 'ChIJVVV5adGMGGARhGV47g907rg',
    plus_code: {
      compound_code: 'MMQW+JV 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMQW+JV',
    },
    price_level: 1,
    rating: 3.5,
    reference: 'ChIJVVV5adGMGGARhGV47g907rg',
    scope: 'GOOGLE',
    types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 305,
    vicinity: '西新宿ビル 1F, 1-chōme-15−１０ Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.6855151,
        lng: 139.6908275,
      },
      viewport: {
        northeast: {
          lat: 35.6871391802915,
          lng: 139.6919928802915,
        },
        southwest: {
          lat: 35.6844412197085,
          lng: 139.6892949197085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: 'Girandole Park Hyatt',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 4032,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/107094466179334142432">Yasuhiro Suzuki</a>',
        ],
        photo_reference:
          'AZose0nfiXZWD24eLzWnlqopHrTPbBGM1sXSL-oofSUsaGjxvv7SKem7f74qifz6__d_aFIfE2LByf67G21dJY80zTq2SaDgmWZ1V2ba_lIZhclcFi3iycUK44bVIj6J7XvaLqaU2ugHR5tGhFYG7jj5Y56FNBodMeuuJxgK77UrV3KP4vyx',
        width: 3024,
      },
    ],
    place_id: 'ChIJeZd_LC3zGGARdoX_2mZ_vzc',
    plus_code: {
      compound_code: 'MMPR+68 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMPR+68',
    },
    price_level: 3,
    rating: 4.3,
    reference: 'ChIJeZd_LC3zGGARdoX_2mZ_vzc',
    scope: 'GOOGLE',
    types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 485,
    vicinity:
      'パークハイアット東京 41Ｆ, 3-chōme-7−１−２ Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.6904219,
        lng: 139.6943566,
      },
      viewport: {
        northeast: {
          lat: 35.6915223802915,
          lng: 139.6954832802915,
        },
        southwest: {
          lat: 35.6888244197085,
          lng: 139.6927853197085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: 'Fumotoya Keio Plaza Hotel',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 576,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/103162204856428774420">麓屋 京王プラザホテル</a>',
        ],
        photo_reference:
          'AZose0mSMOc0q6RlpzO73bQyrVaKG8CKPLUUuIwxfSW_t6nDjWaUB6AubafITkR2dX5rqPzkM3zWxWOZxMlrDmAMiJkOU1gwiew1UBJ-pRFopbtni2_FZdtQkn_RHdC0F1thoDg_PoQXLjknk2ANg5v73ePQZB-BoOahflwJDsLDzRUMCiyo',
        width: 720,
      },
    ],
    place_id: 'ChIJ4WIcdNSMGGARSoKIrKx2CC4',
    plus_code: {
      compound_code: 'MMRV+5P 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMRV+5P',
    },
    price_level: 2,
    rating: 3.8,
    reference: 'ChIJ4WIcdNSMGGARSoKIrKx2CC4',
    scope: 'GOOGLE',
    types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 237,
    vicinity: '2-chōme-2-1 Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.6880367,
        lng: 139.6935125,
      },
      viewport: {
        northeast: {
          lat: 35.6898646,
          lng: 139.69490585,
        },
        southwest: {
          lat: 35.68644219999999,
          lng: 139.69196885,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
    icon_background_color: '#7B9EB0',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
    name: '신주쿠 NS빌딩',
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 250,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/114534980031218563241">新宿NSビル</a>',
        ],
        photo_reference:
          'AZose0lBOv_TJwwFGcMnqiyDhiJY42QQt6pB5ADgEabHmnv_OiFnetJCcQqSt-J30rtXmLz5FB_b_iRCCxy82Mi1UTy9cVY5xE4mfKBfBEe5YwH-ZkRzWYrbkLA-pBQLgGcnmhN7R3Bmna1CB9O9SeyCnVPtHcDNgkmu2OWNgzXEHcecBBqf',
        width: 676,
      },
    ],
    place_id: 'ChIJ950adNOMGGARlQEKn_v4tU8',
    plus_code: {
      compound_code: 'MMQV+6C 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMQV+6C',
    },
    rating: 3.6,
    reference: 'ChIJ950adNOMGGARlQEKn_v4tU8',
    scope: 'GOOGLE',
    types: ['point_of_interest', 'establishment'],
    user_ratings_total: 3716,
    vicinity: '2-chōme-4-1 Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.68992370000001,
        lng: 139.6968558,
      },
      viewport: {
        northeast: {
          lat: 35.6913403302915,
          lng: 139.6981822802915,
        },
        southwest: {
          lat: 35.6886423697085,
          lng: 139.6954843197085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: 'Tengu sakaba',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 477,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/107028210578584435626">テング酒場 新宿郵便局前店</a>',
        ],
        photo_reference:
          'AZose0nnZus7r1Sk1O4MXXmqeDgHGRfM3qISDEe6UgzbpY0NyRK5e0yjn1-BGW4RgulyJoi2aQyrRAzzmCZEZaHqhb-9kD0pKNYXZ-6InDqRxEkKgGk7pBacsgyhA72bOpYu-jfFuNDkq_g8np82CISXcEipLt62130BxftJfTuSZ0Xjomlc',
        width: 848,
      },
    ],
    place_id: 'ChIJy-nQUdGMGGAR6mCqbf0OgA8',
    plus_code: {
      compound_code: 'MMQW+XP 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMQW+XP',
    },
    price_level: 1,
    rating: 3.6,
    reference: 'ChIJy-nQUdGMGGAR6mCqbf0OgA8',
    scope: 'GOOGLE',
    types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 353,
    vicinity: '今佐ビル ２F, 1-chōme-13−１ Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.68478,
        lng: 139.690496,
      },
      viewport: {
        northeast: {
          lat: 35.68607933029151,
          lng: 139.6917750802915,
        },
        southwest: {
          lat: 35.68338136970851,
          lng: 139.6890771197085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
    icon_background_color: '#7B9EB0',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
    name: '（株）学芸図書営業部',
    place_id: 'ChIJteVTJC3zGGARhYZF-HsjyfA',
    plus_code: {
      compound_code: 'MMMR+W5 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMMR+W5',
    },
    reference: 'ChIJteVTJC3zGGARhYZF-HsjyfA',
    scope: 'GOOGLE',
    types: ['point_of_interest', 'establishment'],
    vicinity: '3-chōme-7-26 Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.6872729,
        lng: 139.6974227,
      },
      viewport: {
        northeast: {
          lat: 35.6886605302915,
          lng: 139.6987750802915,
        },
        southwest: {
          lat: 35.6859625697085,
          lng: 139.6960771197085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: 'LUCIAN',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 3000,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/107799460950954503607">Shunichi Nakano</a>',
        ],
        photo_reference:
          'AZose0msdGnfsSNAqOryLfQ98ik8qQZNPK1UjvACgwsFVjsE9Jt4KSRdxrQd4cr_U1bY75OMJWZS7x0h9sOkKXCgwvLyYyS3vUgI-bv8eQgVAkFKNx4yvkao3-cCOrEzSj6wPvzfeIwWRN5Rn_Y5VdWz7JxE--YLT_mz6zMxnqihA27GuzdF',
        width: 4000,
      },
    ],
    place_id: 'ChIJsVYNwNGMGGARCTSCtTPxShQ',
    plus_code: {
      compound_code: 'MMPW+WX 일본 도쿄도 시부야구',
      global_code: '8Q7XMMPW+WX',
    },
    price_level: 2,
    rating: 3.9,
    reference: 'ChIJsVYNwNGMGGARCTSCtTPxShQ',
    scope: 'GOOGLE',
    types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 70,
    vicinity: '羽田ビル, 1f, 2-chōme-5-1 Yoyogi, Shibuya City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.6867865,
        lng: 139.693271,
      },
      viewport: {
        northeast: {
          lat: 35.68813548029149,
          lng: 139.6946199802915,
        },
        southwest: {
          lat: 35.6854375197085,
          lng: 139.6919220197085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: 'Capricciosa - Shinjuku Washington Hotel',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 1499,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/102102440127150336927">サワーポメロ</a>',
        ],
        photo_reference:
          'AZose0mxRaYyNmLciHjhZXXtPqZHhumIOGrFsnOBVzVAOwcVB7VAt_vHSW7eTecbcRwE3wCDbSSgo8tcGkGNBEWKa9Py7pfZnAULhRQgikFQy132rN7saRgajUclAqfAEOcidj6SpaMBI5zsSJKOU9zAm9J_iimvL35KsEMZuIAxUQVXGxvb',
        width: 1499,
      },
    ],
    place_id: 'ChIJaZa6BNOMGGARpj7KOrxT_ow',
    plus_code: {
      compound_code: 'MMPV+P8 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMPV+P8',
    },
    price_level: 2,
    rating: 3.6,
    reference: 'ChIJaZa6BNOMGGARpj7KOrxT_ow',
    scope: 'GOOGLE',
    types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 351,
    vicinity:
      '新宿ワシントンホテル B1F, 3-chōme-2−９ Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.68932839999999,
        lng: 139.6976219,
      },
      viewport: {
        northeast: {
          lat: 35.6906843302915,
          lng: 139.6989367302915,
        },
        southwest: {
          lat: 35.6879863697085,
          lng: 139.6962387697085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: 'Ichiryu',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 3024,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/103815956413602935991">Yoko Iijima</a>',
        ],
        photo_reference:
          'AZose0krF7GeKDVmsXRpxLIZeqUSyh51CxjgaLcdBusWHVePJnUy8vT28EqzbZqAE_QZ2zPOxaq_oa1tVjpz-OSD4369GtBZ-o4yTJW9mw-WrUciMDC2pqoIsxsDFFmvfsYjFQwA_7_ADd7pkh30q6kVDAryK6dToTPtcw98HqCX00ABV0ow',
        width: 4032,
      },
    ],
    place_id: 'ChIJCQfxFNGMGGARTReD9W-t14E',
    plus_code: {
      compound_code: 'MMQX+P2 일본 도쿄도 신주쿠구',
      global_code: '8Q7XMMQX+P2',
    },
    price_level: 2,
    rating: 3.2,
    reference: 'ChIJCQfxFNGMGGARTReD9W-t14E',
    scope: 'GOOGLE',
    types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 481,
    vicinity:
      'アソルティ西新宿, DEUX, 1-chōme-16−１０ Nishishinjuku, Shinjuku City',
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 35.6874324,
        lng: 139.6970059,
      },
      viewport: {
        northeast: {
          lat: 35.6886895302915,
          lng: 139.6984246802915,
        },
        southwest: {
          lat: 35.6859915697085,
          lng: 139.6957267197085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
    icon_background_color: '#7B9EB0',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
    name: 'Shinjuku Tsurukame Clinic',
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 3280,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/114364255863894153412">新宿つるかめクリニック</a>',
        ],
        photo_reference:
          'AZose0nvD_5O6SYZy3avxJtCp-h5oC1OUkxD_hEKDqd_3L0GWo19YDw4p2oxsWXRR7JJhmbnXyUu9YaBXdM7fYCeJdXzzqMmKvB5lxx3ipDvg8nx4-DJc-kjgejNgBs2wItUmOOER1b9WEU2tFxw__GFQD7YW2qsBbSC11T2Wjmfxgc_iC0U',
        width: 4928,
      },
    ],
    place_id: 'ChIJYepckNGMGGAR_dmMgJVxcQs',
    plus_code: {
      compound_code: 'MMPW+XR 일본 도쿄도 시부야구',
      global_code: '8Q7XMMPW+XR',
    },
    rating: 3.1,
    types: ['health', 'point_of_interest', 'establishment'],
    user_ratings_total: 92,
    vicinity:
      '東京海上日動ビルディング ３・４階, 2-chōme-11−１５ Yoyogi, Shibuya City',
  },
];
