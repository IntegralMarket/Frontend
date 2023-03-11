import { FC, useState } from 'react'
import { Dropdown } from '../Dropdown'
import { Tooltip } from '../Tooltip'
import { extraIcon } from 'components/Icon/ExtraIcons'

import {
  EllpseItem,
  ellipseDropDownMenu,
} from 'shared/mocks/ellipseDropDownMenu'
import { useAppDispatch, useAppSelector } from 'shared/hooks'
import { toggleBidCompare, toggleOfferCompare } from 'store/slices/compare'

import s from './EllipseDropDownMenu.module.scss'
import cn from 'classnames'

interface EllipseDropDownMenuProps {
  onRequest?: (id: number) => void
  link?: string
  isCompared?: boolean
  id?: number
  className?: string
}

const EllipseDropDownMenu: FC<EllipseDropDownMenuProps> = ({
  onRequest,
  link,
  id,
  className,
}) => {
  const isBid = link?.includes('bid') // TODO
  const dispatch = useAppDispatch()
  const isCompared = useAppSelector(state =>
    id ? state.compare[isBid ? 'comparedBids' : 'comparedOffers'].includes(id) : false
  )
  const handleCompare = (id: number) => {

    dispatch(isBid ? toggleBidCompare(id) : toggleOfferCompare(id))
  }
  const [hoverElement, setHoverElement] = useState<number | null>(null)

  const baseURL = typeof window !== 'undefined' ? window.location?.origin : ''
  // navigator.clipboard.writeText(`${baseURL}${link}`)
  const getEllipseText = (item: EllpseItem) => {
    if (item.icon === 'chat' && isBid) {
      return 'Send offer'
    }
    if (item.icon === 'compare') {
      return isCompared ? 'Remove form compare' : 'Add to compare'
    }
    return item.text
  }
  const prepareMenu = (menu: EllpseItem[]) => {
    return menu
    // return menu.map((item) => {
    //   // if (item.icon === 'compare') {
    //   //   return ({ ...item, active: !isBid })
    //   // } else return item
    // }).sort((item) => item.active ? -1 : 1)
  }
  const onClick = (text: string) => {
    switch (text) {
      case 'chat':
        id && onRequest?.(id)
        return
      case 'compare':
        id && handleCompare(id)
        return
      case 'share':
        navigator.clipboard.writeText(`${baseURL}${link}`).then(function (x) {
          alert('copied')
        })
        return
      default:
        return
    }
  }

  return (
    <Dropdown
      noArrow
      className={s.dropDown}
      contentClassName={s.dropDownContent}
      title={<div className={cn(s.ellipse, className)} />}
    >
      {prepareMenu(ellipseDropDownMenu).map(item => (
        <Tooltip
          key={item.text}
          trigger='hover'
          onVisibleChange={visible =>
            visible ? setHoverElement(item.id) : setHoverElement(null)
          }
          placement='right'
          className={cn(s.tooltip, {
            [s.disabled]: !item.active,
          })}
          content={getEllipseText(item)}
        >
          <div onClick={() => onClick(item.icon)} className={s.iconWrapper}>
            {extraIcon(
              item.icon,
              item.active,
              hoverElement === item.id ||
              (item.icon === 'compare' && isCompared)
            )}
          </div>
        </Tooltip>
      ))}
    </Dropdown>
  )
}

export default EllipseDropDownMenu
