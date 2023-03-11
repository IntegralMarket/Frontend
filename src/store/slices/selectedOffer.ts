import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Offer } from '../../shared/types/offer'

export type selectedOffer = {
  selectedOffer: Partial<Offer>
}

const initialState: selectedOffer = {
  selectedOffer: {},
}

export const selectedOffer = createSlice({
  name: 'selectedOffer',
  initialState,
  reducers: {
    setSelectedOffer: (
      state: selectedOffer,
      action: PayloadAction<Partial<Offer>>
    ) => {
      state.selectedOffer = action.payload
    },
    resetSelectedOffer: (state: selectedOffer) => {
      state = initialState
    },
  },
})

export const { setSelectedOffer, resetSelectedOffer } = selectedOffer.actions

export default selectedOffer.reducer
