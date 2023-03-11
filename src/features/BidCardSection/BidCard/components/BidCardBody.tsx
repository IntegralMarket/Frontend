import { FC } from 'react'

import { CompanyInfo } from 'features'
import { PriceItem } from './BidCardHeader'

import { capitalize } from 'shared/helpers/capitalize'
import { BidCardProps } from '../BidCard'

import s from '../BidCard.module.scss'
import { getQuantity } from 'shared/helpers/transform'

type ListItemType = {
  label: string
  param?: string | string[] | number | number[] | null
}

export const ListItem: FC<ListItemType> = ({ label, param }) =>
  param ? (
    <li className={s.paramsItem}>
      {capitalize(label)}:{' '}
      <span className={s.paramsValue}>
        {Array.isArray(param) ? param.join(', ') : param}
      </span>
    </li>
  ) : null

export const BidCardBody: FC<BidCardProps> = ({
  price,
  author,
  date_of_bid,
  lead_time,
  place_of_delivery,
  payment_terms,
  packing,
  deadline_of_rfp,
  role,
  quantity_min,
  quantity_max
}) => {
  const nameTrader = author || 'Name trader'

  return (
    <>
      <div className={s.container}>
        <ul className={s.paramsList}>
          {price ? (
            <PriceItem price={price} />
          ) : (
            <li className={s.priceItem}>Target price:<span className={s.nonePrice}>-</span></li>
          )}
          <ListItem label='Place of delivery' param={place_of_delivery} />
          <ListItem label='Quantity(MT)' param={getQuantity(quantity_min, quantity_max)} />
          <ListItem label='Delivery period' param={`${lead_time} ${lead_time === '1' ? 'week' : 'weeks'}`} />
          <ListItem label='Payment terms' param={payment_terms} />
          <ListItem label='Packing' param={packing} />
          <ListItem label='Date of bid' param={date_of_bid} />
          <ListItem label='Dedline for RFP' param={deadline_of_rfp} />
        </ul>

        {role ? null : (
          <CompanyInfo
            size={'user'}
            name={nameTrader.name}
            country={nameTrader.country}
            link={nameTrader.is_buyer ? `/buyers/${nameTrader.id}/profile` : `/traders/${nameTrader.id}/profile`}
          />
        )}
      </div>
    </>
  )
}
