import { Offer } from 'shared/types/offer'
import { Incoterms } from 'shared/types/requestProduct'
// @ts-ignore
export const offer: Offer = {
  id: 1,
  grade_id: 2,
  mark: 'BY250',
  producer: 'Producer',
  product_type: 'product_type',
  processing_method: 'processing_method',
  mfr: { value: 'value', weight: `${5}--${5}` },
  price: '1000',
  // @ts-ignore
  place_of_shipment: 'place_of_shipment',
  place_of_delivery: 'Samarkand, Uzbekistan',
  quantity: '3500',
  lead_time: '10',
  payment_terms: 'payment_terms',
  packing: 'packing',
  date_of_offer: 'date_of_offer',
  offer_validity: 'offer_validity',
  trader: { id: 1, name: 'Name', logo: 'logo', rating: 5 },
  incoterms: Incoterms['CPT'],
}
