import { Location } from 'shared/types'
import { Commodities, Company, KYC, Office, TrackRecord } from './company'

interface ProducerCommon {
  id: number
  location: Location
  website: string
  // TODO replace name to 'exchange' or 'market_website'
  how_to_by: string
}

export interface Producer extends ProducerCommon {
  name: string
  logo: string
  products_count: number
  commodities: Commodities
  phone: string
  email: string
}

export interface ProducerDetail extends ProducerCommon {
  company: Company
  products_offered: string[]
  offices: Office[]
  track_record: TrackRecord[]
  kyc: KYC[]
}
