import { FC, useState } from 'react'

import { ListItem } from './BidCardBody'
import { BidCardProps } from '../BidCard'

import s from '../BidCard.module.scss'
import cn from 'classnames'
import { capitalize } from 'shared/helpers/capitalize'

interface BidPrice {
  price: string
}

export const PriceItem: FC<BidPrice> = ({ price }) => {

  return (
    <li className={s.priceItem}>
      <span className={s.titlePrice}>Target price:</span>
      <span className={s.priceValue}>{price !== '0' ? `$${price}` : '-'}</span>
    </li>
  )
}

type BidCardHeaderProps = Omit<BidCardProps, 'mark' | 'prices'>

export const BidCardHeader: FC<BidCardHeaderProps> = ({
  product_type,
  processing_method,
  mfr,
  other_preferred_grades,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const toggleOpen = () => setIsOpen(prev => !prev)

  return (
    <>
      <div className={s.container}>
        {isOpen && (
          <ul className={s.paramsList}>
            <br />
            <ListItem label='Type' param={product_type} />
            <ListItem label='Processing method' param={processing_method} />
            <ListItem
              label={`MFR (${mfr?.weight || '-'})`}
              param={mfr?.value || '-'}
            />
            {other_preferred_grades?.length ? (
              <li className={s.paramsItem}>
                {capitalize('Other preferred grades')}:{' '}
                {other_preferred_grades.map((item, index) => {
                  return (
                    <span key={item.id} className={s.paramsValue}>
                      <span className={s.other}>{item.mark}</span>
                      {index != other_preferred_grades.length - 1 ? ',' : ''}
                    </span>
                  )
                })}
              </li>
            ) : null}
          </ul>
        )}
        <div onClick={toggleOpen} className={s.caption}>
          <span className={s.stick} />
          <span
            className={cn(s.arrow, { [s.up]: isOpen, [s.down]: !isOpen })}
          />
        </div>
      </div>
    </>
  )
}
