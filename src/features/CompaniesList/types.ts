import { SelectOption, SelectType } from 'shared/types'
import { Buyer } from 'shared/types/buyers'
import { Producer } from 'shared/types/producers'
import { Provider } from 'shared/types/providers'
import { Trader } from 'shared/types/traders'

export type CompanyType = Producer | Provider | Trader | Buyer

export type FiltersObject = {
  [key: string]: { id: number; values: string | string[] | undefined }[]
}

export type SelectOptionsObject = {
  [key: string]: SelectOption[]
}

export type StateOptionsObject = {
  [key: string]: SelectType<string>
}
