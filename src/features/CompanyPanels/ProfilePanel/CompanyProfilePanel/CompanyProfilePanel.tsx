import { FC } from 'react'

import { Table } from 'components/Table'

import { profileColumns, convertToRow } from './utils'
import { Company } from 'shared/types/company'

import s from './CompanyProfilePanel.module.scss'

interface CompanyProfilePanelProps {
  company: Company
  additional: { key: string; value: string[] }
}

export const CompanyProfilePanel: FC<CompanyProfilePanelProps> = ({
  company,
  additional,
}) => (
  <div className={s.panelContainer}>
    <div className={s.panelContent}>
      <Table
        columns={profileColumns}
        rows={convertToRow(company, additional)}
      />
    </div>
  </div>
)
