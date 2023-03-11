// @ts-nocheck
import { isNull, isNullDeep } from 'shared/helpers/equal'
import {
  RequestProductPost,
  RequestProductPrePost,
  RequestProductType,
} from 'shared/types/requestProduct'

export const formToPost = (
  form: RequestProductPrePost
): Partial<RequestProductPost> => {
  const {
    grade,
    product_id,
    contacts,
    product_type,
    processing_method,
    mfr,
    ...rest
  } = form

  return clearRequestKeys({
    ...rest,
    ...contacts,
    products: product_id
      ? [
          {
            product: product_id,
          },
        ]
      : [],
    types: [
      clearTypes({
        mfr: isNullDeep(mfr) ? '' : mfr.join(' - '),
        product_type: Number(product_type),
        processing_method: Number(processing_method),
      }),
    ].filter(obj => !isNullDeep(obj)),
    delivery_period: form.delivery_period.toString(),
  })
}

//fn removes all keys with blank values
const clearRequestKeys = (
  obj: RequestProductPost
): Partial<RequestProductPost> =>
  Object.entries(obj).reduce(
    (accumulator: { [key: string]: any }, [key, value]) => {
      return !isNullDeep(value) || typeof value === 'boolean'
        ? ((accumulator[key] = value), accumulator)
        : accumulator
    },
    {}
  )

const clearTypes = (obj: RequestProductType): Partial<RequestProductType> =>
  Object.entries(obj).reduce(
    (accumulator: { [key: string]: any }, [key, value]) => {
      return !isNull(value)
        ? ((accumulator[key] = value), accumulator)
        : accumulator
    },
    {}
  )

export const MAIN_TYPES_LIMIT = 2
export const GRADES_LIMIT = 2
