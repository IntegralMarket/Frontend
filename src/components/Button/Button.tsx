import { FC, ReactNode } from 'react'
import cn from 'classnames'

import s from './Button.module.scss'

interface ButtonProps {
  children: ReactNode
  type?: 'button' | 'reset' | 'submit'
  variant?: 'outline' | 'primary' | 'secondary'
  className?: string
  onClick?: () => void
}

export const Button: FC<ButtonProps> = ({
  children,
  type = 'button',
  variant = 'primary',
  className,
  onClick,
}) => {
  const buttonClass = cn(s.button, s[variant], className)

  return (
    <button className={buttonClass} type={type} onClick={onClick}>
      {children}
    </button>
  )
}
