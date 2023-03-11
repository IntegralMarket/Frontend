import { Country, Meta, SortOptions } from 'shared/types'
import { Bid } from './bid'
import { Offer } from './offer'
import { Trade as TradeType } from './index'
interface ProductCommon extends Meta {
  prices: Price[]
  producer: ProducerBrief
  trader: TraderBrief
  mfr: {
    weight: string
    value: string
  } | null
  density: string
  vst: string
  application_text: string
  cas: string
  hs_code: string
  created_at: string
  origin: Country | null
  show_on_page: boolean
}

export interface Product extends ProductCommon {
  processing_method: string
  applications: string[]
  product_type: string
}

export interface ProductDetail extends ProductCommon {
  processing_method: ProcessingMethod
  applications: Applications[]
  product_type: ProductType
  availabilities: Availabilities
  extra_fields: ExtraField[]
  description_extra_fields: ExtraField[]
}

export interface GradeDetail {
  id: number
  mark: string
  mfr: string
  vst: string
  additional_info: string[]
  cas: string
  author: TraderBrief
  has_bids: boolean
  has_offers: boolean
  hs_code: string
  origin: string
  producer: string
  get_applications_str: string
  processing_method: number
  additional_specifications: additionalField[]
  documents: string[]
  product_type: Meta // should be added in API, check TODO
}

export interface ProductFilterParams {
  valid_prices_only: string
  mfr: string
  place_of_delivery: string
  place_of_shipment: string
  name: string // TODO should be obsolete
  mark: string
  trader_id__in: string
  producer_id__in: string
  buyer_id__in: number
  product_type_id__in: string
  processing_method_id__in: string
  applications__in: string
  origin: string
  ordering: SortOptions
  trade?: TradeType //internal param
}

export interface CatalogFilterParams {
  valid_prices_only: string
  mfr: string
  place_of_delivery: string
  place_of_shipment: string
  name: string // TODO should be obsolete
  mark: string
  trader_id__in: string
  producer_id__in: string
  buyer_id__in: number
  product_type_id__in: string
  processing_method_id__in: string
  applications__id__in: string
  origin_id__in: string
  ordering: SortOptions
}

type ProducerBrief = Meta & {
  logo: string
  location: string
  email: string
  phone: string
  website: string
}

export type TraderBrief = Meta & {
  logo: string
  rating: number
  location?: string // TODO this might be obsolete
  country?: string
}

export type Price = {
  country: CountryLocation
  incoterm: string
  price: string
  validate_date: number
  delivery_period: number
  quantity: number
}

export type Proposal = Price & Meta & { isBid?: boolean; trader: TraderBrief } // one offer/bid can have several proposals with price, quantity etc.

//type Document = {
//  file: string
//  filename: string
//}

type Availabilities = {
  packing_pieces: number | null
  length: number | null
  width: number | null
  height: number | null
  gross_weight: number | null
  net_weight: number | null
}

type ExtraField = {
  field_name: string
  field_value: string
}

type additionalField = {
  title: string
  value: string
}

type CountryLocation = Country & {
  ports: {
    city: string
    name: string
    position: string
  }[]
}

type ProductType = Meta
type ProcessingMethod = Meta
type Applications = Meta

export type Trade = {
  offers: Offer[]
  bids: Bid[]
}

export type MapProposals = {
  [locationId: number]: Trade
}

export type MFR = {
  value: string
  weight: `${number}--${number}`
}

export interface CatalogItem {
  id: number
  mark: string
  processing_method: string
  product_type: Meta
  mfr: MFR
  density: string
  applications: string
  offers: boolean
  bids: boolean
}
