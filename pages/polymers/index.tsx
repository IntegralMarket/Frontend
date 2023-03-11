import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ProductsPage } from 'pages'
import { Trade } from 'shared/types'

const Products: NextPage = () => {
    const { asPath } = useRouter()
    const type = asPath.includes('bids') ? Trade.BID : Trade.OFFER

    return <ProductsPage type={type} />
} // TODO rename

export default Products
