import { FC } from 'react'
import cn from 'classnames'
import Link from 'next/link'

import { Title } from 'components/Title'

import { FooterItemProps } from './types'

import s from './FooterList.module.scss'

interface FooterListProps {
  title?: string
  items: FooterItemProps[]
  columnsAmount?: number
  orientation?: 'column' | 'row'
}

export const FooterList: FC<FooterListProps> = ({
  title = '',
  items,
  columnsAmount = 1,
  orientation = 'column',
}) => {
  const listClass = cn(s.list, { [s.row]: orientation === 'row' })
  const listStyle =
    columnsAmount > 1
      ? { columns: columnsAmount, columnGap: `${400 / columnsAmount}px` }
      : {}
  return (
    <div>
      {title && (
        <Title As='h6' className={s.title}>
          {title}
        </Title>
      )}
      <ul className={listClass} style={listStyle}>
        {items.length
          ? items.map((item, index) => (
              <Link key={index} href={item.link}>
                <li className={s.item}>
                  <a>{item.title}</a>
                </li>
              </Link>
            ))
          : null}
      </ul>
    </div>
  )
}
