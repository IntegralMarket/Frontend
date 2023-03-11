import { AxiosPromise } from 'axios'
import {
  DefaultPaginationParams,
  AxiosPaginatedResponse,
} from 'shared/types/api'
import { CatalogItem, ProductFilterParams } from 'shared/types/products'
import { Trader, TraderDetail } from 'shared/types/traders'
import { api, endpoints } from '..'
import { Offer } from 'shared/types/offer'
import { Bid } from 'shared/types/bid'

export const getSellers = (
  params: DefaultPaginationParams
): AxiosPromise<AxiosPaginatedResponse<Trader>> => {
  return api.get(endpoints.sellers.list, {
    params,
  })
}

export const getSellerProfile = (id: number): AxiosPromise<TraderDetail> => {
  return api.get(endpoints.sellers.profile(id))
}

export const getSellerOffers = (
  id: number,
  params?: DefaultPaginationParams
): AxiosPromise<AxiosPaginatedResponse<Offer>> => {
  return api.get(endpoints.sellers.offers(id), {
    params,
  })
}

export const getSellerCatalog = (
  id: number,
  params?: DefaultPaginationParams & Partial<any> // TODO
): AxiosPromise<AxiosPaginatedResponse<CatalogItem>> => {
  return api.get(endpoints.sellers.catalog(id), {
    params,
  })
}

export const getSellerBids = (
  id: number,
  params?: DefaultPaginationParams
): AxiosPromise<AxiosPaginatedResponse<Bid>> => {
  return api.get(endpoints.sellers.bids(id), {
    params,
  })
}
