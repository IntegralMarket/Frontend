import { TABLET_SCREEN } from 'shared/constants/screenResolutions'

export const isMobile = (width: number): boolean => {
  if (width <= TABLET_SCREEN) return true
  return false
}
