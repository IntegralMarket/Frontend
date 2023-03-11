import { FC, ReactNode, useRef, useState } from 'react'
import cn from 'classnames'

import { useClickOutside } from 'shared/hooks'

import s from './Dropdown.module.scss'

interface DropdownProps {
  title: ReactNode
  children: ReactNode
  className?: string
  titleClassName?: string
  contentClassName?: string
  subTitle?: ReactNode
  noArrow?: boolean
  isHollow?: boolean
}

export const Dropdown: FC<DropdownProps> = ({
  title,
  children,
  className,
  titleClassName,
  contentClassName,
  subTitle,
  noArrow,
  isHollow,
}) => {
  const ref = useRef(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const toggleOpen = () => setIsOpen(prev => !prev)
  const handleClose = () => setIsOpen(false)
  useClickOutside(ref, handleClose)

  const headerClass = cn(s.headerContent, {
    [s.isOpen]: isOpen,
    [s.noArrow]: noArrow,
  })
  const titleClass = cn(s.title, { [s.isOpen]: isOpen }, titleClassName)
  const contentClass = cn(
    s.content,
    { [s.isHollow]: isHollow },
    contentClassName
  )

  return (
    <div ref={ref} className={cn(s.dropdown, className)}>
      <div className={headerClass} onClick={toggleOpen}>
        <div className={titleClass}>
          {title} {subTitle}
        </div>
      </div>
      {isOpen ? <div className={contentClass}>{children}</div> : null}
    </div>
  )
}
