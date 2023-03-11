import { FC } from 'react'
import cn from 'classnames'

import { TableColumns, TableRow } from './types'

import s from './Table.module.scss'

interface TableProps {
  columns: TableColumns
  rows: TableRow[]
  grey?: boolean
  className?: string
  contentClassName?: string
  rowClassName?: string
}

export const Table: FC<TableProps> = ({
  columns,
  rows,
  grey,
  contentClassName,
  className,
}) => {
  const tableColumns = Object.keys(columns)

  const tableClass = cn(s.table, className)
  const headerClass = cn(s.header, { [s.grey]: grey })
  const cellClass = cn(s.cell, { [s.grey]: grey })

  return (
    <div className={tableClass}>
      <div className={headerClass}>
        {tableColumns.map((item, index) => (
          <div
            key={index}
            className={s.column}
            style={{
              flexBasis: columns[item].width,
            }}
          >
            <div
              key={index}
              className={cellClass}
              style={{
                alignItems: columns[item].align,
              }}
            >
              {columns[item].title}
            </div>
          </div>
        ))}
      </div>
      <div className={cn(s.row, contentClassName)}>
        {tableColumns.map((item, index) => (
          <div
            key={index}
            className={s.column}
            style={{
              flexBasis: columns[item].width,
            }}
          >
            {rows.map((row, index) => (
              <div
                key={index}
                className={cellClass}
                style={{
                  alignItems: columns[item].align,
                  minHeight: columns[item].height,
                }}
              >
                {row[item]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
