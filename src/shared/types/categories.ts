import { Meta } from 'shared/types'

export interface CategoryDetail {
  delivery_to: Meta[]
  stocked_in: Meta[]
  product_types: Meta[]
  processing_methods: Meta[]
  buyers: Meta[]
  origin?: Meta[]
  applications: Meta[]
  incoterms: Meta[]
  packing: Meta[]
  terms_of_payments: Meta[]
  producers: CompanyFilter[]
  traders: CompanyFilter[]
}

type CompanyFilter = Meta & {
  logo: string
}
