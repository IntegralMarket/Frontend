import { NextPage } from 'next'
import { ProductPage } from 'pages'
import { Roles } from 'shared/types'

const Product: NextPage = () => <ProductPage role={Roles.SELLER} />

export default Product
