import { TabPassedProps } from 'components/Tabs/Tab'

export const tabBuyerButtons = (id: number): TabPassedProps[] => [
  { label: 'Company', link: `/buyers/${id}/profile` },
  { label: 'Bids', link: `/buyers/${id}/bids` },
]
