import { FC, ReactNode } from 'react'
import cn from 'classnames'

import s from './CountBadge.module.scss'

export interface CountBadgeProps {
  className?: string
  count: number
  children: ReactNode
}

export const CountBadge: FC<CountBadgeProps> = ({
  count,
  className,
  children,
}) => {
  const badgeCount = cn(s.count, className)

  return (
    <div className={s.block}>
      {count ? (
        <div className={s.container}>
          <span className={badgeCount}>{count}</span>
        </div>
      ) : null}
      {children}
    </div>
  )
}
