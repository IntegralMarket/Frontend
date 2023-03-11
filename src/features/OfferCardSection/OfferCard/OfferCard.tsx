import { FC } from 'react'

import { Card } from 'components/Card'
import { OfferCardBody, OfferCardHeader } from './components'

import { Roles } from 'shared/types'
import { Offer } from 'shared/types/offer'

import s from "./OfferCard.module.scss"

export interface ProductCardProps extends Offer { // TODO OfferCardProps
  role?: Roles
  onRequest?: (offer: Offer) => void
}

export const OfferCard: FC<ProductCardProps> = ({
  id,
  mark,
  price,
  role,
  onRequest,
  ...rest
}) => {
  const link = () => {
    switch (role) {
      case Roles.SELLER:
      default:
        return `/polymers/${rest.grade_id}/offer/${id}?tab=3`
    }
  }

  return (
    <Card
      name={mark}
      link={link()}
      showEllipse
      extraClass={s.headerBlock}
      className={s.header}
      subtitle={<OfferCardHeader id={id} role={role} {...rest} />}
      onRequest={() => onRequest?.({ id, mark, price, ...rest })}
      id={id}
    >
      <OfferCardBody price={price} id={id} role={role} mark={mark} {...rest} />
    </Card>
  )
}
