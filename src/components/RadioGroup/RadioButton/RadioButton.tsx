import { FC, ChangeEvent, MouseEvent } from 'react'
import cn from 'classnames'

import s from './RadioButton.module.scss'

interface RadioButtonProps {
  name: string
  label: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onClick: (e: MouseEvent<HTMLInputElement>) => void
  defaultChecked: boolean
  color?: 'primary' | 'secondary'
}

export const RadioButton: FC<RadioButtonProps> = ({
  name,
  label,
  onChange,
  defaultChecked,
  color = 'primary',
  onClick,
}) => {
  return (
    <label className={s.label}>
      <input
        type='radio'
        className={cn(s.radioButton, s[color])}
        name={name}
        value={label}
        defaultChecked={defaultChecked}
        onChange={onChange}
        onClick={onClick}
      />
      <span>{label}</span>
    </label>
  )
}
