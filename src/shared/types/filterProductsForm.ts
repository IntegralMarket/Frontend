import { MFR, SelectType } from 'shared/types'

export interface FilterProductsForm {
  delivery_to: string[] | null
  stocked_in: string[] | null
  type: SelectType<string>
  method: SelectType<string>
  mfr: MFR
  origin: SelectType<string>
  producer: SelectType<string>
  application: SelectType<string>
  name: string | null
}
