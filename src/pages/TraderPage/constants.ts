import { TabPassedProps } from 'components/Tabs/Tab'

// export const tabTraderButtons = (
//   id: number,
//   hasBids: boolean,
//   hasOffers: boolean
// ): ({ link: string; label: string } | false)[] => [
//   { label: 'Company', link: `/traders/${id}/profile` },
//   hasOffers && { label: 'Offers', link: `/traders/${id}/offers` },
//   hasBids && { label: 'Bids', link: `/traders/${id}/bids` },
// ]

export const tabTraderButtons = (id: number): TabPassedProps[] => [
  { label: 'Company', link: `/traders/${id}/profile` },
  { label: 'Catalog', link: `/traders/${id}/catalog` },
  { label: 'Offers', link: `/traders/${id}/offers` },
  { label: 'Bids', link: `/traders/${id}/bids` },
]
