import { NextPage } from 'next'
import { ProductPage } from 'pages'
import { Roles } from 'shared/types'

const ProducerProduct: NextPage = () => {
  return <ProductPage role={Roles.PRODUCER} />
}

export default ProducerProduct
