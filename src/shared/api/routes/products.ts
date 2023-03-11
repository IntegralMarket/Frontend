import { AxiosPromise } from 'axios'
import {
  AxiosPaginatedResponse,
  DefaultPaginationParams,
} from 'shared/types/api'
import { GradeDetail, ProductFilterParams } from 'shared/types/products'
import {
  RequestProductPost,
  RequestProductPostResponse,
} from 'shared/types/requestProduct'
import { api, endpoints } from '..'
import { Bid } from 'shared/types/bid'
import { Offer } from 'shared/types/offer'
import { Meta } from 'shared/types'
import { FilterCompany } from 'shared/types/company'

export type OfferResponse = AxiosPromise<
  AxiosPaginatedResponse<Offer> & {
    sellers: FilterCompany[]
    producers: FilterCompany[]
  }
>

export type BidResponse = AxiosPromise<
  AxiosPaginatedResponse<Bid> & {
    buyers: FilterCompany[]
  }
>

export const getOffers = (
  params: DefaultPaginationParams & Partial<ProductFilterParams>
): OfferResponse =>
  api.get(endpoints.polymers.offers, {
    params,
  })

export const getBids = (
  params: DefaultPaginationParams & Partial<ProductFilterParams>
): BidResponse =>
  api.get(endpoints.polymers.bids, {
    params,
  })

export const getGradeOffers = (
  id: number
): AxiosPromise<AxiosPaginatedResponse<Offer>> =>
  api.get(endpoints.polymers.grade_offers(id))

export const getGradeBids = (
  id: number
): AxiosPromise<AxiosPaginatedResponse<Bid>> =>
  api.get(endpoints.polymers.grade_bids(id))

export const getProductData = (id: number): AxiosPromise<GradeDetail> =>
  api.get(endpoints.polymers.grade(id))

export const getProductOffer = (
  // TODO getProductOffers
  id: number
): AxiosPromise<AxiosPaginatedResponse<Offer>> =>
  api.get(`/polymers/grades/${id}/offers`)

export const getProductBid = (
  // TODO getProductBids
  id: number
): AxiosPromise<AxiosPaginatedResponse<Bid>> =>
  api.get(`/polymers/grades/${id}/bids`)

export const getProductApplications = (
  params?: DefaultPaginationParams
): AxiosPromise<AxiosPaginatedResponse<Meta>> => {
  return api.get(endpoints.polymers.filters.applications, { params })
}
export const getProductIncoterms = (
  params?: DefaultPaginationParams
): AxiosPromise<AxiosPaginatedResponse<Meta>> => {
  return api.get(endpoints.polymers.filters.incoterms, { params })
}
export const getProductPacking = (
  params?: DefaultPaginationParams
): AxiosPromise<AxiosPaginatedResponse<Meta>> => {
  return api.get(endpoints.polymers.filters.packing, { params })
}
export const getProductProcessingMethods = (
  params?: DefaultPaginationParams
): AxiosPromise<AxiosPaginatedResponse<Meta>> => {
  return api.get(endpoints.polymers.filters.processing_methods, { params })
}
export const getProductTypes = (
  params?: DefaultPaginationParams
): AxiosPromise<AxiosPaginatedResponse<Meta>> => {
  return api.get(endpoints.polymers.filters.product_types, { params })
}
export const getProductPaymentTerms = (
  params?: DefaultPaginationParams
): AxiosPromise<AxiosPaginatedResponse<Meta>> => {
  return api.get(endpoints.polymers.filters.terms_of_payments, { params })
}
export const getProductOrigins = (
  params?: DefaultPaginationParams
): AxiosPromise<AxiosPaginatedResponse<Meta>> => {
  return api.get(endpoints.filters.origins, { params })
}

export const postRequestProduct = (
  data: Partial<RequestProductPost>
): AxiosPromise<RequestProductPostResponse> => {
  return api.post(endpoints.polymers.request, data)
}
