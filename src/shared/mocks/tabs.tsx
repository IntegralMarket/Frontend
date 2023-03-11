import { TabPassedProps } from 'components/Tabs/Tab'

export const switchTabs = [
  { name: 'Raw materials', disabled: false },
  { name: 'Recycling', disabled: true },
]


export const tradeTabs = [
  { name: 'Offers', disabled: false },
  { name: 'Bids', disabled: false },
]

export const tabButtons: TabPassedProps[] = [
  { label: 'Commodities' },
  { label: 'Producers' },
  { label: 'Traders' },
  { label: 'Service Providers' },
]

export const tabLinkedButtons: TabPassedProps[] = [
  { label: 'Commodities', link: '/' },
  { label: 'Producers', link: '/producers' },
  { label: 'Sellers', link: '/traders' },
  { label: 'Buyers', link: '/buyers' }, // create page TODO
  { label: 'Service Providers', link: '/providers' },
]

export const tabRoundedButtons: TabPassedProps[] = [
  { icon: 'profile', label: 'Company profile' },
  { icon: 'commodities', label: 'Commodities' },
]

export const tabRoundedProviderButtons: TabPassedProps[] = [
  { icon: 'profile', label: 'Company profile' },
  { icon: 'delivery', label: 'Services' },
]

export const tabPanels = [
  <>
    <h3>Commodities</h3>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis eos
      temporibus eum sequi quasi, vitae laudantium maxime{' '}
    </p>{' '}
  </>,
  <>
    <h3>Producers</h3>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis eos
      temporibus eum sequi quasi, vitae laudantium maxime{' '}
    </p>{' '}
  </>,
  <>
    <h3>Traders</h3>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis eos
      temporibus eum sequi quasi, vitae laudantium maxime{' '}
    </p>{' '}
  </>,
  <>
    <h3>Service Providers</h3>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis eos
      temporibus eum sequi quasi, vitae laudantium maxime{' '}
    </p>{' '}
  </>,
]
