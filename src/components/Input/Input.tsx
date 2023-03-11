import {
  ChangeEvent,
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  useEffect,
  useState,
} from 'react'
import cn from 'classnames'

import { Error } from 'shared/types'

import s from './Input.module.scss'

export type InputProps = {
  className?: string
  initValue?: string
  placeholder?: string
  error?: Error
  required?: boolean
  type?: 'text' | 'number' | 'password'
  onChange?: (newValue: string) => void
  name?: string
  ref?: HTMLInputElement | null
  autoFocus?: boolean
  disabled?: boolean
  min?: number
  max?: number
}

export const Input: FC<InputProps> = ({
  initValue = '',
  onChange,
  placeholder = '',
  type = 'text',
  className = '',
  name,
  autoFocus,
  disabled,
  error,
}) => {
  const [value, setValue] = useState(initValue)
  useEffect(() => {
    setValue(initValue)
  }, [initValue])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    onChange?.(newValue)
    setValue(newValue)
  }

  const inputClass = cn(s.input, className, { [s.error]: error })

  return (
    <input
      autoFocus={autoFocus}
      name={name}
      className={inputClass}
      type={type}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
    />
  )
}
