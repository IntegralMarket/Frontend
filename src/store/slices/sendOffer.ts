import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Bid } from 'shared/types/bid'

export type SendOfferState = {
  selectedBid?: Bid
  isModalOpen: boolean
}

const initialState: SendOfferState = {
  selectedBid: undefined,
  isModalOpen: false,
}

export const sendOffer = createSlice({
  name: 'selectedBid',
  initialState,
  reducers: {
    setSelectedBid: (state: SendOfferState, action: PayloadAction<Bid>) => {
      state.selectedBid = action.payload
    },
    resetSelectedBid: (state: SendOfferState) => {
      state.selectedBid = undefined
    },
    openSendOfferModal: (state: SendOfferState) => {
      state.isModalOpen = true
    },
    closeSendOfferModal: (state: SendOfferState) => {
      state.isModalOpen = false
    },
    toggleSendOfferModal: (state: SendOfferState) => {
      state.isModalOpen = !state.isModalOpen
    },
  },
})

export const {
  setSelectedBid,
  resetSelectedBid,
  openSendOfferModal,
  closeSendOfferModal,
  toggleSendOfferModal,
} = sendOffer.actions

export default sendOffer.reducer
