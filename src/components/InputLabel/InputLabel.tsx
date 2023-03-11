import React, { FC, ReactNode } from 'react'
import cn from 'classnames'

import s from './InputLabel.module.scss'
import { Icon } from 'components'
import { appendErrors, FieldError } from 'react-hook-form'

interface InputLabelProps {
  children: ReactNode
  label: string
  className?: string
  labelClassName?: string
  error?: Partial<FieldError>
}

export const InputLabel: FC<InputLabelProps> = ({
  children,
  label,
  className,
  labelClassName,
  error,
}) => {
  const wrapperClass = cn(s.wrapper, className)
  const labelClass = cn(s.label, labelClassName)

  return (
    <div className={wrapperClass}>
      <label className={labelClass}>{label}</label>
      {children}
      {error && (
        <span className={s.error}>
          <Icon variant='warning' size={20} />
          <span>{error.message}</span>
        </span>
      )}
    </div>
  )
}
