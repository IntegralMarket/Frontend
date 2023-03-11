import { TabPassedProps } from 'components/Tabs/Tab'

export const tabProducerButtons = (id: number): TabPassedProps[] => [
  {
    //icon: 'profile',
    label: 'Company',
    link: `/producers/${id}/profile`,
  },
  {
    //icon: 'commodities',
    label: 'Catalog',
    link: `/producers/${id}/commodities`,
  },
]
