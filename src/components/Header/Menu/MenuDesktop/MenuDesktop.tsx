import { FC } from 'react'
import cn from 'classnames'

import CloseIcon from './CloseIcon/CloseIcon'
import LinkTree from './LinkTree/LinkTree'
import Copyright from './Copyright/Copyright'

import s from './MenuDesktop.module.scss'

interface MenuDesktopProps {
  isMenuOpen: boolean
  toggleMenu: () => void
}

export const MenuDesktop: FC<MenuDesktopProps> = ({
  isMenuOpen,
  toggleMenu,
}) => {
  return (
    <>
      <div className={cn(s.menu, isMenuOpen && s.menuShow)}>
        <div className={s.background} onClick={toggleMenu} />
      </div>
      <nav className={cn(s.wrapper, isMenuOpen && s.wrapperVisible)}>
        <CloseIcon toggleMenu={toggleMenu} />
        <LinkTree toggleMenu={toggleMenu} />
        <Copyright />
      </nav>
    </>
  )
}
