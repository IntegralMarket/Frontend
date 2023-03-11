// @ts-nocheck
import { FC } from 'react'
import Link from 'next/link'
import { ImageProps } from 'next/image'
import cn from 'classnames'

import { Badge, Title, Rating } from 'components'
import { Roles } from 'shared/types'

import thumb from '/public/assets/img/fabric.svg'
import author from '/public/assets/img/author.svg'

import s from './CompanyInfo.module.scss'

interface TitleLinkProps {
  name: string
  link?: string
  className?: string
}

interface CompanyInfo extends TitleLinkProps {
  logo?: ImageProps['src']
  country?: string
  rating?: number
  size?: 'small' | 'medium' | 'large' | 'user'
  role?: Roles
}

const RoleToTitle = {
  [Roles.SELLER]: 'Seller',
  [Roles.BUYER]: 'End User',
  [Roles.PRODUCER]: 'Producer',
  [Roles.PROVIDER]: 'Service provider',
}

export const CompanyInfo: FC<CompanyInfo> = ({
  link,
  logo,
  name,
  role = Roles.SELLER,
  country,
  rating,
  size = 'medium',
}) => {
  const thumbLogo = logo || thumb
  const authorLogo = logo || author

  const TitleLink: FC<TitleLinkProps> = ({ name, link, className }) => {
    const nameClass = cn(s.name, className)
    return link ? (
      <Link href={link}>
        <a className={s.link}>
          <Title As='h5' className={nameClass}>
            {name}
          </Title>
        </a>
      </Link>
    ) : (
      <Title As='h5' className={nameClass}>
        {name}
      </Title>
    )
  }

  switch (size) {
    case 'large':
      return (
        <div className={s.contentLarge}>
          <Badge image={thumbLogo} className={s.image} large />
          <div>
            <TitleLink name={name} link={link} />
            <div className={s.wrapper}>
              <p className={s.description}>
                {RoleToTitle[role]}, {country}
              </p>
              {role === Roles.SELLER && <Rating rating={rating} />}
            </div>
          </div>
        </div>
      )

    case 'small':
      return (
        <div className={s.contentSmall}>
          <Badge image={thumbLogo} className={s.image} />
          <div>
            <TitleLink name={name} link={link} />
            {role === Roles.SELLER && <Rating rating={rating} />}
            <span>Seller, {country}</span>
          </div>
        </div>
      )

    case 'user':
      return (
        <div className={s.contentAuthor}>
          <Badge image={authorLogo} className={s.image} />
          <div>
            <TitleLink className={s.titleLink} name={name} link={link} />
            <span>End User, {country}</span>
          </div>
        </div>
      )

    default:
      return (
        <div className={s.content}>
          <div className={s.wrapper}>
            <Badge image={thumbLogo} className={s.image} />
            <TitleLink name={name} link={link} />
            {role === Roles.SELLER && <Rating rating={rating} />}
          </div>
          <p className={s.description}>
            {RoleToTitle[role]}, {country}
          </p>
        </div>
      )
  }
}
