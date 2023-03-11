import { City, Country, Meta } from './index'

export type Commodities = {
  [key: string]: Meta[]
}

export type FilterCompany = Meta & { logo: string }

export type TrackRecord = {
  name: string
  supplies: number
  countries: Meta[]
  ports: Meta[]
} | null

export type Company = Meta & {
  logo: string
  number: string
  legal_address: string
  industry: string
  nature_of_business: string
  number_of_employees: number
  sales: string
  date_of_verification: string
}

export type Office = {
  id: number
  country: Country
  city: City
  employees: Employee[]
  head_office: boolean
  address: string
  position?: string
  phone: string
  fax: string
  email: string
}

export type Employee = {
  id: number
  avatar: string
  fullname: string
  position: string
  phone: string
  email: string
}

export type KYC = {
  file: string
  filename: string
  verified: boolean
  updated_at: string
}
