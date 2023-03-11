import React from 'react'
import cn from 'classnames'

import s from './Title.module.scss'

export interface TitleProps {
  children: string | number
  As?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  className?: string
  size?: number
  weight?: number
}

export const Title: React.FC<TitleProps> = ({
  className,
  children,
  size,
  weight,
  As = 'h2',
}) => {
  const titleClass = cn(s.title, s[`${As}`], className)

  return (
    <As className={titleClass} style={{ fontSize: size, fontWeight: weight }}>
      {children}
    </As>
  )
}
