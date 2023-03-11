import { NextPage } from 'next'
import { ProductPage } from 'pages'
import { Roles } from 'shared/types'

const SellerProduct: NextPage = () => {
    return <ProductPage role={Roles.SELLER} />
}

export default SellerProduct
