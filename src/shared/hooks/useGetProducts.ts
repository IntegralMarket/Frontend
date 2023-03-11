// @ts-nocheck // Todo
import { useEffect, useState } from 'react'
import { getBids, getOffers } from 'shared/api/routes/products'
import { PaginationType, SortOptions, Trade } from 'shared/types'
import { Bid } from 'shared/types/bid'
import { FilterCompany } from 'shared/types/company'
import { Offer } from 'shared/types/offer'
import { ProductFilterParams } from 'shared/types/products'

export function useGetProducts<T extends Trade>(
  query: Partial<ProductFilterParams>,
  pagination: PaginationType,
  updatePaginationCount: (count: number, offset?: number) => void,
  resetPaginationOffset: () => void,
  params?: Partial<ProductFilterParams>,
  type?: T
): [
  T extends Trade.BID ? Bid[] : Offer[],
  boolean,
  (reset?: boolean) => void,
  FilterCompany[],
  FilterCompany[]
] {
  const [products, setProducts] = useState<Bid[] | Offer[]>([])
  const [isReady, setIsReady] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isNewArray, setIsNewArray] = useState<boolean>(false)
  const [sellers, setSellers] = useState<FilterCompany[]>([])
  const [producers, setProducers] = useState<FilterCompany[]>([])
  const [buyers, setBuyers] = useState<FilterCompany[]>([])

  const handleReady = (reset?: boolean) => {
    if (reset) {
      setIsNewArray(true)
      resetPaginationOffset()
    }
    setIsReady(true)
  }

  useEffect(() => {
    const loadProducts = async () => {
      const request = type === Trade.BID ? getBids : getOffers
      setIsReady(false)
      try {
        setIsLoading(true)
        const { data } = await request({
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
          ordering: query.ordering || SortOptions.price,
          limit: pagination.limit,
          offset: pagination.offset,
        })
        if (isNewArray || data.count === 0) {
          setProducts(data.results)
          setSellers(data.sellers ?? [])
          setProducers(data.producers ?? [])
          setBuyers(data.buyers ?? [])
          updatePaginationCount(data.count, 0)
        } else {
          const newPayload = data.results.filter(
            item => !products.map(prod => prod.id).includes(item.id)
          )
          setProducts(prev => prev.concat(newPayload))
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

  return [
    products,
    isLoading,
    handleReady,
    type === Trade.BID ? buyers : sellers,
    producers,
  ] // TODO use object
}
