import { FC, memo, useRef, useState } from 'react'
import cn from 'classnames'

import { Trade } from 'shared/types/products'

import s from './PriceGroup.module.scss'
import { useClickOutside } from 'shared/hooks'

interface PriceGroupProps {
  proposals: Trade
  onClick: (proposals: Trade) => void
}

const MAX_SIZE = 78
const LENGTH_TO_PX_RATIO = 4

const PriceGroup: FC<PriceGroupProps> = ({ proposals, onClick }) => {
  const quantity = proposals.bids?.length + proposals.offers?.length
  const isBid = !Boolean(proposals.offers?.length)
  const [isActive, setIsActive] = useState(false)
  const groupRef = useRef<any>() // TODO

  const selectGroup = () => {
    setIsActive(true)
    setTimeout(() => {
      onClick(proposals)
    }, 200);
  }
  const unselectGroup = () => {
    setIsActive(false)
    setTimeout(() => {
      onClick({ offers: [], bids: [] })
    }, 100);
    // TODO this is a workaround, we use delay to enable link clicks in offer table,
    // and we use longer timeout in selectGroup because both functions are called on click
  }
  useClickOutside(groupRef, unselectGroup)

  const size =
    quantity > MAX_SIZE
      ? MAX_SIZE * LENGTH_TO_PX_RATIO
      : quantity * LENGTH_TO_PX_RATIO
  return (
    <div onClick={selectGroup} ref={groupRef}>
      <div
        className={cn(s.circle, {
          [s.bids]: isBid,
          [s.active]: isActive,
        })}
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <span className={s.text}>{quantity}</span>
      </div>
    </div>
  )
}

export default memo(PriceGroup)
