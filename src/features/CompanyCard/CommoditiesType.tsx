import Link from 'next/link'
import React, { FC, Fragment } from 'react'
import { Roles } from 'shared/types'
import { Producer } from 'shared/types/producers'
import { Trader } from 'shared/types/traders'

import s from './CompanyCard.module.scss'

type CommoditiesTypesProps = (
  | Pick<Trader, 'id' | 'commodities'>
  | Pick<Producer, 'id' | 'commodities'>
) & {
  role: Roles
}

export const CommoditiesTypes: FC<CommoditiesTypesProps> = ({
  id,
  commodities,
  role,
}) => {
  const keys = Object.keys(commodities)

  const link = (productId: number) => {
    switch (role) {
      case Roles.PRODUCER:
        return `/producers/${id}/commodities?product_type_id__in=${productId}`
      case Roles.PRODUCER:
      default:
        return `/traders/${id}/offers?product_type_id__in=${productId}`
    }
  }

  return keys.length ? (
    <ul className={s.productsList}>
      {keys.map((type, index) => (
        <li key={index}>
          {type}:{' '}
          {commodities[type].map((item, idx) => (
            <Fragment key={item.name}>
              <Link href={link(item.id)}>
                <a className={s.commodities}>{item.name}</a>
              </Link>
              {idx < commodities[type].length - 1 && ', '}
            </Fragment>
          ))}
        </li>
      ))}
    </ul>
  ) : (
    <ul className={s.productsList}>
      <li>Nothing to show</li>
    </ul>
  )
}
