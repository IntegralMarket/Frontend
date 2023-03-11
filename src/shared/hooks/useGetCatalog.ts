import { useEffect, useState } from 'react'
import { getProducerCommodities } from 'shared/api/routes/producers'
import { getSellerCatalog } from 'shared/api/routes/sellers'
import { Roles } from 'shared/types'
import { CatalogItem, ProductFilterParams } from 'shared/types/products'
import { usePagination } from './usePagination'
import { DEFAULT_FETCH_COUNT } from 'shared/constants/fetchCards'

export function useGetCatalog(
  id: number,
  query: Partial<ProductFilterParams>,
  params?: Partial<ProductFilterParams>,
  role?: Roles
): {
  catalog: CatalogItem[]
  isLoading: boolean
  handleReady: (reset?: boolean) => void
  hasMore: boolean
  reset: () => void
} {
  const [catalog, setCatalog] = useState<CatalogItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isNewArray, setIsNewArray] = useState(false)
  const [pagination, updatePaginationCount, resetPaginationOffset] =
    usePagination()
  const [isReady, setIsReady] = useState(true)

  const hasMore = pagination.count > catalog.length
  const handleReady = (reset?: boolean) => {
    if (reset) {
      setIsNewArray(true)
      resetPaginationOffset()
    }
    setIsReady(true)
  }

  useEffect(() => {
    const loadProducts = async () => {
      const request =
        role === Roles.PRODUCER ? getProducerCommodities : getSellerCatalog
      setIsReady(false)
      try {
        setIsLoading(true)
        const { data } = await request(id, {
          valid_prices_only: query.valid_prices_only,
          mfr: query.mfr,
          place_of_delivery: query.place_of_delivery,
          place_of_shipment: query.place_of_shipment,
          mark: params?.name || query.name,
          trader_id__in: params?.trader_id__in || query.trader_id__in,
          producer_id__in: params?.producer_id__in || query.producer_id__in,
          buyer_id__in: params?.buyer_id__in || query.buyer_id__in,
          product_type_id__in:
            params?.product_type_id__in || query.product_type_id__in,
          processing_method_id__in:
            params?.processing_method_id__in || query.processing_method_id__in,
          applications__in: query.applications__in,
          origin_id__in: params?.origin || query.origin,
          limit: pagination.limit,
          offset: pagination.offset,
        })
        if (isNewArray || data.count === 0) {
          setCatalog(data.results)
          // @ts-ignore
          updatePaginationCount(data.count, 0)
        } else {
          const newPayload = data.results.filter(
            item => !catalog.map(prod => prod.id).includes(item.id)
          )
          setCatalog(prev => prev.concat(newPayload))
          updatePaginationCount(data.count)
        }
        setIsNewArray(false)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    if (isReady) loadProducts()
  }, [isReady, query])

  return {
    catalog,
    isLoading,
    handleReady,
    hasMore,
    reset: () => {},
  }
}
