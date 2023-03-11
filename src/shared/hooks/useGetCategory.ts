import { useEffect, useMemo, useState } from 'react'
import {
  getProductApplications,
  getProductIncoterms,
  getProductOrigins,
  getProductPacking,
  getProductPaymentTerms,
  getProductProcessingMethods,
  getProductTypes,
} from 'shared/api/routes/products'
import { setCategories } from 'store/slices/categories'
import { useAppDispatch, useAppSelector } from './redux'
import { getSellers } from 'shared/api/routes/sellers'
import { getProducers } from 'shared/api/routes/producers'
import { CategoryDetail } from 'shared/types/categories'
import { getBuyerTypes } from '../api/routes/buyers'
import { DefaultPaginationParams } from 'shared/types/api'
import { DEFAULT_FETCH_FILTER_COUNT } from 'shared/constants/fetchCards'

export const useGetCategory = (): [CategoryDetail | null] => {
  // TODO useGetFilters is a better name
  const dispatch = useAppDispatch()
  const category = useAppSelector(state => state.categories.categories)
  const hasCategory = useMemo(() => Boolean(category), [category])
  const params: DefaultPaginationParams = {
    limit: DEFAULT_FETCH_FILTER_COUNT,
    offset: 0,
  }
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const loadFilters = async () => {
      setIsLoading(true)
      try {
        const {
          data: { results: processing_methods },
        } = await getProductProcessingMethods(params)
        const {
          data: { results: incoterms },
        } = await getProductIncoterms(params)
        const {
          data: { results: applications },
        } = await getProductApplications(params)
        const {
          data: { results: packing },
        } = await getProductPacking(params)
        const {
          data: { results: terms_of_payments },
        } = await getProductPaymentTerms(params)
        const {
          data: { results: product_types },
        } = await getProductTypes(params)
        const {
          data: { results: traders },
        } = await getSellers({})
        const {
          data: { results: producers },
        } = await getProducers({})
        const {
          data: { results: buyers },
        } = await getBuyerTypes()
        const {
          data: { results: origins },
        } = await getProductOrigins(params)
        setIsLoading(false)
        dispatch(
          setCategories({
            processing_methods,
            incoterms,
            applications,
            packing,
            terms_of_payments,
            product_types,
            traders,
            producers,
            origin: origins,
            buyers,
            delivery_to: origins,
            stocked_in: origins,
          })
        )
      } catch (error) {
        console.error('error', error)
        setIsLoading(false)
      }
    }
    if (!hasCategory && !isLoading) {
      loadFilters()
    }
  }, [hasCategory, isLoading, dispatch])

  return [category]
}
