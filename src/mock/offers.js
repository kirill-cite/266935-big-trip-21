const mockOffers = [
  {
    'type': 'taxi',
    'offers': [
      {
        'id': '20c5a96b-da33-422e-b8cc-2459ad68fd19',
        'title': 'Upgrade to a business class',
        'price': 30
      },
      {
        'id': 'd4243791-c390-45a9-9ee0-f3aef47ef656',
        'title': 'Choose the radio station',
        'price': 128
      },
      {
        'id': '275f61fa-9bf8-4cf6-a213-3256bbe74d28',
        'title': 'Choose temperature',
        'price': 121
      },
      {
        'id': 'a8775645-70cc-472e-a039-18685e1e3ed9',
        'title': 'Drive quickly, I\'m in a hurry',
        'price': 188
      },
      {
        'id': 'aafcb1d7-bab6-4fcb-805a-b70c63265bd3',
        'title': 'Drive slowly',
        'price': 197
      }
    ]
  },
  {
    'type': 'bus',
    'offers': [
      {
        'id': '5bf50691-7538-4197-b861-dbfd72b49c6e',
        'title': 'Infotainment system',
        'price': 37
      },
      {
        'id': '8839de17-df24-43da-86a4-8e5d1fa6c02c',
        'title': 'Order meal',
        'price': 131
      },
      {
        'id': 'b6d170be-7c5f-4847-9cd1-9ae4ec919129',
        'title': 'Choose seats',
        'price': 110
      }
    ]
  },
  {
    'type': 'train',
    'offers': [
      {
        'id': '7a9264cf-be30-4421-a674-1ad802cbd8d4',
        'title': 'Book a taxi at the arrival point',
        'price': 123
      },
      {
        'id': '3ff1e258-81b1-4a87-b66c-b6ee375ff99b',
        'title': 'Order a breakfast',
        'price': 74
      },
      {
        'id': 'de83da27-33e6-4f22-b35b-b0f952fedb40',
        'title': 'Wake up at a certain time',
        'price': 139
      }
    ]
  },
  {
    'type': 'flight',
    'offers': [
      {
        'id': '2cdb1a58-90fe-463c-8fb2-8833d67ecc6f',
        'title': 'Choose meal',
        'price': 163
      },
      {
        'id': '7f2da114-3067-489a-9a4f-38d5bae4fd84',
        'title': 'Choose seats',
        'price': 63
      },
      {
        'id': '4ab32a3c-a544-41ea-980d-a6b2a856b13b',
        'title': 'Upgrade to comfort class',
        'price': 102
      },
      {
        'id': '7c30ca15-3031-4ca5-a7f9-4e0b93dd86e5',
        'title': 'Upgrade to business class',
        'price': 160
      },
      {
        'id': 'a944666f-ac63-4425-b9f4-60fa49ee5c94',
        'title': 'Add luggage',
        'price': 30
      },
      {
        'id': '79581c8a-8d39-4200-9c09-ae99e2f48e57',
        'title': 'Business lounge',
        'price': 163
      }
    ]
  },
  {
    'type': 'check-in',
    'offers': [
      {
        'id': 'f1ff4c01-0590-487d-a601-818dd934777b',
        'title': 'Choose the time of check-in',
        'price': 143
      },
      {
        'id': 'a1a87888-da15-4f4c-b564-978c937be4cc',
        'title': 'Choose the time of check-out',
        'price': 75
      },
      {
        'id': 'c8a1d6c9-1477-44fe-aa4f-5eaa79322f07',
        'title': 'Add breakfast',
        'price': 95
      },
      {
        'id': '599d56be-ff36-4104-9bf4-9431adc69c1a',
        'title': 'Laundry',
        'price': 115
      },
      {
        'id': '331b41eb-d3ad-4239-ba2b-6222f2362674',
        'title': 'Order a meal from the restaurant',
        'price': 152
      }
    ]
  },
  {
    'type': 'sightseeing',
    'offers': []
  },
  {
    'type': 'ship',
    'offers': [
      {
        'id': 'a2a34998-5581-4c44-af04-c902a86390ea',
        'title': 'Choose meal',
        'price': 169
      },
      {
        'id': 'e267d32e-6887-4cdd-bdb9-f32c112675d5',
        'title': 'Choose seats',
        'price': 47
      },
      {
        'id': 'c101773c-fdd3-4477-ad7b-4aee876a86a7',
        'title': 'Upgrade to comfort class',
        'price': 122
      },
      {
        'id': '07d4135f-7198-4092-9eb7-486c3b964347',
        'title': 'Upgrade to business class',
        'price': 72
      },
      {
        'id': '70a6e1cf-c0ec-4abc-9ced-ad3b6fa008f7',
        'title': 'Add luggage',
        'price': 104
      },
      {
        'id': 'a0de29a8-b583-4dd7-9faa-5e8a4e6977c6',
        'title': 'Business lounge',
        'price': 85
      }
    ]
  },
  {
    'type': 'drive',
    'offers': [
      {
        'id': '68ec8560-e29e-4f72-843d-b964af2e8f9e',
        'title': 'With automatic transmission',
        'price': 196
      },
      {
        'id': '7097ad4e-43ab-4789-8f78-2db23712a70a',
        'title': 'With air conditioning',
        'price': 117
      }
    ]
  },
  {
    'type': 'restaurant',
    'offers': [
      {
        'id': '3bfbc962-fbbe-4ab5-8aca-3f7589a72ed4',
        'title': 'Choose live music',
        'price': 165
      },
      {
        'id': '6de67806-7158-4e9f-bd45-609f2691d9bc',
        'title': 'Choose VIP area',
        'price': 94
      }
    ]
  }
];

function getAllOffers() {
  return mockOffers;
}

export {getAllOffers};
