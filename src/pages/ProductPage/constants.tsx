import { TabPassedProps } from 'components/Tabs/Tab'

export const tabButtonsForTrader: TabPassedProps[] = [
  { label: 'Product' },
  { label: 'Analogs', disabled: true },
  { label: 'Availability', disabled: true },
  { label: 'Offers' },
  { label: 'Bids' },
]

export const tabButtonForProducer: TabPassedProps[] = [
  { label: 'Product' },
  { label: 'Analogs', disabled: true },
  { label: 'Offers' },
  { label: 'Bids' },
]
