import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Trader } from 'shared/types/traders'
import { getSellersThunk } from 'store/thunks/traders'

export type TradersState = {
  traders: Trader[]
  idList: number[]
}

const initialState: TradersState = {
  traders: [],
  idList: [],
}

export const trader = createSlice({
  name: 'traders',
  initialState,
  reducers: {
    setTraders: (state: TradersState, action: PayloadAction<Trader[]>) => {
      const newPayload = action.payload.filter(
        item => !state.idList.includes(item.id)
      )
      const newPayloadIdList = newPayload.map(item => item.id)

      state.traders = state.traders.concat(newPayload)
      state.idList = state.idList.concat(newPayloadIdList)
    },
  },
  extraReducers: builder => {
    builder.addCase(getSellersThunk.fulfilled, (state, action) => {
      state.traders = [...state.traders, ...action.payload]
    })
    builder.addCase(getSellersThunk.rejected, () => {
      console.error('An error occured')
    })
  },
})

export const { setTraders } = trader.actions

export default trader.reducer
