import Link from 'next/link'
import { TableColumns, TableRow } from 'components'

import { Product } from 'shared/types/products'
import { PRICE_VALIDITY_PERIOD_CRITICAL } from 'shared/constants/validity'

import s from './ProductTable.module.scss'

export const convertToRow = (product: Product): TableRow => {
  const price = product.prices.find(item => item)

  const dateClass =
    price?.validate_date || 0 < PRICE_VALIDITY_PERIOD_CRITICAL
      ? s.date_critical
      : s.date

  return {
    grade: (
      <Link href={`/polymers/${product.id}`}>
        <a className={s.grade}>{product.name}</a>
      </Link>
    ),
    price: price ? (
      <p className={s.price}>
        {price.country.name} ({price.incoterm}): <span>${price.price}</span>
      </p>
    ) : (
      '-'
    ),
    date: (
      <p className={dateClass}>
        {price ? `${price.validate_date} days left` : '-'}
      </p>
    ),
    type: <p>{product.product_type}</p>,
    processingMethod: <p>{product.processing_method}</p>,
    origin: <p>{product.origin?.name}</p>,
    MFR: (
      <p>
        ({product.mfr?.weight || '-'}) {product.mfr?.value || '-'}
      </p>
    ),
    trader: (
      <Link href={`/traders/${product.trader.id}`}>
        <a className={s.trader}>{product.trader.name}</a>
      </Link>
    ),
  }
}

export const productsColumns: TableColumns = {
  grade: {
    title: 'Grade',
    align: 'start',
  },
  price: {
    title: 'Price',
    width: '150%',
    align: 'start',
  },
  date: {
    title: 'Date of validity',
    width: '80%',
    align: 'start',
  },
  type: {
    title: 'Type',
    width: '80%',
    align: 'start',
  },
  processingMethod: {
    title: 'Processing method',
    align: 'start',
  },
  origin: {
    title: 'Origin',
    align: 'start',
  },
  MFR: {
    title: 'MFR',
    align: 'start',
  },
  trader: {
    title: 'Trader',
    align: 'start',
  },
}
