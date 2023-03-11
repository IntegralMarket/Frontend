import { DesktopLink } from 'components/Header/Menu/MenuDesktop/LinkTree/types'

export const homeLink: DesktopLink[] = [
  {
    type: 'link',
    link: '/',
    name: 'Home',
    depth: 0,
    isShow: true,
  },
]

export const otherLinks: DesktopLink[] = [
  {
    type: 'link',
    link: '/about-us',
    name: 'About us',
    depth: 0,
    isShow: true,
  },
  {
    type: 'link',
    link: '/order',
    name: 'Order process',
    depth: 0,
    isShow: true,
  },
  {
    type: 'link',
    link: '/services',
    name: 'Services',
    depth: 0,
    isShow: true,
  },
  {
    type: 'link',
    link: '/partners',
    name: 'Partners',
    depth: 0,
    isShow: true,
  },
  {
    type: 'link',
    link: '/dev',
    name: '**DEV**',
    depth: 0,
    isShow: true,
  },
]
