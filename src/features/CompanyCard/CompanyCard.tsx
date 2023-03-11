import { FC, ReactNode } from 'react'

import { Card, Rating } from 'components'

import { Location } from 'shared/types'
import thumb from '/public/assets/img/fabric.svg'

import s from './CompanyCard.module.scss'

export interface CompanyCard {
  image?: string
  name: string
  place: Location
  link: string
  rating?: number
  children?: ReactNode
}

export const CompanyCard: FC<CompanyCard> = ({
  image,
  name,
  children,
  place,
  rating,
  link,
}) => (
  <Card
    image={image ?? thumb}
    name={name}
    link={link}
    subtitle={
      <>
        <p className={s.subtitle}>
          {[place?.country.name, place?.city.name].filter(v => v).join(', ')}
        </p>
        {rating ? <Rating rating={rating} /> : null}
      </>
    }
  >
    {children}
  </Card>
)
