import { FC, ChangeEvent } from 'react'
import cn from 'classnames'

import { RadioButton } from './RadioButton/RadioButton'

import { SortOptions } from 'shared/types'

import s from './RadioButton/RadioButton.module.scss'

export interface RadioGroupProps {
  name: string
  options: { value: SortOptions | string; label: string }[]
  value: string | null
  onChange?: (value: string) => void
  onClick?: (value: string) => void
  orientation?: 'column' | 'row'
  className?: string
  color?: 'primary' | 'secondary'
}

export const RadioGroup: FC<RadioGroupProps> = ({
  name,
  options,
  value,
  onChange,
  onClick,
  orientation = 'column',
  className,
  color = 'primary',
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }
  return (
    <div
      className={cn(
        s.radioGroup,
        { [s.row]: orientation === 'row' },
        className
      )}
    >
      {options.map((item, index) => (
        <RadioButton
          key={index}
          name={name}
          label={item.label}
          onChange={handleChange}
          onClick={() => {
            onClick?.(item.value)
          }}
          defaultChecked={item.value === value}
          color={color}
        />
      ))}
    </div>
  )
}
