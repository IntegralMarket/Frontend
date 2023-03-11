import { FC, useState } from 'react'

import { Icon } from 'components'

import { Price } from 'shared/types/products'

import { ListItem } from './OfferCardBody'
import { ProductCardProps } from '../OfferCard'

import s from '../OfferCard.module.scss'
import cn from 'classnames'

interface PriceItemProps {
  incoterm: string
  price: string
  country: string
}
export const PriceItem: FC<PriceItemProps> = ({ country, price, incoterm }) => {
  const onClick = () => console.log('click on price')

  return (
    <li className={s.priceItem}>
      <span onClick={onClick} className={s.titlePrice}>
        Price <Icon variant={'arrow-right'} size={10} />
      </span>
      {price !== '0' && price ? (
        <>
          <span className={s.priceValue}>${price}</span>
          <span>
            {country} ({incoterm})
          </span>
        </>
      ) : (
        <span>On request</span>
      )}
    </li>
  )
}

type ProductCardHeaderProps = Omit<ProductCardProps, 'mark' | 'price'>

export const OfferCardHeader: FC<ProductCardHeaderProps> = ({
  product_type,
  processing_method,
  producer,
  mfr,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const toggleOpen = () => setIsOpen(prev => !prev)
  return (
    <>
      <div className={s.container}>
        {isOpen && (
          <>
            <br />
            <ListItem label='Producer' param={producer} />
            <ListItem label='Type' param={product_type} />
            <ListItem label='Processing method' param={processing_method} />
            <ListItem
              label={`MFR (${mfr?.weight || '-'})`}
              param={mfr?.value || '-'}
            />
          </>
        )}
        <div onClick={toggleOpen} className={s.caption}>
          <span className={s.stick} />
          <span
            className={cn(s.arrow, { [s.up]: isOpen, [s.down]: !isOpen })}
          />
        </div>
      </div>
    </>
  )
}
