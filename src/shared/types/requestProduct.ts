import { Meta, MFR, SelectOption, SelectType } from 'shared/types'
import { ProductDetail } from './products'

//-------------------------
export type RequestQuoteProductCommon = {
  type_of_service: string
  product: string
  product_weight: number
  city_from: string
  city_to: string
  ready_to_load: string | [string, string]
  addition_info: string
  country: SelectOption[] | string
  packing: SelectOption[] | number
}

export interface RequestQuoteProduct extends RequestQuoteProductCommon {
  document?: FileList
  additional_service_required: SelectOption[]
  country: string
  packing: number
}
export interface RequestQuoteProductPostResponse
  extends RequestQuoteProductCommon {
  id: number
  created_at: string
  country: string
  packing: number
  document?: string
  ready_to_load: string
  additional_service_required: string
}

type Document = {
  document_name: string
}

export interface RequestAskDocument extends ProductDetail {
  grade: number
  documents: Document[]
  additional_info: string
}

export interface RequestAskDocumentPostResponse extends RequestAskDocument {
  id: number
  created_at: string
}

export interface RequestSampleModalForm {
  products_produced: string
  company_name: string
  number_of_samples: number
  company_address: string
  expected_annual_usage: string
  purchase: string
  addition_info: string
  grade: number
  type_user: SelectOption[] | number
}

export interface RequestSampleModalFormPostResponse
  extends RequestSampleModalForm {
  id: number
  created_at: string
}

export interface RequestSendOfferModalForm extends RequestFormCommon {
  grade?: string
  price?: number
  addition_info?: string
  document?: FileList
  packing?: number
}

export interface RequestSendOfferModalFormPostResponse
  extends RequestSendOfferModalForm {
  id: number
  created_at: string
}
export interface MainTypes {
  mfr_value_input: MFR
  product_type: SelectType<string>
  processing_method: SelectType<string>
}

export interface RequestFormCommon {
  place_of_delivery?: string
  quantity?: string
  lead_time?: string
  incoterms?: number | Incoterms[]
  terms_of_payment?: number | PaymentTypes[]
  document?: FileList
  when_do_you_plan_to_purchase?: string
}
export interface RequestAskForQuoteForm extends RequestFormCommon {
  grade: string
  main_types: MainTypes[]
  //product_type?: number
  //processing_method?: number
  //mfr_value_input?: string
  preferred_grades?: string[] | Meta[]
}

export interface RequestBuyForm extends RequestFormCommon {
  grade?: string
  price?: number
  additional_info?: string
  packing?: number
  preferred_grades?: string[] | Meta[]
}

//-----------------------
type RequestProductCommon = {
  place_of_delivery: string
  quantity: string
  delivery_period: string | [string, string]
  addition_information: string
  preferred_grades: Meta[]
  main_types: MainTypes[]
  packing: SelectOption[]
  price?: number
  upload_document?: FileList
}

//export interface RequestProduct extends RequestProductCommon {
//  incoterms: Incoterms[]
//  terms_of_payment: PaymentTypes[]
//}
//export interface RequestProductPrePost extends RequestProductCommon {
//  product_id?: number
//  incoterms: string
//  terms_of_payment: string
//}

export type Contacts = {
  email: string
  phone: string
  telegram: string
  whatsapp: string
}

export interface RequestProductPost extends Contacts {
  products: {
    product: number | null
  }[]
  types: Partial<RequestProductType>[]
  place_of_delivery: string
  quantity: string
  incoterms: string
  delivery_period: string
  terms_of_payment: string
  addition_information: string
  preferred_grades: string
}

export type RequestProductType = {
  mfr: string
  product_type: number | null
  processing_method: number | null
}

export interface RequestProductPostResponse extends RequestProductPost {
  id: number
  created_at: string
}

export enum Incoterms {
  CFR = 'CFR',
  CPT = 'CPT',
  FOB = 'FOB',
  CIF = 'CIF',
  FCA = 'FCA',
}

export enum PaymentTypes {
  onlinePayment = 'Online payment',
  bankGuarantee = 'Bank Guarantee',
  bankTransfer = 'Bank Transfer',
  letterOfCredit = 'Letter of credit',
}
