import { FC, useState } from 'react'
import cn from 'classnames'

import CalendarWrapper from 'react-calendar'
import { Icon } from 'components/Icon'

import { formatDate, parseDate } from 'shared/helpers/parseDate'

import 'react-calendar/dist/Calendar.css'
import s from './Calendar.module.scss'

interface CalendarProps {
  value?: string | [string, string]
  onChange?: (value: string | [string, string]) => void
  className?: string
  isMulti?: boolean
}

interface TileDate {
  date: Date
}

export const Calendar: FC<CalendarProps> = ({
  value,
  onChange,
  className,
  isMulti,
}) => {
  const [date, setDate] = useState<Date | [Date, Date]>(() => {
    if (!value) return new Date()

    switch (typeof value) {
      case 'object':
        return [parseDate(value[0]), parseDate(value[1])]
      case 'string':
        return parseDate(value)
      case 'number':
      default:
        return new Date()
    }
  })

  const handleChange = (value: Date | [Date, Date]) => {
    setDate(value)

    const strValue: string | [string, string] = Array.isArray(value)
      ? [formatDate(new Date(value[0])), formatDate(new Date(value[1]))]
      : formatDate(new Date(value))

    onChange?.(strValue)
  }

  const tileDisabled = ({ date }: TileDate) =>
    date.valueOf() <= new Date().valueOf() - 24 * 60 * 60 * 1000

  return (
    <CalendarWrapper
      className={cn(s.wrapper, { [s.double]: isMulti }, className)}
      locale='en'
      value={date}
      onChange={handleChange}
      selectRange={isMulti}
      prev2Label={null}
      tileDisabled={tileDisabled}
      showDoubleView={isMulti}
      showFixedNumberOfWeeks={false}
      showNeighboringMonth={false}
      prevLabel={<Icon variant='arrow-right' />}
      nextLabel={<Icon variant='arrow-right' />}
      next2Label={null}
    />
  )
}
