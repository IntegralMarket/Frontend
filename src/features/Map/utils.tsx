import axios from 'axios'

import { CustomMarker, GeotagPrice } from 'features'
import { MapCoordinates, MarkerProps } from './Map'
import { GOOGLE_API_KEY } from './constants'
import { PriceDot } from 'components/PriceDot'
import PriceGroup from 'components/PriceGroup/PriceGroup'
import { Proposal, Trade } from 'shared/types/products'
import { Offer } from 'shared/types/offer'
import { Bid } from 'shared/types/bid'

export interface GeoMarkerProps extends MapCoordinates { // might be obsolete
  id: number
  place: string
  delivery_period: number
  price: string
  onClick: () => void
}

export interface CustomMarkerProps extends MapCoordinates {
  id: number
  onClick: (id: number) => void
  active: boolean
}

export interface GeoProposalProps extends MapCoordinates {
  onClick: (offer?: Partial<Offer>) => void
  onClickSendOffer: (bid?: Partial<Bid>) => void
  onTableChange: (proposals: Trade) => void
  proposals: Trade
}

// export const convertToGeoTag = ({
//   lat,
//   lng,
//   place,
//   delivery_period,
//   price,
//   onClick,
// }: GeoMarkerProps): MarkerProps => {
//   return {
//     position: { lat, lng },
//     component: (
//       <GeotagPrice
//         place={place}
//         deliveryPeriod={delivery_period}
//         price={price}
//         onClick={onClick}
//       />
//     ),
//   }
// }

export const convertToGeoComponent = ({
  lat,
  lng,
  proposals,
  onClick,
  onTableChange,
  onClickSendOffer
}: GeoProposalProps): MarkerProps => {

  const marker = () => {
    if (proposals.offers?.length + proposals.bids?.length === 1) {
      const proposal = proposals.offers[0] ?? proposals.bids[0];
      return <GeotagPrice
        proposal={proposal}
        onClick={onClick}
        onClickSendOffer={onClickSendOffer}
      />
    } else if (proposals.offers?.length + proposals.bids?.length > 1) {
      return <PriceGroup proposals={proposals} onClick={onTableChange} />
    } else return null
  }

  return {
    position: { lat, lng },
    component: (
      marker()
    ),
  }
}

export const convertToCustomMarker = ({
  lat,
  lng,
  id,
  onClick,
  active,
}: CustomMarkerProps): MarkerProps => {
  return {
    position: { lat, lng },
    component: <CustomMarker id={id} onClick={onClick} active={active} />,
  }
}

export const getCoordinates = async (
  address: string
): Promise<MapCoordinates> => {
  const data = await axios(
    'https://maps.googleapis.com/maps/api/geocode/json?address=' +
    address +
    '&key=' +
    GOOGLE_API_KEY
  ).then(response => {
    const lat: number = response.data.results[0].geometry?.location?.lat
    const lng: number = response.data.results[0].geometry?.location?.lng
    return { lat, lng }
  })
  return data
}
