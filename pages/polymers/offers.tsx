import { NextPage } from 'next'
import { ProductsPage } from 'pages'
import { Trade } from 'shared/types'

const Products: NextPage = () => <ProductsPage type={Trade.OFFER} /> // TODO rename

export default Products
