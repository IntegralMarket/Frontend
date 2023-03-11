import { Offer } from './../../shared/types/offer';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Bid } from 'shared/types/bid'

export type AskForQuoteState = {
  selectedBid?: Offer
  isModalOpen: boolean
}

const initialState: AskForQuoteState = {
  selectedBid: undefined,
  isModalOpen: false,
}

export const askQuote = createSlice({
  name: 'askForQuote',
  initialState,
  reducers: {
    setSelectedBidAskQuote: (state: AskForQuoteState, action: PayloadAction<Offer>) => {
      state.selectedBid = action.payload
    },
    resetSelectedBidAskQuote: (state: AskForQuoteState) => {
      state.selectedBid = undefined
    },
    openAskQuoteModal: (state: AskForQuoteState) => {
      state.isModalOpen = true
    },
    closeAskQuoteModal: (state: AskForQuoteState) => {
      state.isModalOpen = false
    },
    toggleAskQuoteModal: (state: AskForQuoteState) => {
      state.isModalOpen = !state.isModalOpen
    },
  },
})

export const {
  setSelectedBidAskQuote,
  resetSelectedBidAskQuote,
  openAskQuoteModal,
  closeAskQuoteModal,
  toggleAskQuoteModal,
} = askQuote.actions

export default askQuote.reducer
