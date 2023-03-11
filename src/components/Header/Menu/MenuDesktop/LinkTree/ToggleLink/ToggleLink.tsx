import { FC } from 'react'
import cn from 'classnames'

import { DesktopLink } from '../types'

import s from './ToggleLink.module.scss'

interface ToggleLinkProps {
  linkElement: DesktopLink
  isBiggerShift?: boolean
  onClick: () => void
}

const ToggleLink: FC<ToggleLinkProps> = ({
  linkElement,
  isBiggerShift,
  onClick,
}) => {
  return (
    <div className={cn(s.toggleLink, isBiggerShift && s.biggerShift)}>
      <span className={s.text} onClick={onClick}>
        {linkElement.name}
        <div className={s.textArrow} />
      </span>
    </div>
  )
}

export default ToggleLink
