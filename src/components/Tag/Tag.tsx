import { FC } from 'react'
import cn from 'classnames'

import Image, { ImageProps } from 'next/image'
import { withDomain } from 'shared/helpers/convertLink'

import s from './Tag.module.scss'

export interface TagProps {
  text: string
  image?: ImageProps['src']
  isActive?: boolean
  value: number
  className?: string
  onClick?: (value: number) => void
}

export const Tag: FC<TagProps> = ({
  text,
  image,
  className,
  isActive,
  value,
  onClick,
}) => {
  const tagClass = cn(s.tag, { [s.active]: isActive }, className)
  const toggleActive = () => {
    onClick?.(value)
  }

  return (
    <div className={tagClass} onClick={toggleActive}>
      {image && <Image src={withDomain(image)} alt='' width={20} height={20} />}
      <span>{text}</span>
    </div>
  )
}
