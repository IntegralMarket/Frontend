import { iconVariants } from 'components/Icon/utils'

export enum Roles {
  SELLER = 'trader', // rename to seller
  BUYER = 'buyer',
  PRODUCER = 'producer',
  PROVIDER = 'provider',
}

export enum Trade {
  OFFER = 'offers',
  BID = 'bids',
}

export enum TradeIndexed {
  OFFER,
  BID,
}

export type IconType = typeof iconVariants[number]

export type Error = {
  type: string
  message?: string
}

export type SelectOption = {
  value: string
  label: string
}
export type SelectType<T = SelectOption> = T | T[] | null

export type MFR = [number | null, number | null]

export enum View {
  grid = 'grid',
  list = 'list',
  map = 'map',
  compare = 'compare',
}

export enum SortOptions {
  price = 'price',
  d_price = '-price',
  rating = 'rating',
  d_rating = '-rating',
  validate_date = 'validate_date',
  d_validate_date = '-validate_date',
}

export type PaginationType = {
  count: number
  limit: number
  offset: number
}

export interface Meta {
  id: number
  name: string
}

export type Country = Meta
export type City = Meta
export type Location = {
  country: Country
  city: City
} | null
