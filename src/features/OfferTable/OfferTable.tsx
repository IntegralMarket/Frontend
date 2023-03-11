import { FC, ReactNode, useEffect, useState } from 'react'
import OffersAndBids from './OffersAndBids/OffersAndBids'
import Bids from './Bids/Bids'
import Offers from './Offers/Offers'
import { convertToRow } from './convertToRow'
import { Bid } from 'shared/types/bid'
import { Offer } from 'shared/types/offer'

interface OfferTableProps {
  offers: Offer[]
  bids: Bid[]
}

const OfferTable: FC<OfferTableProps> = ({ offers, bids }) => {
  const [table, setTable] = useState<ReactNode>(null)
  const offersRow = offers.map(offer => convertToRow(offer))
  const bidsRow = bids.map(bid => convertToRow(bid))
  const place = offers[0]?.place_of_delivery ?? bids[0]?.place_of_delivery ?? ''

  useEffect(() => {
    if (offersRow.length && bidsRow.length) {
      return setTable(<OffersAndBids rows={bidsRow.concat(offersRow)} place={place} />)
    }
    offersRow.length
      ? setTable(<Offers rows={offersRow} place={place} />)
      : setTable(<Bids rows={bidsRow} place={place} />)
  }, [bids, offers])

  return <>{table}</>
}

export default OfferTable
