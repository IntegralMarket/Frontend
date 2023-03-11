import React, { useState, useEffect, FC } from 'react'
import { useRouter } from 'next/router'
import cn from 'classnames'

import {
  CompanyFilter,
  RequestProductForm,
  SendOfferModal,
  ThankModal,
} from 'features'
import { Title, Modal, Tabs } from 'components'

import { parseProductQuery, prepareQuery } from 'shared/helpers/parseQuery'
import {
  useGetCategory,
  useGetProducts,
  useCrumbs,
  usePagination,
  useAppSelector,
} from 'shared/hooks'

import s from './ProductsPage.module.scss'

import { Trade, TradeIndexed } from 'shared/types'
import { tabTradeSwitch } from './constants'
import { OffersBidsSection } from 'features/OffersBidsSection'
import { Bid } from 'shared/types/bid'
import { useSelector } from 'react-redux'
import { getSelectedOffer } from '../../store/selectors/selectedOffer'

interface ProductsPageProps {
  type: Trade
}

export const ProductsPage: FC<ProductsPageProps> = ({ type }) => {
  const router = useRouter()
  const query = parseProductQuery(router.query)
  const [category] = useGetCategory()
  const compareProductIds = useAppSelector(
    state => state.compare.comparedProducts
  )

  // update crumbs
  useCrumbs(query, category)

  // make request then query changed
  useEffect(() => {
    handleOffersReady(true)
    handleBidsReady(true)
  }, [router.query])

  const [offerPagination, updateOfferPaginationCount, resetOfferPaginationOffset] =
    usePagination()
  const [bidPagination, updateBidPaginationCount, resetBidPaginationOffset] =
    usePagination()
  const handleShowMore = () => {
    handleBidsReady()
    handleOffersReady()
  }

  // get products from server
  const [offers, isOffersLoading, handleOffersReady, sellers, producers] =
    useGetProducts(
      query,
      offerPagination,
      updateOfferPaginationCount,
      resetOfferPaginationOffset,
      {},
      Trade.OFFER
    )

  const [bids, isBidsLoading, handleBidsReady, buyers] = useGetProducts(
    query,
    bidPagination,
    updateBidPaginationCount,
    resetBidPaginationOffset,
    {},
    Trade.BID
  )

  const [isOpenQuoteModal, setIsOpenQuoteModal] = useState<boolean>(false)
  const handleQuoteModal = () => setIsOpenQuoteModal(prev => !prev)

  const [isOpenAskQuoteModal, setIsOpenAskQuoteModal] = useState<boolean>(false)
  const handleAskQuoteModal = () => {
    setIsOpenAskQuoteModal(prev => !prev)
  }
  const [isOpenSendOfferModal, setIsOpenSendOfferModal] =
    useState<boolean>(false)
  const handleSendOfferModal = () => {
    setIsOpenSendOfferModal(prev => !prev)
  }
  const { selectedOffer } = useSelector(getSelectedOffer)

  const [isOpenThankModal, setIsOpenThankModal] = useState<boolean>(false)
  const handleThankModal = () => setIsOpenThankModal(prev => !prev)

  const [isQuoteSent, setIsQuoteSent] = useState<boolean>(false)
  const handleIsQuoteSent = () => {
    setIsQuoteSent(true)
    handleThankModal()
  }
  const handleSubscribe = () => {
    isQuoteSent ? handleThankModal() : handleQuoteModal()
  }

  const getTotalBids = (bids: number, buyers: unknown[]): string => {
    if (bids) {
      const bidText =
        bids === 1 ? `${bids} bid` : `${bids} bids`
      const buyerText =
        buyers.length === 1
          ? `${buyers.length} buyer`
          : `${buyers.length} buyers`
      return `Found ${bidText} from ${buyerText}`
    } else return 'No bids found by your parameters'
  }
  const handleTradeChange = (type: number) => {
    if (type === TradeIndexed.BID) {
      router.push(
        prepareQuery(`/polymers`, query, { trade: Trade.BID }),
        undefined,
        {
          scroll: false,
          shallow: true,
        }
      )
    }
    if (type === TradeIndexed.OFFER) {
      router.push(
        prepareQuery(`/polymers`, query, { trade: Trade.OFFER }),
        undefined,
        {
          scroll: false,
          shallow: true,
        }
      )
    }
  }
  return (
    <div className={s.productsPage}>
      <div className={s.productsHeader}>
        <Title
          As={'h1'}
          className={cn(s.title, {
            [s.bidTitle]: type === Trade.BID,
          })}
        >
          Polymers
        </Title>
        <Tabs
          tabButtons={tabTradeSwitch}
          tabPanels={[]}
          rounded
          variant='tag'
          onClick={handleTradeChange}
          defaultIndex={
            type === Trade.OFFER ? TradeIndexed.OFFER : TradeIndexed.BID
          }
          className={cn({
            [s.bidsLink]: router.asPath.includes('bids'),
          })}
        />

        {type === Trade.OFFER && (
          <CompanyFilter
            router={router}
            query={query}
            pagination={offerPagination}
            category={category}
            sellers={sellers}
            producers={producers}
          />
        )}
        {type === Trade.BID && (
          <p className={s.bidTotal}>{getTotalBids(bidPagination.count, buyers)}</p>
        )}
      </div>
      {
        <OffersBidsSection
          offers={offers}
          bids={bids}
          query={query}
          category={category}
          isLoading={isBidsLoading || isOffersLoading}
          compare={compareProductIds}
          handlePagination={handleShowMore}
          hasMoreOffers={
            !(isBidsLoading || isOffersLoading) &&
              type === Trade.BID ? bidPagination.offset < bidPagination.count : offerPagination.offset < offerPagination.count
          }
          type={type}
          onClickAskQuote={handleAskQuoteModal} // TODO use modals inside component
          onClickSendOffer={handleSendOfferModal}
        />
      }

      <Modal
        isOpen={isOpenQuoteModal}
        onClose={handleQuoteModal}
        closeButton
        contentClassName={s.requestProductFormCross}
      >
        <RequestProductForm
          category={category}
          query={query}
          onClose={handleQuoteModal}
          onCallbackSubmit={handleIsQuoteSent}
        />
      </Modal>

      <Modal isOpen={isOpenThankModal} onClose={handleThankModal} closeButton>
        <ThankModal onClose={handleThankModal} />
      </Modal>
      <Modal isOpen={isOpenAskQuoteModal} onClose={handleAskQuoteModal}>
        <RequestProductForm
          // @ts-ignore
          offer={selectedOffer} // TODO commented to fix style in modal
        />
      </Modal>
      <Modal
        isOpen={isOpenSendOfferModal}
        onClose={handleSendOfferModal}
        closeButton
      >
        <SendOfferModal category={category} />
      </Modal>
    </div>
  )
}
