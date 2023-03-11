import { FC } from 'react'

import { Table } from 'components'

import { Product } from 'shared/types/products'
import { convertToRow, productsColumns } from './utils'

import s from './ProductTable.module.scss'

type ProductTableProps = {
  data: Product[]
}

export const ProductTable: FC<ProductTableProps> = ({ data }) => {
  const productsRows = data.map(item => convertToRow(item))

  return (
    <Table
      className={s.table}
      columns={productsColumns}
      rows={productsRows}
      grey
    />
  )
}
