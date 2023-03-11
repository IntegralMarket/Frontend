import { Product } from 'shared/types/products'

export const splitByPrice = (
  products: Product[],
  ascending: boolean
): Product[] => {
  const sortOrder = ascending ? 1 : -1

  return products
    .map(item => {
      if (item.prices.length <= 1) return item

      return item.prices.map((elem, index) => {
        return { ...item, prices: [item.prices[index]] }
      })
    })
    .flat()
    .sort(
      (a, b) =>
        sortOrder * (Number(a.prices[0]?.price) - Number(b.prices[0]?.price))
    )
}
