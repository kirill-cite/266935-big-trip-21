import { getRandomArrayElement } from '../utils';

const mockPoints = [

  {
    'id': 'c3726324-f37c-4dd8-87c7-9346f676f174',
    'base_price': 4530,
    'date_from': '2023-08-13T21:00:00.739Z',
    'date_to': '2023-08-20T21:00:00.739Z',
    'destination_id': '6ec1a8cc-0f63-4d44-8c55-134b409e8f22',
    'is_favorite': true,
    'offers_id': [
      '7097ad4e-43ab-4789-8f78-2db23712a70a'
    ],
    'type': 'drive'
  },
  {
    'id': '18a8533e-62fd-44ea-a01c-3129c3d31537',
    'base_price': 2841,
    'date_from': '2023-08-08T21:00:00.739Z',
    'date_to': '2023-08-19T11:00:00.739Z',
    'destination_id': 'e498faf6-f5b3-47a3-94ac-d8b27a5947c6',
    'is_favorite': true,
    'offers_id': [],
    'type': 'check-in'
  },
  {
    'id': '68a594f5-628e-4aa4-9845-de5fd1b0bd8e',
    'base_price': 5955,
    'date_from': '2023-08-12T21:00:00.739Z',
    'date_to': '2023-08-19T13:00:00.739Z',
    'destination_id': 'ecf76770-ef8c-4e0f-8577-31d97e65afef',
    'is_favorite': false,
    'offers_id': [],
    'type': 'sightseeing'
  },
  {
    'id': 'ad7d013f-9cd6-4359-9291-8fae084e182a',
    'base_price': 5235,
    'date_from': '2023-08-12T21:00:00.739Z',
    'date_to': '2023-08-19T16:00:00.739Z',
    'destination_id': '47d53e1d-61f4-403a-9da5-c1c5ceceabe9',
    'is_favorite': true,
    'offers_id': [
      'c101773c-fdd3-4477-ad7b-4aee876a86a7',
      '07d4135f-7198-4092-9eb7-486c3b964347',
      '70a6e1cf-c0ec-4abc-9ced-ad3b6fa008f7',
      'a0de29a8-b583-4dd7-9faa-5e8a4e6977c6'
    ],
    'type': 'ship'
  },
  {
    'id': 'e9aa7aca-0ae6-4e79-a1c9-d1ce6c5f274c',
    'base_price': 6060,
    'date_from': '2023-08-07T21:00:00.739Z',
    'date_to': '2023-08-19T04:00:00.739Z',
    'destination_id': 'ffc2a911-11ae-4a3f-8e95-1f57eaaeb4eb',
    'is_favorite': true,
    'offers_id': [
      'e267d32e-6887-4cdd-bdb9-f32c112675d5',
      'c101773c-fdd3-4477-ad7b-4aee876a86a7',
      '07d4135f-7198-4092-9eb7-486c3b964347',
      '70a6e1cf-c0ec-4abc-9ced-ad3b6fa008f7',
      'a0de29a8-b583-4dd7-9faa-5e8a4e6977c6'
    ],
    'type': 'ship'
  },
  {
    'id': '0e9f3e4e-b73c-490b-ab23-69ef51c3a66e',
    'base_price': 1707,
    'date_from': '2023-08-15T21:00:00.739Z',
    'date_to': '2023-08-19T10:00:00.739Z',
    'destination_id': 'ecf76770-ef8c-4e0f-8577-31d97e65afef',
    'is_favorite': true,
    'offers_id': [],
    'type': 'drive'
  },
  {
    'id': '5339e357-5826-4b45-88eb-89866e5e470f',
    'base_price': 5989,
    'date_from': '2023-08-14T21:00:00.739Z',
    'date_to': '2023-08-20T05:00:00.739Z',
    'destination_id': 'c76f204e-e81a-43d8-af41-39523197812a',
    'is_favorite': true,
    'offers_id': [],
    'type': 'sightseeing'
  },
  {
    'id': '9a27986a-8967-4ccd-b4fe-8cdaf6592d34',
    'base_price': 9632,
    'date_from': '2023-08-08T21:00:00.739Z',
    'date_to': '2023-08-20T02:00:00.739Z',
    'destination_id': 'c3197bdf-b1ea-4012-9cc1-7d964f748f4f',
    'is_favorite': false,
    'offers_id': [
      'c8a1d6c9-1477-44fe-aa4f-5eaa79322f07',
      '599d56be-ff36-4104-9bf4-9431adc69c1a',
      '331b41eb-d3ad-4239-ba2b-6222f2362674'
    ],
    'type': 'check-in'
  },
  {
    'id': '3bd531fc-e43c-4a57-9dca-64542137cc58',
    'base_price': 1056,
    'date_from': '2023-08-14T21:00:00.739Z',
    'date_to': '2023-08-20T18:00:00.739Z',
    'destination_id': 'f0e67422-029e-4ab6-8a08-cb4e4a73ab4f',
    'is_favorite': true,
    'offers_id': [
      'c101773c-fdd3-4477-ad7b-4aee876a86a7',
      '07d4135f-7198-4092-9eb7-486c3b964347',
      '70a6e1cf-c0ec-4abc-9ced-ad3b6fa008f7',
      'a0de29a8-b583-4dd7-9faa-5e8a4e6977c6'
    ],
    'type': 'ship'
  },
  {
    'id': '3131664e-b3e2-4c52-899a-c644fb9e1a18',
    'base_price': 3906,
    'date_from': '2023-08-15T21:00:00.739Z',
    'date_to': '2023-08-19T04:00:00.740Z',
    'destination_id': 'e498faf6-f5b3-47a3-94ac-d8b27a5947c6',
    'is_favorite': false,
    'offers_id': [
      '599d56be-ff36-4104-9bf4-9431adc69c1a',
      '331b41eb-d3ad-4239-ba2b-6222f2362674'
    ],
    'type': 'check-in'
  },
  {
    'id': '79fdeef5-68b3-4c55-80ea-18dda23b6251',
    'base_price': 9636,
    'date_from': '2023-08-12T21:00:00.740Z',
    'date_to': '2023-08-20T07:00:00.740Z',
    'destination_id': 'f0e67422-029e-4ab6-8a08-cb4e4a73ab4f',
    'is_favorite': false,
    'offers_id': [
      '6de67806-7158-4e9f-bd45-609f2691d9bc'
    ],
    'type': 'restaurant'
  },
  {
    'id': '20fe3bec-bae6-4c60-828e-0c441d3e2727',
    'base_price': 1200,
    'date_from': '2023-08-10T21:00:00.740Z',
    'date_to': '2023-08-19T07:00:00.740Z',
    'destination_id': '47d53e1d-61f4-403a-9da5-c1c5ceceabe9',
    'is_favorite': false,
    'offers_id': [],
    'type': 'sightseeing'
  },
  {
    'id': 'ba2f7968-eb7c-4f43-947c-993fb5794881',
    'base_price': 9987,
    'date_from': '2023-08-10T21:00:00.740Z',
    'date_to': '2023-08-19T09:00:00.740Z',
    'destination_id': 'ecf76770-ef8c-4e0f-8577-31d97e65afef',
    'is_favorite': false,
    'offers_id': [
      '79581c8a-8d39-4200-9c09-ae99e2f48e57'
    ],
    'type': 'flight'
  },
  {
    'id': '8f1e42b7-84eb-43ae-83d4-918aaecc4ed0',
    'base_price': 5087,
    'date_from': '2023-08-13T21:00:00.740Z',
    'date_to': '2023-08-20T00:00:00.740Z',
    'destination_id': 'f0e67422-029e-4ab6-8a08-cb4e4a73ab4f',
    'is_favorite': false,
    'offers_id': [
      'e267d32e-6887-4cdd-bdb9-f32c112675d5',
      'c101773c-fdd3-4477-ad7b-4aee876a86a7',
      '07d4135f-7198-4092-9eb7-486c3b964347',
      '70a6e1cf-c0ec-4abc-9ced-ad3b6fa008f7',
      'a0de29a8-b583-4dd7-9faa-5e8a4e6977c6'
    ],
    'type': 'ship'
  },
  {
    'id': 'b73612bd-bb47-4163-b254-cc2efdcc90de',
    'base_price': 7705,
    'date_from': '2023-08-15T21:00:00.740Z',
    'date_to': '2023-08-19T18:00:00.740Z',
    'destination_id': 'ecf76770-ef8c-4e0f-8577-31d97e65afef',
    'is_favorite': false,
    'offers_id': [
      '8839de17-df24-43da-86a4-8e5d1fa6c02c',
      'b6d170be-7c5f-4847-9cd1-9ae4ec919129'
    ],
    'type': 'bus'
  },
  {
    'id': 'ca080532-411e-4021-9517-93bb8b7ad7ea',
    'base_price': 4000,
    'date_from': '2023-08-12T21:00:00.740Z',
    'date_to': '2023-08-19T05:00:00.740Z',
    'destination_id': 'c76f204e-e81a-43d8-af41-39523197812a',
    'is_favorite': false,
    'offers_id': [
      'e267d32e-6887-4cdd-bdb9-f32c112675d5',
      'c101773c-fdd3-4477-ad7b-4aee876a86a7',
      '07d4135f-7198-4092-9eb7-486c3b964347',
      '70a6e1cf-c0ec-4abc-9ced-ad3b6fa008f7',
      'a0de29a8-b583-4dd7-9faa-5e8a4e6977c6'
    ],
    'type': 'ship'
  },
  {
    'id': '830784e9-2523-40a6-bcf6-5b171be583b7',
    'base_price': 6312,
    'date_from': '2023-08-07T21:00:00.740Z',
    'date_to': '2023-08-19T21:00:00.740Z',
    'destination_id': 'ecf76770-ef8c-4e0f-8577-31d97e65afef',
    'is_favorite': false,
    'offers_id': [],
    'type': 'drive'
  },
  {
    'id': 'f4717bb3-c612-41a3-9301-499f12a9ec88',
    'base_price': 3595,
    'date_from': '2023-08-10T21:00:00.740Z',
    'date_to': '2023-08-20T10:00:00.740Z',
    'destination_id': 'ffc2a911-11ae-4a3f-8e95-1f57eaaeb4eb',
    'is_favorite': true,
    'offers_id': [
      '3bfbc962-fbbe-4ab5-8aca-3f7589a72ed4',
      '6de67806-7158-4e9f-bd45-609f2691d9bc'
    ],
    'type': 'restaurant'
  },
  {
    'id': 'ae065222-1d0b-4e0e-a649-dbab757bb850',
    'base_price': 5664,
    'date_from': '2023-08-15T21:00:00.740Z',
    'date_to': '2023-08-20T11:00:00.740Z',
    'destination_id': 'e498faf6-f5b3-47a3-94ac-d8b27a5947c6',
    'is_favorite': false,
    'offers_id': [],
    'type': 'flight'
  },
  {
    'id': '868d5f05-665b-47c8-b11a-18b3338088b5',
    'base_price': 386,
    'date_from': '2023-08-14T21:00:00.740Z',
    'date_to': '2023-08-20T10:00:00.740Z',
    'destination_id': 'f0e67422-029e-4ab6-8a08-cb4e4a73ab4f',
    'is_favorite': true,
    'offers_id': [],
    'type': 'sightseeing'
  },
  {
    'id': '4843b4e9-ad8a-42cd-bbbe-faaec9919a4b',
    'base_price': 8072,
    'date_from': '2023-08-13T21:00:00.740Z',
    'date_to': '2023-08-19T11:00:00.740Z',
    'destination_id': '47d53e1d-61f4-403a-9da5-c1c5ceceabe9',
    'is_favorite': true,
    'offers_id': [
      '8839de17-df24-43da-86a4-8e5d1fa6c02c',
      'b6d170be-7c5f-4847-9cd1-9ae4ec919129'
    ],
    'type': 'bus'
  },
  {
    'id': 'ad565222-32c4-4c91-9cc7-300b7207c91f',
    'base_price': 6022,
    'date_from': '2023-08-08T21:00:00.740Z',
    'date_to': '2023-08-19T11:00:00.740Z',
    'destination_id': '47d53e1d-61f4-403a-9da5-c1c5ceceabe9',
    'is_favorite': true,
    'offers_id': [
      'f1ff4c01-0590-487d-a601-818dd934777b',
      'a1a87888-da15-4f4c-b564-978c937be4cc',
      'c8a1d6c9-1477-44fe-aa4f-5eaa79322f07',
      '599d56be-ff36-4104-9bf4-9431adc69c1a',
      '331b41eb-d3ad-4239-ba2b-6222f2362674'
    ],
    'type': 'check-in'
  },
  {
    'id': '6ea7387c-10ed-4076-91f0-768fb9f0d75c',
    'base_price': 2562,
    'date_from': '2023-08-08T21:00:00.740Z',
    'date_to': '2023-08-19T13:00:00.740Z',
    'destination_id': 'f0e67422-029e-4ab6-8a08-cb4e4a73ab4f',
    'is_favorite': true,
    'offers_id': [
      'c8a1d6c9-1477-44fe-aa4f-5eaa79322f07',
      '599d56be-ff36-4104-9bf4-9431adc69c1a',
      '331b41eb-d3ad-4239-ba2b-6222f2362674'
    ],
    'type': 'check-in'
  },
  {
    'id': '15975117-a768-4713-96ea-13d85f1d80b3',
    'base_price': 3690,
    'date_from': '2023-08-06T21:00:00.740Z',
    'date_to': '2023-08-19T22:00:00.740Z',
    'destination_id': 'ce470908-e9c4-48e2-9cac-9e66b1d10c9f',
    'is_favorite': false,
    'offers_id': [],
    'type': 'sightseeing'
  },
  {
    'id': 'dbfaad3c-cf71-49c3-ad80-1ddbf427fb10',
    'base_price': 900,
    'date_from': '2023-08-15T21:00:00.740Z',
    'date_to': '2023-08-20T20:00:00.740Z',
    'destination_id': '47d53e1d-61f4-403a-9da5-c1c5ceceabe9',
    'is_favorite': true,
    'offers_id': [
      '70a6e1cf-c0ec-4abc-9ced-ad3b6fa008f7',
      'a0de29a8-b583-4dd7-9faa-5e8a4e6977c6'
    ],
    'type': 'ship'
  }

];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export {getRandomPoint};
