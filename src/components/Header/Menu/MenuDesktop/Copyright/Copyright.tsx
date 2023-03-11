import { FC } from 'react'

import s from './Copyright.module.scss'

const Copyright: FC = () => {
  return (
    <div className={s.root}>
      <span className={s.text}>
        &copy; {new Date().getFullYear()} Integral Commodities. All Rights
        reserved
      </span>
    </div>
  )
}

export default Copyright
