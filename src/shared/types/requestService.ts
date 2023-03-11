import { SelectType } from 'shared/types'

export interface RequestService {
  product: string
  packing: SelectType<string>
  product_weight: string
  delivery_from: SelectType<string>
  delivery_to: SelectType<string>
  ready_to_load: string
  addition_information: string
  associated: Associated[]
  name: string
  contacts: Contacts
}

type Contacts = {
  email: string
  phone: string
  telegram: string
  whatsapp: string
}

export enum Associated {
  insurance = 'Insurance',
  inspectionServices = 'Inspection services',
  certification = 'Certification',
  customClearance = 'Custom clearance',
}
