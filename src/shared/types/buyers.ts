import { Location, Meta } from 'shared/types'
import { Commodities, Company, Office } from 'shared/types/company'

export interface Buyer extends Meta {
  logo: string
  products_required: number
  products_offered: string[]
  commodities: Commodities
  location: Location
  website: string
  rating: number
}

export interface BuyerDetails {
  readonly id: number
  company: Company
  products_offered: string[]
  offices: Office[]
  track_record: string[]
  kyc: string[]
  location: Location
  website: string
  rating: number
}
