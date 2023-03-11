import { RootState } from 'store'

export const getSelectedOffer = (state: RootState) => {
  return state.selectedOffer
}
