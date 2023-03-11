import { FC, useEffect, useRef, useState } from 'react'
import { Placement } from '@nextui-org/react'
import cn from 'classnames'

import { Icon, Tooltip } from 'components'

import s from './ProductCardTooltip.module.scss'

interface ProductCardTooltipProps {
  deliveryPeriod: number
  validityDate: number
}

export const ProductCardTooltip: FC<ProductCardTooltipProps> = ({
  deliveryPeriod,
  validityDate,
}) => {
  const [placement, setPlacement] = useState<Placement>('right')

  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ref) return
    const posX: number = ref.current?.getBoundingClientRect().x || 0
    if (posX > 1000) {
      setPlacement('bottom')
    } else {
      setPlacement('right')
    }
  }, [ref])

  const tooltipClass = cn(s.tooltip, s[placement])

  return (
    <div className={s.wrapper} ref={ref}>
      <Tooltip
        trigger='hover'
        placement={placement}
        className={tooltipClass}
        content={
          <>
            <p className={s.description}>
              Validity date:{' '}
              <span className={s.date}>
                {validityDate <= 1 ? '1 day left' : `${validityDate} days left`}
              </span>
            </p>
            <p className={s.description}>
              Delivery period:{' '}
              <span>
                {deliveryPeriod <= 1 ? '1 week' : `${deliveryPeriod} weeks`}
              </span>
            </p>
          </>
        }
      >
        <Icon variant='info' size={12} />
      </Tooltip>
    </div>
  )
}
