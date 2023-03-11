import { FC } from 'react'
import { format, parseISO } from 'date-fns'

import { Icon, TableColumns } from 'components'

import { KYC } from 'shared/types/company'
import { withDomainLink } from 'shared/helpers/convertLink'
import { formatDate } from 'shared/helpers/parseDate'

import s from './KycPanel.module.scss'

interface DocItemProps {
  label: string
  href: string
}

const DocItem: FC<DocItemProps> = ({ label, href }) => (
  <a
    className={s.documentItem}
    href={href}
    target='_blank'
    rel='noopener noreferrer'
    download
  >
    <span className={s.icon}>
      <Icon variant='pdf' />
    </span>{' '}
    {label}
  </a>
)

export const convertToRow = (data: KYC[]) => {
  return data.map(item => ({
    info: (
      <DocItem
        label={item.filename || 'Document'}
        href={withDomainLink(item.file)}
      />
    ),
    verified: item.verified ? 'Self - Verified' : 'Not verified',
    date: formatDate(parseISO(item.updated_at)),
  }))
}

export const kycColumns: TableColumns = {
  info: {
    title: 'COMPANY INFO ',
    height: 80,
    align: 'start',
  },
  verified: {
    title: 'ISSUED/VERIFIED BY',
    height: 80,
    align: 'center',
  },
  date: {
    title: 'DATE OF VERIFICATION',
    height: 80,
    align: 'end',
  },
}
