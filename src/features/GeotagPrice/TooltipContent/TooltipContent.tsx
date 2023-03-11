import { FC, ReactNode, useEffect, useRef, useState } from 'react'
import { Placement } from '@nextui-org/react'
import cn from 'classnames'

import { Button, Icon, Title, Tooltip } from 'components'
import { Offer } from 'shared/types/offer'

import s from './TooltipContent.module.scss'
import { Bid } from 'shared/types/bid'
import { useRouter } from 'next/router'
import { getQuantity } from 'shared/helpers/transform'
import { getSelectedOffer } from 'store/selectors/selectedOffer'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../../shared/hooks'
import {
  setSelectedOffer,
  resetSelectedOffer,
} from 'store/slices/selectedOffer'

type TooltipContentProps = (Offer | Bid) & {
  visible: boolean
  isBid?: boolean
  onClick: (offer?: Partial<Offer>) => void // TODO naming should be analog of onClickSendOffer
  onClickSendOffer?: (bid?: Bid) => void
  onClose?: () => void
  children?: ReactNode
}

export const TooltipContent: FC<TooltipContentProps> = ({
  visible,
  children,
  isBid,
  onClose,
  onClick,
  onClickSendOffer,
  ...offerBid
}) => {
  const [placement, setPlacement] = useState<Placement>('right')
  const router = useRouter()
  const ref = useRef<HTMLDivElement | null>(null)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!ref) return
    const posX: number = ref.current?.getBoundingClientRect().x || 0
    if (posX > 950) {
      // TODO what is 950???
      setPlacement('bottom')
    } else {
      setPlacement('right')
    }
  }, [ref, visible])

  const handleClose = (isOpen: boolean) => {
    if (isOpen) return
    onClose?.()
    // dispatch(resetSelectedOffer())
  }

  const handleClick = () => {
    handleClose(false)
    isBid ? onClickSendOffer?.(offerBid as Bid) : onClick(offerBid as Offer)
    visible = false
    // @ts-ignore
  }

  const tooltipClass = cn(s.tooltip, s[placement])

  return (
    <Tooltip
      trigger='click'
      placement={placement}
      className={tooltipClass}
      visible={visible}
      onVisibleChange={handleClose}
      content={
        <div className={s.content}>
          <span
            onClick={() =>
              router.push(
                `/polymers/${offerBid.grade_id}/${isBid ? 'bid' : 'offer'}/${offerBid.id
                }/`
              )
            }
          >
            <Title className={cn(s.title)} As='h5'>
              {offerBid.mark}
            </Title>
          </span>
          <p className={s.subtitle}>
            {offerBid.incoterms} , {offerBid.place_of_delivery}
          </p>

          <div className={s.description}>
            <p>
              {'Quantity(MT):'}
              <span className={s.quantity}>
                {' '}{getQuantity(offerBid.quantity_min, offerBid.quantity_max)}
              </span>
            </p>
            <p>
              Lead time:
              <span className={s.period}>{` ${offerBid.lead_time} weeks`}</span>
            </p>
          </div>
          <button onClick={() => handleClose?.(false)} className={s.cross}>
            <Icon variant='cross' size={12} />
          </button>
          <div className={s.buttonWrapper}>
            {isBid ? (
              <Button
                className={s.button}
                onClick={() => handleClick()}
              >
                Send offer
              </Button>
            ) : (
              <Button className={s.button} onClick={() => handleClick()}>
                Ask for quote
              </Button>
            )}
          </div>
        </div>
      }
    >
      <div ref={ref}>{children}</div>
    </Tooltip>
  )
}
