import { FC, useState } from 'react'
import cn from 'classnames'

import { ProductCardTooltip } from 'features'
import { Accordion, Icon } from 'components'

import { Price } from 'shared/types/products'

import s from '../ProductCard.module.scss'

const PriceItem: FC<Price> = ({
  country,
  price,
  incoterm,
  validate_date,
  delivery_period,
}) => (
  <li className={s.priceItem}>
    <span>
      {country.name} ({incoterm}):
    </span>
    <span className={s.priceValue}>
      ${price}
      <ProductCardTooltip
        deliveryPeriod={delivery_period}
        validityDate={validate_date}
      />
    </span>
  </li>
)

export const ProductCardHeader: FC<{ prices: Price[] }> = ({ prices }) => {
  const sortedPrices = prices.sort((a, b) => Number(a.price) - Number(b.price))
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const toggleOpen = () => setIsOpen(prev => !prev)

  const toggleArrow = cn(s.priceIcon, { [s.isOpen]: isOpen })

  const AccordionTitle = () => (
    <div className={s.caption}>
      {sortedPrices.length > 1 && (
        <div className={toggleArrow}>
          <Icon variant={'toggle-arrow'} size={10} />
        </div>
      )}
      Price
    </div>
  )

  return (
    <div className={s.container}>
      <Accordion
        title={<AccordionTitle />}
        contentClassName={s.content}
        onClick={toggleOpen}
        noArrow
      >
        <ul className={s.priceList}>
          {sortedPrices.length ? (
            sortedPrices.map((item, index) => (
              <PriceItem key={index} {...item} />
            ))
          ) : (
            <li className={s.priceItem}>On request</li>
          )}
        </ul>
      </Accordion>

      {!isOpen && (
        <ul className={s.priceList}>
          {sortedPrices.length ? (
            <PriceItem {...sortedPrices[0]} />
          ) : (
            <li className={s.priceItem}>On request</li>
          )}
        </ul>
      )}
    </div>
  )
}
