import { TableColumns, TableRow } from 'components'
import { parseISO } from 'date-fns'
import { formatDate } from 'shared/helpers/parseDate'
import { Company } from 'shared/types/company'

import s from './CompanyProfilePanel.module.scss'

export const convertToRow = (
  company: Company,
  additional: { key: string; value: string[] }
): TableRow[] => {
  const row = (caption: string, value: string | number) => {
    return {
      info: (
        <div className={s.tableCell}>
          <span className={s.caption}>{caption}</span>
          <span className={s.value}>{value || '--'}</span>
        </div>
      ),
      verified: value ? 'Self - Verified' : '--',
      date: value ? formatDate(parseISO(company.date_of_verification)) : '--',
    }
  }

  return [
    row('Company name', company.name),
    row('Company number', company.number),
    row('Legal Address', company.legal_address),
    row('Industry', company.industry),
    row('Nature of business', company.nature_of_business),
    row(additional.key, additional.value.join(', ')),
    row('Number of employees', company.number_of_employees),
    row('Sales / Purchases', company.sales),
  ]
}

export const profileColumns: TableColumns = {
  info: {
    title: 'COMPANY INFO',
    width: '40%',
    align: 'start',
  },
  verified: {
    title: 'ISSUED/VERIFIED BY',
    width: '40%',
    align: 'start',
  },
  date: {
    title: 'DATE OF VERIFICATION',
    width: '20%',
    align: 'start',
  },
}
