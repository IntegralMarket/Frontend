import { FC, useState } from 'react'
import { extraIcon } from 'components/Icon/ExtraIcons'
import { EllpseItem } from 'shared/mocks/ellipseDropDownMenu'

import { Tooltip } from 'components'
import cn from 'classnames'
import s from './TraderActionMenu.module.scss'

interface Menu {
  item: EllpseItem
  onClick: () => void
}

interface TenderMenuProps {
  menu: Menu[]
}

export const TraderActionMenu: FC<TenderMenuProps> = ({ menu }) => {
  const [hoverElement, setHoverElement] = useState<number | null>(null)

  const isActive = (item: EllpseItem) => hoverElement === item.id

  return (
    <div className={s.wrapper}>
      {menu.map(menuItem => (
        <Tooltip
          key={menuItem.item.id}
          trigger='hover'
          onVisibleChange={visible =>
            visible ? setHoverElement(menuItem.item.id) : setHoverElement(null)
          }
          placement='right'
          className={cn(s.tooltip, {
            [s.disabled]: !menuItem.item.active,
          })}
          content={menuItem.item.text}
        >
          <div onClick={menuItem.onClick} className={s.iconWrapper}>
            {extraIcon(
              menuItem.item.icon,
              menuItem.item.active,
              isActive(menuItem.item)
            )}
          </div>
        </Tooltip>
      ))}
    </div>
  )
}
