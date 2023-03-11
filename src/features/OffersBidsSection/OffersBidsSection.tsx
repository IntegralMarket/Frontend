import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import s from './OffersBidsSection.module.scss'
import cn from 'classnames'
import { FilterProductsModal, RequestProductForm, SendOfferModal } from 'features'
import {
  Button,
  CountBadge,
  Dropdown,
  IconButton,
  Modal,
  RadioGroup,
  Title,
  ToggleSwitch,
} from 'components'

import { prepareQuery } from 'shared/helpers/parseQuery'
import { ProductFilterParams, TraderBrief } from 'shared/types/products'
import { CategoryDetail } from 'shared/types/categories'
import { Roles, SortOptions, Trade, View } from 'shared/types'
import { sortOptions } from 'shared/mocks/radiogroup'
import { TradeMap } from 'features/TradeMap'

import { Offer } from 'shared/types/offer'
import { Bid } from 'shared/types/bid'
import { OfferCard } from 'features/OfferCardSection/OfferCard'
import { BidCard } from 'features/BidCardSection/BidCard'
import { useAppSelector } from 'shared/hooks'

interface OffersBidsSectionProps {
  offers: Offer[]
  bids: Bid[]
  category?: CategoryDetail | null
  query: Partial<ProductFilterParams>
  params?: Partial<ProductFilterParams>
  role?: Roles
  type?: Trade
  market?: string
  isLoading?: boolean
  compare?: number[]
  handlePagination: () => void
  hasMoreOffers: boolean
  onClickAskQuote?: (offer?: Partial<Offer>) => void
  onClickSendOffer?: (bid?: Partial<Bid>) => void
  author?: TraderBrief
}

export const OffersBidsSection: FC<OffersBidsSectionProps> = ({
  offers,
  bids,
  category,
  query,
  params,
  role,
  market,
  isLoading = false,
  compare = [], // TODO obsolete, remove
  handlePagination,
  hasMoreOffers = false,
  type = Trade.OFFER,
  onClickAskQuote,
  onClickSendOffer,
  author
}) => {
  const [viewType, setViewType] = useState<View>(View.grid)
  const [displayAllOnMap, setDisplayAllOnMap] = useState<boolean>(false) // show both offers and bids
  const [isOpenQuoteModal, setIsOpenQuoteModal] = useState<boolean>(false)
  const [isSendOfferOpen, setIsSendOfferOpen] = useState<boolean>(false)
  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(
    undefined
  )
  const [selectedBid, setSelectedBid] = useState<Bid | undefined>(undefined)
  const { comparedBids, comparedOffers } = useAppSelector((state) => state.compare);
  const compareCount = comparedBids.length + comparedOffers.length
  const hasResults = Boolean(type === Trade.OFFER && offers.length || type === Trade.BID && bids.length)
  const handleQuoteModal = (offer: Offer) => {
    setSelectedOffer(offer)
    setIsOpenQuoteModal(true)
  }
  const closeQuoteModal = () => {
    setIsOpenQuoteModal(false)
    setSelectedOffer(undefined)
  }
  const openSendOfferModal = (bid: Bid) => {
    setSelectedBid(bid)
    setIsSendOfferOpen(true)
  }
  const closeSendOfferModal = () => {
    setSelectedBid(undefined)
    setIsSendOfferOpen(false)
  }

  const router = useRouter()

  const handleSort = (value: string) => {
    router.replace(
      prepareQuery(router.asPath, query, {
        ordering: value as SortOptions,
      }),
      undefined,
      { shallow: true }
    )
  }
  useEffect(() => {
    if (viewType == View.compare && compareCount === 0) {
      setViewType(View.grid)
    }
  }, [viewType, compareCount])
  return (
    <>
      {role === Roles.PRODUCER ? ( // TODO  this block is obsolete
        <div className={s.producerBlock}>
          <div>
            <Title As='h5' className={s.faqCaption}>
              How to buy:
            </Title>
            <ul className={s.faqList}>
              <li className={s.faqListItem}>
                Directly from the Producer through Commodities Exchange JSC
                &quot;CERU&quot; -{' '}
                <a
                  className={s.link}
                  href={market}
                  target={'_blank'}
                  rel='noreferrer'
                >
                  {market?.replace(/^https?:\/\//g, '')}
                </a>
              </li>
              <li className={s.faqListItem}>
                See the offers from the sellers for each grade
              </li>
            </ul>
          </div>
          <FilterProductsModal
            query={query}
            category={category}
            params={params}
          />
        </div>
      ) : (
        <div className={s.filterBlock}>
          <div className={s.toggle}>
            {router.pathname.includes('/polymers') ? (
              <>
                {viewType === View.map && (
                  <>
                    <span
                      className={cn(s.showOffer, {
                        [s.showBid]: type === Trade.OFFER,
                      })}
                    >
                      Show {type === Trade.BID ? Trade.OFFER : Trade.BID}
                    </span>
                    <ToggleSwitch
                      value={displayAllOnMap}
                      onChange={setDisplayAllOnMap}
                      className={cn({ [s.switch]: type === Trade.OFFER })}
                    />
                  </>
                )}{' '}
              </>
            ) : null}
          </div>
          <div className={s.navigation}>
            <FilterProductsModal
              category={category}
              query={query}
              params={params}
            />
            <Dropdown
              className={s.dropdown}
              noArrow
              title={<IconButton icon='sort' tooltip='Sort' />}
            >
              <RadioGroup
                className={s.radioGroup}
                name='sort'
                value={(query.ordering || SortOptions.price).toString() || null}
                onClick={handleSort}
                options={sortOptions}
              />
            </Dropdown>
            <IconButton
              icon='squares'
              active={viewType === View.grid}
              onClick={() => {
                setViewType(View.grid)
              }}
              tooltip='Show as grid'
            />
            <IconButton
              icon='map'
              active={viewType === View.map}
              onClick={() => {
                setViewType(View.map)
              }}
              tooltip='Show as map'
            />
            {compareCount ? (
              <CountBadge count={compareCount}>
                <IconButton
                  icon='compare'
                  active={viewType === View.compare}
                  onClick={() => {
                    setViewType(View.compare)
                  }}
                  tooltip='Show compare'
                />
              </CountBadge>
            ) : null}
          </div>
          {type === Trade.OFFER ? (
            <Button className={s.actionButton} onClick={() => setIsOpenQuoteModal(true)}>
              ask&nbsp;for&nbsp;quote
            </Button>
          ) : (
            <Button className={s.actionButton} onClick={onClickSendOffer}>
              send offer
            </Button>
          )}
        </div>
      )}
      {!hasResults && (
        <div className={s.plugText}>
          Nothing to show. Try to change filter parameters
        </div>
      )}
      {hasResults && viewType === View.map && (
        <TradeMap
          offers={offers}
          bids={bids}
          type={type}
          displayAllOnMap={displayAllOnMap}
          onClickAskQuote={onClickAskQuote}
          // @ts-ignore
          onClickSendOffer={openSendOfferModal}
        />
      )}
      {hasResults && viewType === View.grid && (
        <>
          <div className={s.cardGrid}>
            {type === Trade.OFFER
              ? offers.map((card, index) => (
                <OfferCard
                  key={index}
                  {...card}
                  role={role}
                  onRequest={handleQuoteModal}
                />
              ))
              : null}
            {type === Trade.BID
              ? bids.map((card, index) => (
                <BidCard key={index} {...card} role={role} onRequest={(bid) => openSendOfferModal(bid)} />
              ))
              : null}
          </div>
          {hasMoreOffers && (
            <Button
              onClick={handlePagination}
              variant='outline'
              className={s.showMoreButton}
            >
              Show more...
            </Button>
          )}
        </>)}
      {viewType === View.compare && compareCount && (
        <div className={s.cardGrid}>
          {offers
            .filter(({ id }) => comparedOffers.includes(id))
            .map((card, index) => (
              <OfferCard
                key={index}
                {...card}
                role={role}
                onRequest={handleQuoteModal}
              />
            ))}
          {bids
            .filter(({ id }) => comparedBids.includes(id))
            .map((card, index) => (
              <BidCard key={index} {...card} role={role} onRequest={(bid) => openSendOfferModal(bid)} />
            ))}
        </div>
      )}

      {isLoading && <div className={s.plugText}>Loading...</div>}
      <Modal
        isOpen={isOpenQuoteModal}
        onClose={closeQuoteModal}
        closeButton
        contentClassName={s.requestProductFormCross}
      >
        <RequestProductForm
          category={category}
          query={query}
          onClose={closeQuoteModal}
          offer={selectedOffer}
          trader={author}
        />
      </Modal>
      <Modal
        isOpen={isSendOfferOpen}
        onClose={closeSendOfferModal}
        closeButton
        contentClassName={s.requestProductFormCross}

      >
        <SendOfferModal
          category={category}
          bid={selectedBid}
          buyer={author ? author.name : undefined}
        />
      </Modal>
    </>
  )
}
