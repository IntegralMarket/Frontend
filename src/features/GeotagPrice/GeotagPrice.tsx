import { FC, useRef, useState } from 'react'
import cn from 'classnames'

import { TooltipContent } from './TooltipContent'

import { Offer } from 'shared/types/offer'

import s from './GeotagPrice.module.scss'
import { PriceDot } from 'components/PriceDot'
import { Bid } from 'shared/types/bid'
import { isBid } from 'shared/helpers/guards'

type GeotagPriceProps = {
  proposal: Offer | Bid;
  onClick: (offer?: Partial<Offer>) => void;
  onClickSendOffer: (bid?: Partial<Bid>) => void
}

export const GeotagPrice: FC<GeotagPriceProps> = ({ proposal, onClick, onClickSendOffer }) => {
  const [isActive, setIsActive] = useState<boolean>(false)
  const tagRef = useRef<any>()
  const toggleActive = () => setIsActive(prev => !prev)
  const handleClose = () => setIsActive(false)
  return (
    <TooltipContent
      {...proposal}
      visible={isActive}
      onClick={onClick}
      onClickSendOffer={onClickSendOffer}
      onClose={handleClose}
      isBid={isBid(proposal)}
    > {
        proposal.price !== '0' && proposal.price ? <div
          className={cn(s.point, isBid(proposal) ? s.green : s.blue, {
            [s.active]: isActive
          })}
          onClick={toggleActive}
        >
          <div ref={tagRef} className={cn(s.tooltip, isBid(proposal) ? s.green : s.blue, {
            [s.active]: isActive
          })}>
            <span className={s.value}>${proposal.price}</span>
          </div>
        </div> : <span onClick={toggleActive}><PriceDot isBid={isBid(proposal)} /></span>
      }

    </TooltipContent>
  )
}
