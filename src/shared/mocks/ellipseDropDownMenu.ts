export const ellipseDropDownMenu: EllpseItem[] = [
  {
    id: 1,
    text: 'Ask for quote',
    icon: 'chat',
    active: true,
  },
  {
    id: 2,
    text: 'Add to compare',
    icon: 'compare',
    active: true,
  },
  {
    id: 3,
    text: 'Share',
    icon: 'share',
    active: true,
  },
  {
    id: 4,
    text: 'Add to favourites',
    icon: 'heart',
    active: false,
  },
]

export interface EllpseItem {
  id: number
  text: string
  icon: string
  active: boolean
}
