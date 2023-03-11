import { ChangeEvent, FC } from 'react'

import s from './ToggleSwitch.module.scss'
import cn from 'classnames';

interface ToggleSwitchProps {
  value: boolean
  onChange?: (checked: boolean) => void
  className?: string
}

export const ToggleSwitch: FC<ToggleSwitchProps> = ({ value, onChange, className }) => {

  const handleToggle = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.checked)
  }

  return (
    <label className={cn(s.toggleSwitch, className)}>
      <input type='checkbox' checked={value} onChange={handleToggle} />
      <span className={s.switch}></span>
    </label>
  )
}
