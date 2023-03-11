import { FC } from 'react'
import cn from 'classnames'

import { FooterList } from './FooterList'

import s from './Footer.module.scss'

import {
  footerlist_1,
  footerlist_2,
  footerlist_3,
  footerlist_4,
} from 'shared/mocks/footerlist'

export type FooterVariant = 'primary' | 'accent' | 'lazur'

interface FooterProps {
  variant?: FooterVariant
}

export const Footer: FC<FooterProps> = ({ variant = 'primary' }) => {
  const leftClass = cn(s.left, { [s.red]: variant === 'accent', [s.lazur]: variant === 'lazur' })

  return (
    <footer className={s.footer}>
      <div className={s.container}>
        <div className={leftClass}>
          <FooterList title='INFO' items={footerlist_1} />

          <div className={s.logo} />

          <p className={s.text}>
            © 2022 Integral Group.
            <br /> All Rights reserved
          </p>
        </div>

        <div className={s.right}>
          <div className={s.wrapper}>
            <FooterList title='PAGES' items={footerlist_2} />
            <FooterList
              title='COMMODITIES'
              columnsAmount={2}
              items={footerlist_3}
            />
          </div>
          <FooterList orientation='row' items={footerlist_4} />
        </div>
      </div>
    </footer>
  )
}
