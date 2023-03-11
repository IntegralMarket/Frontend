import { FC, useState } from 'react'

import Link from 'next/link'
import { MenuDesktop } from './Menu'

import s from './Header.module.scss'

export const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className={s.header}>
      <div className={s.wrapper}>
        <Link href={'/'}>
          <span className={s.logo} />
        </Link>
        <button className={s.menuButton} onClick={toggleMenu} />
      </div>

      <MenuDesktop isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </header>
  )
}
