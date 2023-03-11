import { GradeDetail, MFR, TraderBrief } from './products'
import { Incoterms } from './requestProduct'

export interface Offer {
  readonly id: number
  readonly grade_id: number
  mark: string
  producer: string
  grade: GradeDetail
  product_type: string
  processing_method: string
  mfr: MFR
  price: string
  place_of_shipment: string[]
  place_of_delivery: string
  quantity_min: number | null
  quantity_max: number | null
  lead_time: string
  payment_terms: string
  packing: string
  date_of_offer: string
  offer_validity: string
  trader: TraderBrief
  incoterms: Incoterms
  results: [] | null
}
