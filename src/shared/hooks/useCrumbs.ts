import { useEffect } from 'react'
import { isNullShallow, isJSONEqual } from 'shared/helpers/equal'
import { CategoryDetail } from 'shared/types/categories'
import { Product, ProductFilterParams } from 'shared/types/products'
import { useAppDispatch, useAppSelector } from 'shared/hooks'
import { setCrumbs } from 'store/slices/crumbSlice'

export const useCrumbs = (
  query: Partial<ProductFilterParams>,
  commodity: CategoryDetail | null
): Product[][] => {
  const dispatch = useAppDispatch()
  const crumbs = useAppSelector(state => state.crumbs)

  useEffect(() => {
    if (!commodity) return
    const newCrumbs = {
      ...crumbs,
      type: commodity?.product_types.find(elem =>
        query.product_type_id__in?.includes(String(elem.id))
      )?.name,
      method: commodity?.processing_methods.find(elem =>
        query.processing_method_id__in?.includes(String(elem.id))
      )?.name,
    }

    if (!isJSONEqual(crumbs, newCrumbs) && !isNullShallow(newCrumbs)) {
      dispatch(setCrumbs(newCrumbs))
    }
  }, [
    commodity,
    commodity?.processing_methods,
    commodity?.product_types,
    crumbs,
    dispatch,
    query.processing_method_id__in,
    query.product_type_id__in,
  ])

  return []
}
