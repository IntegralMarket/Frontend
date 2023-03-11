import { FC } from 'react'
import Image, { ImageProps } from 'next/image'

import { withDomain } from 'shared/helpers/convertLink'

import s from './EmployeeCard.module.scss'

interface EmployeeCardProps {
  name: string
  phone: string
  email: string
  position: string
  avatar?: ImageProps['src']
}

export const EmployeeCard: FC<EmployeeCardProps> = ({
  name,
  phone,
  email,
  avatar,
  position,
}) => {
  return (
    <div className={s.cardWrapper}>
      <p className={s.title}>{position}</p>
      <p className={s.content}>{name}</p>
      <p className={s.title}>Tel</p>
      <a className={s.content} href={`tel:${phone}`}>
        +{phone}
      </a>
      <p className={s.title}>Email</p>
      <a className={s.content} href={`mailto:${email}`}>
        {email}
      </a>
      <div className={s.avatar}>
        {avatar ? (
          <Image src={withDomain(avatar)} alt='' layout='fill' />
        ) : null}
      </div>
    </div>
  )
}
