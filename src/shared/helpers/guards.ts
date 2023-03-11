import { Bid } from 'shared/types/bid'
import { Offer } from 'shared/types/offer'

export const isOffer = (proposal: Bid | Offer): proposal is Offer => {
  return 'trader' in proposal
}

export const isBid = (proposal: Bid | Offer): proposal is Bid => {
  return 'author' in proposal
}
