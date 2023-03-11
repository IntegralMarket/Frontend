import { useState } from 'react'
import { DEFAULT_FETCH_COUNT } from 'shared/constants/fetchCards'
import { PaginationType } from 'shared/types'

export const usePagination = (): [
  PaginationType,
  (count: number) => void,
  () => void
] => {
  const [pagination, setPagination] = useState<PaginationType>({
    count: 0,
    limit: DEFAULT_FETCH_COUNT,
    offset: 0,
  })

  const updatePaginationCount = (count: number, offset?: number) =>
    setPagination(prev => {
      return {
        ...prev,
        count,
        offset: offset || prev.offset + DEFAULT_FETCH_COUNT,
      }
    })

  const resetPaginationOffset = () =>
    setPagination(prev => {
      return {
        ...prev,
        offset: 0,
      }
    })

  return [pagination, updatePaginationCount, resetPaginationOffset]
}
