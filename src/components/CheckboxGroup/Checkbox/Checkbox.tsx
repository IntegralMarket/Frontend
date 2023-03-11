import { FC, ReactNode } from 'react'
import cn from 'classnames'

import s from './Checkbox.module.scss'

interface CheckboxProps {
  isChecked: boolean
  onChange?: () => void
  id?: string
  value?: string
  label?: string
  color?: 'primary' | 'secondary'
  className?: string
  children?: ReactNode
}

export const Checkbox: FC<CheckboxProps> = ({
  isChecked,
  onChange,
  id,
  value,
  label,
  color = 'primary',
  className,
  children,
}) => {
  const checkboxClass = cn(s.label, className)

  return (
    <label className={checkboxClass}>
      <input
        className={cn(s.checkbox, s[color])}
        type='checkbox'
        id={id}
        value={value}
        checked={isChecked}
        onChange={onChange}
      />
      <span>{label || children}</span>
    </label>
  )
}
