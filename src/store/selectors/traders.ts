import { RootState } from 'store'

export const getSellersByIds = (state: RootState, idList: number[]) => {
  return state.traders.traders.filter(trader => idList.includes(trader.id))
}
