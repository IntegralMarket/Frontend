import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import {
  useAppSelector,
  useCrumbs,
  useGetCategory,
  useGetProducts,
  usePagination,
} from 'shared/hooks'


import { Modal, Tabs } from 'components'
import { Trade, TradeIndexed } from 'shared/types'
import { parseProductQuery } from 'shared/helpers/parseQuery'
import { OffersBidsSection } from 'features/OffersBidsSection'
import { tabBuyerButtons } from './constants'

import cn from 'classnames'
import s from './BuyerPage.module.scss'
import { ProductFilterParams } from 'shared/types/products'
import { AskForQuoteModal } from 'features/AskForQuoteModal'
import { RequestProductForm, SendOfferModal } from 'features'



export const BuyerBidsPage: FC<Partial<ProductFilterParams>> = () => {
  const router = useRouter()
  const id = Number(router.query.id)
  const query = parseProductQuery(router.query)
  const [category] = useGetCategory()

  const compareProductIds = useAppSelector(
    state => state.compare.comparedProducts
  )

  const [isOpenAskQuoteModal, setIsOpenAskQuoteModal] = useState<boolean>(false)
  const handleAskQuoteModal = () => {
    setIsOpenAskQuoteModal(prev => !prev)
  }
  const [isOpenSendOfferModal, setIsOpenSendOfferModal] = useState<boolean>(false)
  const handleSendOfferModal = () => {
    setIsOpenSendOfferModal(prev => !prev)
  }
  // update crumbs
  useCrumbs(query, category)

  useEffect(() => {
    handleBidsReady(true)
  }, [router.query])


  const handleShowMore = () => {
    handleBidsReady()
  }
  const [pagination, updatePaginationCount, resetPaginationOffset] =
    usePagination()


  const [bids, isBidsLoading, handleBidsReady] = useGetProducts(
    query,
    pagination,
    updatePaginationCount,
    resetPaginationOffset,
    { buyer_id__in: id },
    Trade.BID
  )


  const handleTradeChange = (type: number) => {
    if (type === TradeIndexed.BID) {
      router.push(`/polymers/${Trade.BID}`, undefined, {
        scroll: false,

        shallow: true,
      })
    }

  }

  return (
    <div className={s.bidsContainer}>
      <Tabs
        tabButtons={tabBuyerButtons(id)}
        tabPanels={[]}
        rounded
        variant='tag'
        onClick={handleTradeChange}
        className={cn({
          [s.bidsLink]: router.asPath.includes('/bids'),
        })}
      />
      <div className={s.wrapper}>
        <OffersBidsSection
          bids={bids}
          offers={[]}
          query={query}
          category={category}
          isLoading={isBidsLoading}
          compare={compareProductIds}
          handlePagination={handleShowMore}
          hasMoreOffers={!isBidsLoading && pagination.offset < pagination.count}
          type={Trade.BID}
          onClickAskQuote={handleAskQuoteModal} // TODO use modals inside component
          onClickSendOffer={handleSendOfferModal} // TODO remove props drilling, use slices
        />
      </div>
      <Modal isOpen={isOpenAskQuoteModal} onClose={handleAskQuoteModal}>
        <RequestProductForm />
      </Modal>
      <Modal isOpen={isOpenSendOfferModal} onClose={handleSendOfferModal} closeButton>
        <SendOfferModal category={category} />
      </Modal>
    </div>
  )
}
