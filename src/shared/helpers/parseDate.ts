import { format, parse } from 'date-fns'

const dateLocale = 'dd.MM.yyyy'

export const formatDate = (date: number | Date): string =>
  format(date, dateLocale)

export const parseDate = (date: string): Date =>
  parse(date, dateLocale, new Date())

export const getFirstNumber = (str: string): number => {
  const match = str.match(/[0-9]+/)

  if (match) {
    return parseInt(match[0])
  }
  return 0
}
