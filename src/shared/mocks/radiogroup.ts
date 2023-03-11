import { Incoterms, PaymentTypes } from './../types/requestProduct'
import { SelectOption, SortOptions } from 'shared/types'
import { Associated } from 'shared/types/requestService'

export const incotermsList: SelectOption[] = [
  { value: Incoterms.CFR, label: Incoterms.CFR },
  { value: Incoterms.CPT, label: Incoterms.CPT },
  { value: Incoterms.FOB, label: Incoterms.FOB },
  { value: Incoterms.CIF, label: Incoterms.CIF },
  { value: Incoterms.FCA, label: Incoterms.FCA },
]

export const termsOfPayment: SelectOption[] = [
  { value: PaymentTypes.onlinePayment, label: PaymentTypes.onlinePayment },
  { value: PaymentTypes.bankGuarantee, label: PaymentTypes.bankGuarantee },
  { value: PaymentTypes.bankTransfer, label: PaymentTypes.bankTransfer },
  { value: PaymentTypes.letterOfCredit, label: PaymentTypes.letterOfCredit },
]

export const associatedList: Array<Associated> = [
  Associated.insurance,
  Associated.inspectionServices,
  Associated.certification,
  Associated.customClearance,
]

export const sortOptions: Array<{ value: SortOptions; label: string }> = [
  { value: SortOptions.price, label: 'Price: ▲' },
  { value: SortOptions.d_price, label: 'Price: ▼' },
  { value: SortOptions.rating, label: 'Rating: ▲' },
  { value: SortOptions.d_rating, label: 'Rating: ▼' },
  { value: SortOptions.validate_date, label: 'Date of validity: ▲' },
  { value: SortOptions.d_validate_date, label: 'Date of validity: ▼' },
]
