import { FC, useEffect, useState } from 'react'

import { Map } from 'features'
import {
  convertToGeoComponent,
  GeoProposalProps,
  getCoordinates,
} from 'features/Map/utils'
import { Trade } from 'shared/types/products'

interface PricePanelProps {
  proposals: Record<string, Trade>
  handleQuoteModal: () => void
  onTableChange: (proposals: Trade) => void
}
// WARNING: this component became obsolete
export const PricesPanel: FC<PricePanelProps> = ({
  proposals,
  onTableChange,
  handleQuoteModal,
}) => {
  const [markers, setMarkers] = useState<GeoProposalProps[]>([])

  useEffect(() => {
    const loadCoordinates = async (proposals: Trade, id: number) => {
      try {
        const country =
          proposals.offers[0]?.place_of_delivery ??
          proposals.bids[0]?.place_of_delivery
        const { lat, lng } = await getCoordinates(country)
        // @ts-ignore
        setMarkers(prev => [
          ...prev,
          {
            proposals: proposals,
            lat,
            lng,
            onClick: handleQuoteModal,
            onTableChange: onTableChange,
          },
        ])
      } catch (error) {
        console.error(error)
      }
    }
    // Object.keys(proposals).map((locationKey, index) => loadCoordinates(proposals[locationKey], index))
  }, [proposals])

  return (
    <Map
      zoom={3}
      type='price'
      markers={
        markers?.map(marker => convertToGeoComponent(marker)) || undefined
      }
    />
  )
}
