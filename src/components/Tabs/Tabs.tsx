import React, { FC, ReactNode, useState } from 'react'
import { useRouter } from 'next/router'
import cn from 'classnames'

import { Tab, TabPassedProps } from './Tab'

import s from 'components/Tabs/Tabs.module.scss'

interface TabsProps {
  tabButtons: TabPassedProps[]
  tabPanels: ReactNode[]
  rounded?: boolean
  addon?: ReactNode
  className?: string
  defaultIndex?: number
  variant?: 'primary' | 'secondary' | 'tag'
  onClick?: (index: number) => void
}

export const Tabs: FC<TabsProps> = ({
  tabPanels,
  tabButtons,
  rounded,
  addon,
  className,
  defaultIndex = 0,
  variant,
  onClick,
}) => {
  const { asPath } = useRouter()
  const [active, setActive] = useState<number>(defaultIndex)
  const handleClick = (index: number) => {
    onClick?.(index)
    setActive(index)
  }

  const tabsClass = cn(s.tabsWrapper, className)
  const headerClass = cn(s.header, { [s.rounded]: rounded })

  const activeTab = (index: number, link?: string): boolean => {
    if (!link) return active === index
    return link !== '/' ? asPath.includes(link) : asPath === link
  }

  return (
    <div className={tabsClass}>
      <div className={headerClass}>
        {tabButtons.map((item, index) => {
          return (
            <Tab
              hidden={false}
              key={index}
              onClick={handleClick}
              index={index}
              {...item}
              active={activeTab(index, item.link)}
              variant={variant}
            />
          )
        })}
        {addon && <div className={s.addon}>{addon}</div>}
      </div>

      {tabPanels.map((item, index) => (
        <div
          key={index}
          className={cn({ [s.hidden]: active !== index }, s.tabPannelBox)}
        >
          {item}
        </div>
      ))}
    </div>
  )
}
