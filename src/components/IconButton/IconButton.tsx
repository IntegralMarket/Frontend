import { FC, useState } from 'react'

import { Icon, Tooltip } from 'components'
import { IconType } from 'shared/types'

import s from './IconButton.module.scss'

interface IconButtonProps {
  icon: IconType
  onClick?: (value?: string) => void
  active?: boolean
  value?: string
  tooltip?: string
  disabled?: boolean
}

export const IconButton: FC<IconButtonProps> = ({
  onClick,
  icon,
  active = true,
  value,
  tooltip,
  disabled = false,
}) => {
  const [showTooltip, setShowTooltip] = useState(true) // TODO fix due to the ussue when tooltip overlap modal in filter

  const handleClick = () => {
    onClick?.(value)
    setShowTooltip(false)
  }

  const NavButton = () => (
    <button className={s.button} onClick={handleClick} disabled={disabled}>
      <Icon variant={icon} active={active && !disabled} />
    </button>
  )

  return showTooltip && tooltip ? (
    <Tooltip className={s.tooltip} content={tooltip}>
      <NavButton />
    </Tooltip>
  ) : (
    <NavButton />
  )
}
