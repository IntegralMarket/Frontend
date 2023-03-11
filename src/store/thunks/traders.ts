import { createAsyncThunk } from '@reduxjs/toolkit'
import { DefaultPaginationParams } from 'shared/types/api'
import { Trader } from 'shared/types/traders'
import { getSellers } from 'shared/api/routes/sellers'

export const getSellersThunk = createAsyncThunk<
  Trader[],
  DefaultPaginationParams
>('traders/getSellersThunk', async payload => {
  const { limit, offset } = payload
  const response = await getSellers({ limit, offset })
  if (response.status === 200 && response.data.results.length) {
    const traders: Trader[] = response.data.results
    return traders
  }
  return []
})
