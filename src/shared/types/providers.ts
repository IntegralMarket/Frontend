import { Location, Meta } from 'shared/types'
import { Company, Office } from './company'

interface ProviderCommon {
  id: number
  company: Company
  location: Location
  services_offered: Meta[]
  offices: Office[]
  website: string
}

export interface Provider extends ProviderCommon {}

export interface ProviderDetail extends ProviderCommon {}
