import { TabPassedProps } from 'components/Tabs/Tab'

export const tabProviderButtons = (id: number): TabPassedProps[] => [
  {
    //icon: 'profile',
    label: 'Company',
    link: `/providers/${id}/profile`,
  },
  {
    //icon: 'delivery',
    label: 'Services',
    link: `/providers/${id}/services`,
  },
]
