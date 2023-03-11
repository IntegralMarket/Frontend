import { AxiosPromise } from 'axios'
import {
  DefaultPaginationParams,
  AxiosPaginatedResponse,
} from 'shared/types/api'
import { Provider, ProviderDetail } from 'shared/types/providers'
import { api, endpoints } from '..'

export const getProviders = (
  params: DefaultPaginationParams
): AxiosPromise<AxiosPaginatedResponse<Provider>> => {
  return api.get(endpoints.providers.list, {
    params,
  })
}

export const getProviderById = (id: number): AxiosPromise<ProviderDetail> => {
  return api.get(endpoints.providers.data(id))
}
