import { FC, ReactNode } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { ImageProps } from 'next/image'

import { Badge, Title } from 'components'
import EllipseDropDownMenu from 'components/EllipseDropDownMenu/EllipseDropDownMenu'

import s from './Card.module.scss'

export interface CardProps {
  name: string
  link?: string
  image?: ImageProps['src']
  subtitle?: ReactNode
  children: ReactNode
  className?: string
  showEllipse?: boolean
  onRequest?: (id: number) => void
  id?: number
  extraClass?: string // TODO could be used classname with folding div
}

export const Card: FC<CardProps> = ({
  name,
  link,
  image,
  subtitle,
  children,
  onRequest,
  showEllipse = false,
  className,
  extraClass,
  id,
}) => {
  const cardClass = cn(s.container, className)

  return (
    <div className={cardClass}>
      <div className={cn(s.headerBlock, extraClass)}>
        <div className={s.heading}>
          {image && <Badge image={image} className={s.image} />}
          {link ? (
            <Link href={link}>
              <a>
                <Title As='h5' className={cn(className, s.title)}>
                  {name}
                </Title>
              </a>
            </Link>
          ) : (
            <Title As='h5' className={cn(className, s.title)}>
              {name}
            </Title>
          )}
          {showEllipse && (
            <EllipseDropDownMenu
              className={cn(className)}
              link={link}
              onRequest={onRequest}
              id={id}
            /> // TODO find another way to display exctra element like this
          )}
        </div>
        {subtitle ? <div className={s.subheading}>{subtitle}</div> : null}
      </div>

      <div className={s.contentBlock}>{children}</div>
    </div>
  )
}
