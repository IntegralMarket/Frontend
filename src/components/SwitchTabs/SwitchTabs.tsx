import { FC, useState } from 'react'

import cn from 'classnames'

import s from './SwitchTabs.module.scss'

interface SwitchTab {
  name: string
  disabled?: boolean
}

interface SwitchTabs {
  tabs: SwitchTab[]
  onClick?: (name: string) => void
  className?: string
  activeClassName?: string
  defaultTab?: number
}

export const SwitchTabs: FC<SwitchTabs> = ({ tabs, onClick, className, activeClassName, defaultTab = 0 }) => {
  const [isActiveTab, setIsActiveTab] = useState<string>(tabs[defaultTab]?.name)
  const handleClick = (name: string) => {
    onClick?.(name)
    setIsActiveTab(name)
  }

  const tabContainerClass = cn(s.tabContainer, className)

  const Tab: FC<SwitchTab> = ({ name, disabled }) => {
    const tabClass = cn(s.tab, {
      [s.active]: isActiveTab === name,
      [s.disabled]: disabled,
    }, isActiveTab === name && activeClassName)

    return (
      <button className={tabClass} onClick={() => handleClick(name)}>
        {name}
      </button>
    )
  }

  return (
    <div className={tabContainerClass}>
      {tabs.length
        ? tabs.map((tab, index) => <Tab key={index} {...tab} />)
        : null}
    </div>
  )
}
