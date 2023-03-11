import { Location } from 'shared/types'
import { Commodities, Company, TrackRecord, KYC, Office } from './company'

interface TraderCommon {
  id: number
  location: Location
  website: string
  rating: number
}

export interface Trader extends TraderCommon {
  name: string
  logo: string
  products_offered: string[]
  commodities: Commodities
}

export interface TraderDetail extends TraderCommon {
  company: Company
  products_offered: string[]
  offices: Office[]
  track_record: TrackRecord[]
  kyc: KYC[]
}
