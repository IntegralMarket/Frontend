import { FC } from 'react'
import cn from 'classnames'

import s from './ProgressBar.module.scss'

interface ProgressBarProps {
  max?: number
  value?: number
  color?: string
  className?: string
}

export const ProgressBar: FC<ProgressBarProps> = ({
  max = 100,
  value = 0,
  color,
  className,
}) => {
  const progress = max > 0 && value <= max ? (value / max) * 100 : 0

  return (
    <div className={cn(s.container, className)}>
      <div
        className={s.inner}
        style={{ width: `${progress}%`, backgroundColor: color }}
      />
    </div>
  )
}
