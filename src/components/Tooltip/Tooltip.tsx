import { FC, ReactNode } from 'react'
import { Placement, Tooltip as TooltipNext } from '@nextui-org/react'
import cn from 'classnames'

import s from './Tooltip.module.scss'

type Trigger = 'click' | 'hover'

interface TooltipProps {
  children: ReactNode
  className?: string
  placement?: Placement
  content?: ReactNode
  trigger?: Trigger
  visible?: boolean
  onVisibleChange?: (visible: boolean) => void
}

export const Tooltip: FC<TooltipProps> = ({
  children,
  className,
  placement,
  content = 'Tooltip',
  trigger,
  visible,
  onVisibleChange,
}) => {
  const portalClass = cn(s.portal, className)

  return (
    <TooltipNext
      portalClassName={portalClass}
      content={content}
      placement={placement}
      trigger={trigger}
      visible={visible}
      onVisibleChange={onVisibleChange}
    >
      {children}
    </TooltipNext>
  )
}
