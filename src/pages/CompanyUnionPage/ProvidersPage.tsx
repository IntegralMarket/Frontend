import { FC, useEffect, useState } from 'react'

import { CompaniesList } from 'features'

import { useAppDispatch, useAppSelector, usePagination } from 'shared/hooks'
import { getProviders } from 'shared/api/routes/providers'
import { setProvidersStore } from 'store/slices/providers'
import { Roles } from 'shared/types'

export const ProvidersPage: FC = () => {
  const dispatch = useAppDispatch()
  const providersList = useAppSelector(state => state.providers.providers)

  const [pagination, updatePaginationCount] = usePagination()

  const loadProviders = async () => {
    try {
      const { data } = await getProviders({
        limit: pagination.limit,
        offset: pagination.offset,
      })
      updatePaginationCount(data.count)
      dispatch(setProvidersStore(data.results))
    } catch (error) {
      console.error(error)
    }
  }

  const handleShowMore = () => loadProviders()

  useEffect(() => {
    loadProviders()
  }, [])

  return (
    <CompaniesList
      key={0}
      companyType={Roles.PROVIDER}
      list={providersList}
      filters={{
        services: providersList.map(item => {
          return {
            id: item.id,
            values: Object.values(item.services_offered).map(i => i.name),
          }
        }),

        countries: providersList.map(item => {
          return { id: item.id, values: item.location?.country.name }
        }),
      }}
      pagination={pagination}
      onShowMore={handleShowMore}
    />
  )
}
