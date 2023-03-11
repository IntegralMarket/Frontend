import { GradeDetail, MFR } from './products'

type MetaGrade = {
  id: number
  mark: string
}
export interface Bid {
  id: number
  grade_id: number
  grade: GradeDetail
  mark: string
  product_type: string
  processing_method: string
  mfr: MFR
  other_preferred_grades: MetaGrade[]
  price: string
  place_of_delivery: string
  incoterms: string
  quantity_min: number | null
  quantity_max: number | null
  lead_time: string
  payment_terms: string
  packing: string
  date_of_bid: string
  deadline_of_rfp: string
  author: {
    country: string
    id: number
    is_buyer: boolean
    is_trader: boolean
    logo: string
    name: string
  }
  results: [] | null
}

export interface BidDetail {
  readonly id: number
  price: string
  place_of_delivery: string
  quantity: string
  lead_time: string
  payment_terms: string
  packing: string
  date_of_bid: string
  deadline_of_rfp: string
  grade: {
    id: number
    mark: string
    mfr: string
    vst: string
    additional_info: string[]
    cas: string
    hs_code: string
    origin: string
    producer: string
    get_applications_str: string
    processing_method: number
    additional_specifications: string[]
    documents: string[]
    has_offers: boolean
    has_bids: boolean
  }
  author: string
  other_preferred_grades: string[]
}
