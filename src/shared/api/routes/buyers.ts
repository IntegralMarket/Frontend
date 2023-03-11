import { AxiosPromise } from 'axios'
import {
  DefaultPaginationParams,
  AxiosPaginatedResponse,
} from 'shared/types/api'
import { api, endpoints } from '..'
import { Buyer, BuyerDetails } from 'shared/types/buyers'
import { Bid } from 'shared/types/bid'
import { Meta } from 'shared/types'

export const getBuyers = (
  params: DefaultPaginationParams
): AxiosPromise<AxiosPaginatedResponse<Buyer>> => {
  return api.get(endpoints.buyers.list, {
    params,
  })
}

export const getBuyerProfile = (id: number): AxiosPromise<BuyerDetails> => {
  return api.get(endpoints.buyers.profile(id))
}

export const getBuyerBids = (
  id: number,
  params: DefaultPaginationParams
): AxiosPromise<AxiosPaginatedResponse<Bid>> => {
  return api.get(endpoints.buyers.bids(id), {
    params,
  })
}

export const getBuyerTypes = (): AxiosPromise<AxiosPaginatedResponse<Meta>> => {
  return api.get(endpoints.filters.buyer_types)
}
