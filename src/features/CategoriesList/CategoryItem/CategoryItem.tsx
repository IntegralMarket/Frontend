import { FC } from 'react'
import cn from 'classnames'

import Link from 'next/link'
import Image, { ImageProps } from 'next/image'

import s from './CategoryItem.module.scss'

export interface CategoryItemProps {
  name: string
  image: ImageProps['src']
  link?: string
}

export const CategoryItem: FC<CategoryItemProps> = ({
  name = '',
  image = '',
  link = '',
}) => {
  const itemClass = cn(s.item, { [s.disabled]: !link })

  return (
    <div className={itemClass}>
      <Link href={link}>
        <a className={s.linkWrapper}>
          <div className={s.imageWrapper}>
            <Image src={image} layout='fill' alt='' />
          </div>
          <p className={s.text}>{name}</p>
        </a>
      </Link>
    </div>
  )
}
