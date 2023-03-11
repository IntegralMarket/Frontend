import { FC } from 'react'
import cn from 'classnames'

import { extraIcon } from './ExtraIcons'

import { IconType } from 'shared/types'
import { extraIconVariants } from './utils'

import s from './Icon.module.scss'

interface IconProps {
  variant: IconType
  size?: number
  active?: boolean
  className?: string
}


export const Icon: FC<IconProps> = ({ variant, size = 24, active = true, className }) =>
  extraIconVariants.includes(variant) ? (
    <span style={size ? { height: size } : {}} className={cn(s.icon, className)} >
      {extraIcon(variant, active)}
    </span >
  ) : (
    <span
      style={size ? { fontSize: `${size}px` } : {}}
      className={cn(s.icon, s[variant], className)}
    />
  )
