import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Buyer } from 'shared/types/buyers'

export type BuyersState = {
  buyers: Buyer[]
  idList: number[]
}

const initialState: BuyersState = {
  buyers: [],
  idList: [],
}

export const buyer = createSlice({
  name: 'buyers',
  initialState,
  reducers: {
    setBuyers: (state: BuyersState, action: PayloadAction<Buyer[]>) => {
      const newPayload = action.payload.filter(
        item => !state.idList.includes(item.id)
      )
      const newPayloadIdList = newPayload.map(item => item.id)

      state.buyers = state.buyers.concat(newPayload)
      state.idList = state.idList.concat(newPayloadIdList)
    },
  },
})

export const { setBuyers } = buyer.actions

export default buyer.reducer
