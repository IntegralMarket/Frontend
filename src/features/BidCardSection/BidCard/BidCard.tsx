import { FC } from 'react'

import { Card } from 'components/Card'
import { BidCardBody, BidCardHeader } from './components'

import { Roles } from 'shared/types'
import { Bid } from 'shared/types/bid'
import s from './BidCard.module.scss'

export interface BidCardProps extends Bid {
  role?: Roles
  onRequest?: (bid: Bid) => void
}

export const BidCard: FC<BidCardProps> = ({
  id,
  price,
  mark,
  role,
  onRequest,
  ...rest
}) => {
  const link = () => {
    switch (role) {
      case Roles.BUYER:
        return `/polymers/${rest.grade_id}/bid/${id}?tab=4` // TODO unsafe link fix 
      case Roles.SELLER:
      default:
        return `/polymers/${rest.grade_id}/bid/${id}?tab=4`
    }
  }

  return (
    <Card
      name={mark}
      link={link()}
      showEllipse
      subtitle={<BidCardHeader id={id} role={role} price={price} {...rest} />}
      id={id}
      className={s.cardTitle}
      onRequest={() => onRequest?.({ id, price, mark, ...rest })}
    >
      <BidCardBody price={price} id={id} role={role} mark={mark} {...rest} />
    </Card>
  )
}
