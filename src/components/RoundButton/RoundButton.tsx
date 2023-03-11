import { FC } from 'react'

import Link from 'next/link'

import s from './RoundButton.module.scss'

interface RoundButtonProps {
  link?: string
  externalLink?: string
  onClick?: () => void
  title: string
}

export const RoundButton: FC<RoundButtonProps> = ({
  link,
  externalLink,
  title,
  onClick,
}) => {
  return link ? (
    <Link href={link}>
      <a className={s.button}>{title}</a>
    </Link>
  ) : (
    <a
      className={s.button}
      href={externalLink}
      target='_blank'
      rel='noreferrer'
      onClick={onClick}
    >
      {title}
    </a>
  )
}
