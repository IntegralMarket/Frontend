import { FC, ReactNode, useState } from 'react'
import cn from 'classnames'

import { ProgressBar } from 'components'

import s from './Accordion.module.scss'

interface AccordionProps {
  title?: ReactNode
  subTitle?: number
  children?: ReactNode
  onClick?: (isOpen: boolean) => void
  className?: string
  titleClassName?: string
  contentClassName?: string
  withProgressBar?: boolean
  noArrow?: boolean
}

export const Accordion: FC<AccordionProps> = ({
  title,
  subTitle,
  children,
  onClick,
  className,
  titleClassName,
  contentClassName,
  withProgressBar,
  noArrow,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const toggleOpen = () => {
    setIsOpen(prev => !prev)
    onClick?.(isOpen)
  }

  const headerClass = cn(s.headerContent, {
    [s.isOpen]: isOpen,
    [s.noArrow]: noArrow,
  })

  const titleClass = cn(s.titleTop, titleClassName)
  const contentClass = cn(s.content, contentClassName)

  return (
    <div className={cn(s.accordion, className)}>
      <div className={headerClass} onClick={toggleOpen}>
        <div className={titleClass}>
          <span className={s.title}>{title}</span>
          {subTitle && <span className={s.subtitle}>{subTitle} Supplies</span>}
        </div>
        {withProgressBar && <ProgressBar value={subTitle} />}
      </div>

      {isOpen ? <div className={contentClass}>{children}</div> : null}
    </div>
  )
}
