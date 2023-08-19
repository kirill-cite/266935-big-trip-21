import { getRandomArrayElement } from "../utils";

const mockPoints = [
  {
    'id': 'c3726324-f37c-4dd8-87c7-9346f676f174',
    'base_price': 4530,
    'date_from': '2023-08-13T21:00:00.739Z',
    'date_to': '2023-08-20T21:00:00.739Z',
    'destination': '6ec1a8cc-0f63-4d44-8c55-134b409e8f22',
    'is_favorite': true,
    'offers': [
      '7097ad4e-43ab-4789-8f78-2db23712a70a'
    ],
    'type': 'drive'
  },
  {
    'id': '18a8533e-62fd-44ea-a01c-3129c3d31537',
    'base_price': 2841,
    'date_from': '2023-08-08T21:00:00.739Z',
    'date_to': '2023-08-19T11:00:00.739Z',
    'destination': 'e498faf6-f5b3-47a3-94ac-d8b27a5947c6',
    'is_favorite': true,
    'offers': [],
    'type': 'check-in'
  },
  {
    'id': '68a594f5-628e-4aa4-9845-de5fd1b0bd8e',
    'base_price': 5955,
    'date_from': '2023-08-12T21:00:00.739Z',
    'date_to': '2023-08-19T13:00:00.739Z',
    'destination': 'ecf76770-ef8c-4e0f-8577-31d97e65afef',
    'is_favorite': false,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': 'ad7d013f-9cd6-4359-9291-8fae084e182a',
    'base_price': 5235,
    'date_from': '2023-08-12T21:00:00.739Z',
    'date_to': '2023-08-19T16:00:00.739Z',
    'destination': '47d53e1d-61f4-403a-9da5-c1c5ceceabe9',
    'is_favorite': true,
    'offers': [
      'c101773c-fdd3-4477-ad7b-4aee876a86a7',
      '07d4135f-7198-4092-9eb7-486c3b964347',
      '70a6e1cf-c0ec-4abc-9ced-ad3b6fa008f7',
      'a0de29a8-b583-4dd7-9faa-5e8a4e6977c6'
    ],
    'type': 'ship'
  },
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export {getRandomPoint};
