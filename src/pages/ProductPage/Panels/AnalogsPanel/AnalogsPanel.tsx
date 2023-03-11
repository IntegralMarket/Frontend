import { FC } from 'react'

import s from './AnalogsPanel.module.scss'

export const AnalogsPanel: FC = () => (
  <div className={s.panelContainer}>
    <div className={s.panelContent}>
      <div className={s.plugText}>Loading...</div>
    </div>
  </div>
)
