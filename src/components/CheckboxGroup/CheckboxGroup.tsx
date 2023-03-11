import { FC } from 'react'
import cn from 'classnames'

import { Checkbox } from './Checkbox/Checkbox'

import s from './Checkbox/Checkbox.module.scss'

export interface CheckboxGroupProps {
  options: string[]
  value: string | string[] | null
  onChange?: (value: string[]) => void
  orientation?: 'column' | 'row'
  className?: string
  color?: 'primary' | 'secondary'
}

export const CheckboxGroup: FC<CheckboxGroupProps> = ({
  options,
  value,
  onChange,
  orientation = 'column',
  className,
  color = 'primary',
}) => {
  const handleChange = (e: string) => {
    if (value === null) {
      onChange?.([e])
    } else {
      const valArray = Array.isArray(value) ? value : [value]
      if (!valArray.includes(e)) onChange?.([...valArray, e])
      else onChange?.(valArray.filter(item => item !== e))
    }
  }
  return (
    <div
      className={cn(
        s.checkboxGroup,
        { [s.row]: orientation === 'row' },
        className
      )}
    >
      {options.map((item, index) => (
        <Checkbox
          key={index}
          label={item}
          color={color}
          onChange={() => {
            handleChange(item)
          }}
          isChecked={!!value && value.includes(item)}
        />
      ))}
    </div>
  )
}
