import { Bid } from 'shared/types/bid'
import { Price, Trade } from 'shared/types/products'
import { Offer } from 'shared/types/offer'
import { mockRes } from 'shared/mocks/priceMap'
export const uniqueCountry = (arr: Price[]): Price[] => {
  return arr.filter(
    (value, index, self) =>
      index === self.findIndex(t => t.country.id === value.country.id)
  )
}

export function groupBy<T extends Record<string, any>, K extends keyof T>(
  arr: T[],
  key: K
): Record<T[K], T[]> {
  return arr.reduce((prev, next) => {
    if (!prev[next[key]]) {
      const group = arr.filter(item => item[key] === next[key])
      return { ...prev, [next[key]]: group }
    } else return prev
  }, {} as Record<T[keyof T], T[]>)
}

export function proposalsToMap(
  offers: Offer[],
  bids: Bid[]
): Record<string, Trade> {
  const groupedOffers = groupBy(offers, 'place_of_delivery')
  const groupedBids = groupBy(bids, 'place_of_delivery')

  const result: Record<string, Trade> = {}

  Object.keys(groupedOffers).forEach(function (key) {
    result[key] = {
      offers: [...groupedOffers[key]],
      bids: [],
    }
  })
  Object.keys(groupedBids).forEach(function (key) {
    //@ts-ignore
    result[key] = { offers: [], ...result[key], bids: groupedBids[key] }
  })

  // use this mock to imitate all markers
  // return mockRes
  return result
}
