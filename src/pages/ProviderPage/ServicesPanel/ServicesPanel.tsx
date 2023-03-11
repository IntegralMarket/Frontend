import { FC } from 'react'

import { RequestServiceForm } from 'features'

import { Product } from 'shared/types/products'

import s from './ServicesPanel.module.scss'

interface ServicesPanelProps {
  data?: Product[]
}

export const ServicesPanel: FC<ServicesPanelProps> = ({ }) => (
  <div className={s.container}>
    <RequestServiceForm />
  </div>
)
