import { FC, useEffect, useState } from 'react'
import s from './TradeMap.module.scss'

import OfferTable from 'features/OfferTable/OfferTable'

import { Trade } from 'shared/types/products'
import { Trade as TradeType } from 'shared/types'

import { Bid } from 'shared/types/bid'
import { Offer } from 'shared/types/offer'
import { Map } from 'features/Map'
import {
  GeoProposalProps,
  convertToGeoComponent,
  getCoordinates,
} from 'features/Map/utils'
import { proposalsToMap } from 'shared/helpers/priceMap'
import { Search } from './Search/Search'
import { useDebounce } from 'shared/hooks/useDebounce'
import { useAppDispatch } from 'shared/hooks'
import { openSendOfferModal, setSelectedBid } from 'store/slices/sendOffer'
import { openAskQuoteModal, setSelectedBidAskQuote } from 'store/slices/askForQuote'

interface TradeMapProps {
  offers: Offer[]
  bids: Bid[]
  type: TradeType
  displayAllOnMap?: boolean
  modal?: boolean
  onClickAskQuote?: (offer?: Partial<Offer>) => void
  onClickSendOffer?: (bid?: Partial<Bid>) => void
}
export const TradeMap: FC<TradeMapProps> = ({
  offers = [],
  bids = [],
  displayAllOnMap = false,
  type = TradeType.OFFER,
  modal,
  onClickAskQuote
}) => {
  const [table, setTable] = useState<Trade>({ bids: [], offers: [] }) // TODO set empty in offers
  const shouldShowTable = table.bids.length || table.offers.length
  const [markers, setMarkers] = useState<GeoProposalProps[]>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const debouncedSearch = useDebounce(searchValue, 300)
  const dispatch = useAppDispatch()
  const [displayedProposals, setDisplayedProposals] = useState<Trade>({
    offers: [],
    bids: [],
  })

  const openSendOffer = (bid: Bid) => {
    dispatch(setSelectedBid(bid))
    dispatch(openSendOfferModal())

  }
  const openAskQuote = (bid: Offer) => {
    dispatch(setSelectedBidAskQuote(bid))
    dispatch(openAskQuoteModal())

  }

  useEffect(() => {
    const displayedOffers =
      type === TradeType.OFFER || displayAllOnMap ? offers : []
    const displayedBids = type === TradeType.BID || displayAllOnMap ? bids : []
    const searchText = (proposal: Offer | Bid, search: string): boolean => {
      if (search === '') {
        return true
      }
      return proposal.place_of_delivery
        .toUpperCase()
        .includes(search.toUpperCase())
    }
    setDisplayedProposals({
      offers: displayedOffers.filter(offer =>
        searchText(offer, debouncedSearch)
      ),
      bids: displayedBids.filter(bid => searchText(bid, debouncedSearch)),
    })
  }, [debouncedSearch, offers, bids, type, displayAllOnMap])

  useEffect(() => {
    setMarkers([])
    const { offers, bids } = displayedProposals
    const proposals = proposalsToMap(offers, bids)
    const loadCoordinates = async (proposals: Trade, country: string) => {
      try {
        const { lat, lng } = await getCoordinates(country)
        setMarkers(prev => [
          ...prev,
          {
            proposals: proposals,
            lat,
            lng,
            onClick: (offer) => openAskQuote?.(offer as Offer),
            onClickSendOffer: (bid) => openSendOffer(bid as Bid), // TODO
            onTableChange: setTable,
          },
        ])
      } catch (error) {
        console.error(error)
      }
    }
    Object.keys(proposals).map(locationKey =>
      loadCoordinates(proposals[locationKey], locationKey)
    )
  }, [displayedProposals])
  return (
    <div className={s.mapWrapper}>
      <div className={s.search}>
        <Search value={searchValue} onChange={setSearchValue} />
      </div>
      {shouldShowTable ? (
        <div className={s.offerTable}>
          <OfferTable {...table} />
        </div>
      ) : null}
      <Map
        zoom={3}
        type={modal ? 'priceModal' : 'price'}
        markers={
          markers.map(marker => convertToGeoComponent(marker)) || undefined
        }
      />
    </div>
  )
}
