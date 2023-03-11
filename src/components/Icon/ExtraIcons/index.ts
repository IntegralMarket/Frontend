import { AddIcon } from './AddIcon'
import { ReactElement } from 'react'
import { TrashIcon } from './TrashIcon'
import { BoxTickIcon } from './BoxTickIcon'
import { CoinIcon } from './CoinIcon'
import { CommoditiesIcon } from './CommoditiesIcon'
import { DeliveryIcon } from './DeliveryIcon'
import { DocIcon } from './DocIcon'
import { ErrorIcon } from './ErrorIcon'
import { FactoryIcon } from './FactoryIcon'
import { FilterIcon } from './FilterIcon'
import { GlobalSearchIcon } from './GlobalSearchIcon'
import { HeartIcon } from './HeartIcon'
import { HomeHashtagIcon } from './HomeHashtagIcon'
import { InfoIcon } from './InfoIcon'
import { MapIcon } from './MapIcon'
import { MenuIcon } from './MenuIcon'
import { PierIcon } from './PierIcon'
import { ProfileIcon } from './ProfileIcon'
import { RadioButton } from './RadioButtton'
import { RoutingIcon } from './RoutingIcon'
import { SettingIcon } from './SettingIcon'
import { SortIcon } from './SortIcon'
import { SquaresIcon } from './SquaresIcon'
import { WarningIcon } from './WarningIcon'
import { ChatIcon } from './ChatIcon'
import { CompareIcon } from './CompareIcon'
import { ShareIcon } from './ShareIcon'

export const extraIcon = (
  key: string,
  active: boolean,
  isHover?: boolean
): ReactElement<any, any> | null => {
  switch (key) {
    case 'add':
      return AddIcon(active)
    case 'trash':
      return TrashIcon(active)
    case 'box-tick':
      return BoxTickIcon(active)
    case 'coin':
      return CoinIcon(active)
    case 'commodities':
      return CommoditiesIcon(active)
    case 'delivery':
      return DeliveryIcon(active)
    case 'doc':
      return DocIcon(active)
    case 'error':
      return ErrorIcon(active)
    case 'factory':
      return FactoryIcon(active)
    case 'filter':
      return FilterIcon(active)
    case 'globalSearch':
      return GlobalSearchIcon(active, isHover)
    case 'home':
      return HomeHashtagIcon(active)
    case 'info':
      return InfoIcon(active)
    case 'map':
      return MapIcon(active)
    case 'menu':
      return MenuIcon(active)
    case 'pier':
      return PierIcon(active)
    case 'profile':
      return ProfileIcon(active)
    case 'radioButton':
      return RadioButton(active)
    case 'route':
      return RoutingIcon(active)
    case 'settings':
      return SettingIcon(active)
    case 'sort':
      return SortIcon(active)
    case 'squares':
      return SquaresIcon(active)
    case 'warning':
      return WarningIcon(active)
    case 'heart':
      return HeartIcon(active, isHover)
    case 'chat':
      return ChatIcon(active, isHover)
    case 'compare':
      return CompareIcon(active, isHover)
    case 'share':
      return ShareIcon(active, isHover)
    default:
      return null
  }
}
