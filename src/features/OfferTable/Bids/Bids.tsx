import React, { FC } from 'react'
import { Table, TableColumns, TableRow } from 'components'
import s from '../OfferTable.module.scss'
import cn from 'classnames'

const offersColumns: TableColumns = {
  grade: { // TODO duplicates in 3 tables?
    title: 'Grade',
    height: 40,
    width: '30%',
    align: 'start',
  },
  bid: {
    title: 'Bid',
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

interface BidsProps {
  rows: TableRow[]
  place: string
}

const Bids: FC<BidsProps> = ({ rows, place }) => {
  return (
    <div className={cn(s.table, s.bg)}>
      <p className={s.title}>
        Current <span className={s.titleBids}>BIDS</span> {place ? `in ${place}` : ''}
      </p>
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

export default Bids
