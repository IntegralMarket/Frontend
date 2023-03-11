import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type CompareState = {
  comparedProducts: number[] // TODO obsolete
  comparedOffers: number[]
  comparedBids: number[]
}

const initialState: CompareState = {
  comparedProducts: [],
  comparedOffers: [],
  comparedBids: [],
}

export const compare = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    toggleCompare: (state: CompareState, action: PayloadAction<number>) => {
      if (state.comparedProducts.includes(action.payload)) {
        state.comparedProducts = state.comparedProducts.filter(
          id => id !== action.payload
        )
      } else {
        state.comparedProducts.push(action.payload)
      }
    },
    addToCompare: (state: CompareState, action: PayloadAction<number>) => {
      state.comparedProducts.push(action.payload)
    },
    removeFromCompare: (state: CompareState, action: PayloadAction<number>) => {
      state.comparedProducts.filter(id => id !== action.payload)
    },
    toggleOfferCompare: (
      state: CompareState,
      action: PayloadAction<number>
    ) => {
      if (state.comparedOffers.includes(action.payload)) {
        state.comparedOffers = state.comparedOffers.filter(
          id => id !== action.payload
        )
      } else {
        state.comparedOffers.push(action.payload)
      }
    },
    toggleBidCompare: (state: CompareState, action: PayloadAction<number>) => {
      if (state.comparedBids.includes(action.payload)) {
        state.comparedBids = state.comparedBids.filter(
          id => id !== action.payload
        )
      } else {
        state.comparedBids.push(action.payload)
      }
    },
  },
})

export const {
  addToCompare,
  removeFromCompare,
  toggleCompare,
  toggleOfferCompare,
  toggleBidCompare,
} = compare.actions

export default compare.reducer
