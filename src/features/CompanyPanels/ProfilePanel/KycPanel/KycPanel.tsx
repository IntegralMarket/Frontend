import { FC } from 'react'

import { Table } from 'components'

import { convertToRow, kycColumns } from './utils'
import { KYC } from 'shared/types/company'

import s from './KycPanel.module.scss'

interface KycPanelProps {
  kyc: KYC[]
}

export const KycPanel: FC<KycPanelProps> = ({ kyc }) => {
  return (
    <div className={s.panelContainer}>
      <div className={s.panelContent}>
        {kyc.length ? (
          <Table columns={kycColumns} rows={convertToRow(kyc)} />
        ) : (
          <div className={s.plugText}>No documents available at the moment</div>
        )}
      </div>
    </div>
  )
}
