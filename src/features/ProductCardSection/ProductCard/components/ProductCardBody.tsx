import { FC } from 'react'
import Link from 'next/link'

import { CompanyInfo } from 'features'

import { Roles } from 'shared/types'
import { capitalize } from 'shared/helpers/capitalize'
import { ProductCardProps } from '../ProductCard'

import s from '../ProductCard.module.scss'

type ProductCardBodyProps = Omit<ProductCardProps, 'name' | 'prices'>

type ListItemType = {
  label: string
  param?: string | string[] | number | number[] | null
}

export const ProductCardBody: FC<ProductCardBodyProps> = ({
  id,
  product_type,
  processing_method,
  origin,
  producer,
  mfr,
  density,
  applications,
  trader,
  role,
}) => {
  const ListItem: FC<ListItemType> = ({ label, param }) =>
    param ? (
      <li className={s.paramsItem}>
        {capitalize(label)}:{' '}
        <span className={s.paramsValue}>
          {Array.isArray(param) ? param.join(', ') : param}
        </span>
      </li>
    ) : null

  return (
    <div className={s.container}>
      <ul className={s.paramsList}>
        <ListItem label='Type' param={product_type} />
        <ListItem label='Processing method' param={processing_method} />
        {role !== Roles.PRODUCER && (
          <>
            <ListItem label='Origin' param={origin?.name} />
            <ListItem label='Producer' param={producer?.name} />
          </>
        )}
        <ListItem
          label={`MFR (${mfr?.weight || '-'})`}
          param={mfr?.value || '-'}
        />
        <ListItem label='Density' param={density} />
        <ListItem label='Application' param={applications} />
      </ul>

      {role ? null : (
        <CompanyInfo
          size={'small'}
          {...trader}
          link={`/traders/${trader.id}`}
        />
      )}

      {role === Roles.PRODUCER && (
        <Link href={`/producers/${producer.id}/commodities/${id}?tab=2`}>
          <a className={s.link}>See all offers</a>
        </Link>
      )}
    </div>
  )
}
