import { FC } from 'react'
import cn from 'classnames'
import Image, { ImageProps } from 'next/image'

import { withDomain } from 'shared/helpers/convertLink'

import s from './Badge.module.scss'

export interface BadgeProps {
  image: ImageProps['src']
  large?: boolean
  className?: string
}

export const Badge: FC<BadgeProps> = ({ image, large, className }) => {
  const wrapperClass = cn(s.wrapper, { [s.large]: large }, className)

  return image ? (
    <div className={wrapperClass}>
      <Image src={withDomain(image)} alt='company' layout='fill' priority />
    </div>
  ) : null
}
