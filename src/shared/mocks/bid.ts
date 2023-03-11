//@ts-nocheck
import { Bid } from 'shared/types/bid'

export const bid_mocks: Bid[] = [
  {
    id: 1,
    mark: 'BY-365',
    grade_id: 1,
    product_type: 'HDPE',
    processing_method: ' Blow molding',
    other_preferred_grades: ['BY-123', 'BY-320', 'BY-800'],
    price: '1320',
    place_of_delivery: 'Uzbekistan, Tashkent',
    quantity: '0.26-0.16',
    lead_time: 'lead time',
    payment_terms: 'LC at sight',
    packing: 'Big bags',
    date_of_bid: '23.12.2022',
    deadline_of_rfp: '24.12.2022',
    author: 'Turplast',
    mfr: { weight: '1--1', value: '1' },
  },
  {
    id: 1,
    mark: 'BY-365',
    grade_id: 1,
    product_type: 'string',
    processing_method: ' Blow molding',
    other_preferred_grades: ['BY-123', 'BY-320', 'BY-800'],
    price: '1320',
    place_of_delivery: 'Uzbekistan, Tashkent',
    quantity: '0.26-0.16',
    lead_time: 'lead time',
    payment_terms: 'LC at sight',
    packing: 'Big bags',
    date_of_bid: '23.12.2022',
    deadline_of_rfp: '24.12.2022',
    author: 'Turplast',
    mfr: { weight: '1--1', value: '1' },
  },
]