import { FC } from 'react'

import s from './CloseIcon.module.scss'

interface CloseIconProps {
  toggleMenu: () => void
}

const CloseIcon: FC<CloseIconProps> = ({ toggleMenu }) => {
  return (
    <div className={s.root} onClick={toggleMenu}>
      <div className={s.wrapper}>
        <button className={s.button} />
      </div>
    </div>
  )
}

export default CloseIcon
