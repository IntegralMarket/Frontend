import { NextPage } from 'next'
import { Find } from 'pages'
import { Trade } from 'shared/types'

const FindPage: NextPage = () => <Find tab={Trade.BID} />

export default FindPage
