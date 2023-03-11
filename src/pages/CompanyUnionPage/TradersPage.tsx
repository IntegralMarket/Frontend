import { FC, useEffect } from 'react'

import { CompaniesList } from 'features'

import { useAppDispatch, useAppSelector, usePagination } from 'shared/hooks'
import { getSellers } from 'shared/api/routes/sellers'
import { setTraders } from 'store/slices/traders'
import { Roles } from 'shared/types'

export const TradersPage: FC = () => {
  const dispatch = useAppDispatch()
  const tradersList = useAppSelector(state => state.traders.traders)

  const [pagination, updatePaginationCount] = usePagination()

  const loadTraders = async () => {
    try {
      const { data } = await getSellers({
        limit: pagination.limit,
        offset: pagination.offset,
      })
      updatePaginationCount(data.count)
      dispatch(setTraders(data.results))
    } catch (error) {
      console.error(error)
    }
  }

  const handleShowMore = () => loadTraders()

  useEffect(() => {
    loadTraders()
  }, [])

  return (
    <CompaniesList
      key={0}
      companyType={Roles.SELLER}
      list={tradersList}
      filters={{
        Commodities: tradersList.map(item => {
          return {
            id: item.id,
            values: Object.values(item.commodities)
              .flat()
              .map(item => item.name),
          }
        }),

        Countries: tradersList.map(item => {
          return { id: item.id, values: item.location?.country.name }
        }),
      }}
      pagination={pagination}
      onShowMore={handleShowMore}
    />
  )
}
