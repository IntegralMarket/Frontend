import { ParsedUrlQuery } from 'querystring'
import { ProductFilterParams } from 'shared/types/products'
import { FilterProductsForm } from 'shared/types/filterProductsForm'
import { CategoryDetail } from 'shared/types/categories'
import { isNullDeep } from './equal'
import { SortOptions, Trade } from 'shared/types'

export function parseProductQuery(
  query: ParsedUrlQuery
): Partial<ProductFilterParams> {
  return {
    trade: query.trade as Trade,
    valid_prices_only: query.valid_prices_only as string,
    mfr: query.mfr as string,
    place_of_delivery: query.place_of_delivery as string,
    place_of_shipment: query.place_of_shipment as string,
    name: query.name as string,
    trader_id__in: query.trader_id__in as string,
    producer_id__in: query.producer_id__in as string,
    product_type_id__in: query.product_type_id__in as string,
    processing_method_id__in: query.processing_method_id__in as string,
    applications__in: query.applications__in as string,
    origin: query.origin as string,
    ordering: query.ordering as SortOptions,
  }
}

function selectToQuery(value: string | string[] | null): string | undefined {
  if (!value) return undefined
  return Array.isArray(value) ? value.map(elem => elem).join(', ') : value
}

export function formToQuery(
  form: FilterProductsForm,
  category?: CategoryDetail | null
): Partial<ProductFilterParams> {
  return {
    product_type_id__in: selectToQuery(form.type),
    processing_method_id__in: selectToQuery(form.method),
    mfr: isNullDeep(form.mfr)
      ? undefined
      : [...form.mfr].filter(item => item).join('-'),
    place_of_delivery: category?.delivery_to
      .filter(item => form.delivery_to?.includes(item.name))
      .map(item => item.name)
      .join(', '),
    place_of_shipment: category?.stocked_in
      .filter(item => form.stocked_in?.includes(item.name))
      .map(item => item.name)
      .join(', '),
    producer_id__in: selectToQuery(form.producer),
    origin: selectToQuery(form.origin),
    applications__in: selectToQuery(form.application),
    name: selectToQuery(form.name),
  }
}

export function prepareQuery(
  path: string,
  oldQuery: Partial<ProductFilterParams>,
  newQuery: Partial<ProductFilterParams>,
  forceValidPrices?: boolean
): string {
  const formedQuery: Partial<ProductFilterParams> = {
    ...oldQuery,
    ...newQuery,
    valid_prices_only: forceValidPrices
      ? newQuery.valid_prices_only
      : oldQuery.valid_prices_only,
  }

  let query: string[] = []
  const keys = Object.keys(formedQuery)
  const values = Object.values(formedQuery)
  keys.map((key, index) => {
    if (values[index])
      query.push(
        `${key}=${JSON.stringify(values[index]).replace(/['"]+/g, '')}`
      )
  })
  const queryPath = query.length ? '?' + query.join('&') : ''
  return path.replace(/\?.*/gi, '') + queryPath
}
