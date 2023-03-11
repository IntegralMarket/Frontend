import { FC } from 'react'
import cn from 'classnames'

import Image from 'next/image'

import star from '/public/assets/img/star.svg'

import s from './Rating.module.scss'

interface Rating {
  rating?: number
  reverse?: boolean
}

export const Rating: FC<Rating> = ({ rating, reverse }) => {
  return rating ? (
    <div className={cn(s.wrapper, { [s.reverse]: reverse })}>
      <Image width={16} height={16} src={star} alt='star' />
      <span className={s.number}>{rating}</span>
    </div>
  ) : null
}
