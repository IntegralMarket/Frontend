import { FC } from 'react'

import { parseISO } from 'date-fns'

import { Table, Title } from 'components'
import { GradeDetail, ProductDetail } from 'shared/types/products'
import { formatDate } from 'shared/helpers/parseDate'
import { convertToRow, availabilitiesColumns } from './utils'

import s from './AvailabilityPanel.module.scss'

interface ListItemProps {
  label: string
  value?: string | number
}

const ListItem: FC<ListItemProps> = ({ label, value }) => (
  <li className={s.infoItem}>
    <span className={s.label}>
      {label}
      {': '}
    </span>
    <span className={s.value}>{value}</span>
  </li>
)

export const AvailabilityPanel: FC<GradeDetail> = ({ author }) => {
  {
    /*const date = formatDate(parseISO(created_at))*/
  }

  return (
    <div className={s.panelContainer}>
      <div className={s.panelContent}>
        <Title As='h5' className={s.documentTitle}>
          Warehouse receipt
        </Title>
        <ul className={s.infoList}>
          <ListItem label='Received from' value={author?.name} />
          <ListItem label='Received and verified by' value={'Warehouse X'} />
          <ListItem
            label='Received at'
            value={'“Warehouse X” One Chamberlain Square B3 3AX'}
          />
          {/*<ListItem label='Status on' value={date} />*/}
        </ul>
        {/*{availabilities.length ? (*/}
        {/*  <Table*/}
        {/*    columns={availabilitiesColumns}*/}
        {/*    rows={convertToRow(availabilities)}*/}
        {/*  />*/}
        {/*) : (*/}
        {/*  <div className={s.plugText}>*/}
        {/*    No product information available at the moment*/}
        {/*  </div>*/}
        {/*)}*/}
      </div>
    </div>
  )
}
