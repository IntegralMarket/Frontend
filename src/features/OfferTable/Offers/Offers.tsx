import { FC } from 'react'
import { Table, TableColumns, TableRow } from 'components'

import s from '../OfferTable.module.scss'
import cn from 'classnames';

const offersColumns: TableColumns = {
  grade: {
    title: 'Grade',
    height: 40,
    width: '30%',
    align: 'start',
  },
  offer: {
    title: 'Offer',
    height: 40,
    width: '20%',
    align: 'start',
  },
  quantity: {
    title: 'Quantity(MT)',
    height: 40,
    width: '25%',
    align: 'start',
  },
  time: {
    title: 'Lead time',
    height: 40,
    width: '25%',
    align: 'start',
  },
}

interface OffersProps {
  rows: TableRow[]
  place: string
}

const Offers: FC<OffersProps> = ({ rows, place }) => {
  return (
    <div className={cn(s.table, s.bg)}>
      <p className={s.title}>Current offers {place ? `in ${place}` : ''}</p>
      <Table
        contentClassName={s.content}
        className={s.table}
        columns={offersColumns}
        rows={rows}
        grey
      />
    </div>
  )
}

export default Offers
