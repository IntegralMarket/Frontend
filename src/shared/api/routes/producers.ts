import { AxiosPromise } from 'axios'
import {
  DefaultPaginationParams,
  AxiosPaginatedResponse,
} from 'shared/types/api'
import { Producer, ProducerDetail } from 'shared/types/producers'
import { CatalogItem, ProductFilterParams } from 'shared/types/products'
import { api, endpoints } from '..'

export const getProducers = (
  params: DefaultPaginationParams
): AxiosPromise<AxiosPaginatedResponse<Producer>> => {
  return api.get(endpoints.producers.list, {
    params,
  })
}

export const getProducerById = (id: number): AxiosPromise<ProducerDetail> => {
  return api.get(endpoints.producers.data(id))
}

export const getProducerCommodities = (
  id: number,
  params?: DefaultPaginationParams & Partial<any> // TODO
): AxiosPromise<AxiosPaginatedResponse<CatalogItem>> => {
  return api.get(endpoints.producers.commodities(id), { params })
}
