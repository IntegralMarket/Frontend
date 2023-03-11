import { FC } from 'react'

import { Card } from 'components/Card'
import { ProductCardBody, ProductCardHeader } from './components'

import { Roles } from 'shared/types'
import { Product } from 'shared/types/products'

export interface ProductCardProps extends Product {
  role?: Roles
}

export const ProductCard: FC<ProductCardProps> = ({
  id,
  name,
  prices,
  role,
  ...rest
}) => {
  const link = () => {
    switch (role) {
      case Roles.PRODUCER:
        return `/producers/${rest.producer.id}/commodities/${id}`
      case Roles.SELLER:
      default:
        return `/polymers/${id}`
    }
  }

  return (
    <Card
      name={name}
      link={link()}
      subtitle={<ProductCardHeader prices={prices} {...rest} />}
    >
      <ProductCardBody id={id} role={role} {...rest} />
    </Card>
  )
}
