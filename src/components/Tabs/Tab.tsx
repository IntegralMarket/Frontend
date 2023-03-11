import { FC } from 'react'
import cn from 'classnames'

import Link from 'next/link'
import { Icon } from 'components'

import { IconType } from 'shared/types'

import s from './Tabs.module.scss'

export interface TabPassedProps {
  label: string
  icon?: IconType
  link?: string
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'tag'
}

interface TabProps extends TabPassedProps {
  onClick: (index: number) => void
  index: number
  active: boolean
  hidden?: boolean
}

export const Tab: FC<TabProps> = ({
  label,
  onClick,
  index,
  variant = 'primary',
  active,
  disabled,
  icon,
  link,
  hidden,
}) => {
  const lastPartURL = link?.split('/').pop()

  const variantClass = (variant: 'primary' | 'secondary' | 'tag'): string => {
    switch (variant) {
      case 'secondary':
        return s.buttonRounded
      case 'tag':
        return s.buttonTagged
      default:
        return icon ? s.buttonRounded : s.buttonLined
    }
  }

  const tabClass = cn(
    variantClass(variant),
    lastPartURL,
    { [s.active]: active },
    { [s.disabled]: disabled }
  )

  const handleClick = () => {
    onClick(index)
  }

  return link ? (
    <Link href={link} scroll={false}>
      <button className={tabClass} disabled={disabled}>
        {icon && (
          <span className={cn(s.iconShadow)}>
            <Icon variant={icon} active={active} />
          </span>
        )}
        {label}
      </button>
    </Link>
  ) : (
    <button
      onClick={handleClick}
      className={tabClass}
      disabled={disabled}
      hidden={hidden}
    >
      {icon && (
        <span className={cn(s.iconShadow)}>
          <Icon variant={icon} active={active} />
        </span>
      )}
      {label}
    </button>
  )
}
