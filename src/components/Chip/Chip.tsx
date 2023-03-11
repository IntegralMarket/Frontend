import { FC } from 'react'
import cn from 'classnames'

import Image from 'next/image'

import img from '/public/assets/img/tag-delete.svg'

import s from './Chip.module.scss'

export interface ChipProps {
  text: string
  className?: string
  onClick?: () => void
}

export const Chip: FC<ChipProps> = ({ text, className, onClick }) => {
  const chipClass = cn(s.chip, className)
  return (
    <div className={chipClass} onClick={onClick}>
      <span>{text}</span>
      <Image src={img} alt='' />
    </div>
  )
}
