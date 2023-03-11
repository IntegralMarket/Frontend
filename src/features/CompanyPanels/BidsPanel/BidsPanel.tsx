import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Roles, Trade } from 'shared/types'
import {
  useCrumbs,
  useGetCategory,
  usePagination,
  useGetProducts,
} from 'shared/hooks'
import { parseProductQuery } from 'shared/helpers/parseQuery'

import s from './BidsPanel.module.scss'
import { OffersBidsSection } from 'features/OffersBidsSection'
import { Bid } from 'shared/types/bid'
import { TraderDetail } from 'shared/types/traders'

interface CommodityPanelProps {
  id: number
  role: Roles
  market?: string
  modalOpenHandlers?: { // TODO use modals inside component
    onClickAskQuote: () => void,
    onClickSendOffer: () => void
  }
  seller?: TraderDetail
}

export const BidsPanel: FC<CommodityPanelProps> = ({ id, role, market, modalOpenHandlers, seller }) => {
  const router = useRouter()
  const query = parseProductQuery(router.query)
  const [category] = useGetCategory()

  const roleFilterParam =
    role === Roles.SELLER
      ? {
        trader_id__in: id.toString(),
      }
      : {
        producer_id__in: id.toString(),
      }
  // update crumbs
  useCrumbs(query, category)

  // make request then query changed
  useEffect(() => handleReady(true), [router.query])

  const [pagination, updatePaginationCount, resetPaginationOffset] =
    usePagination()
  const handleShowMore = () => handleReady()

  const [bids, isLoading, handleReady] = useGetProducts(
    query,
    pagination,
    updatePaginationCount,
    resetPaginationOffset,
    roleFilterParam,
    Trade.BID
  )

  return (
    <div className={s.container}>
      {bids?.length ? (
        <>
          <OffersBidsSection
            bids={bids ?? []}
            offers={[]}
            handlePagination={() => { }}
            query={query}
            params={roleFilterParam}
            // isLoading={isLoading}
            role={role}
            market={market}
            hasMoreOffers={
              false
            }
            type={Trade.BID}
            onClickAskQuote={modalOpenHandlers?.onClickAskQuote}
            onClickSendOffer={modalOpenHandlers?.onClickSendOffer}
            author={seller ? { rating: seller.rating, id: seller.id, name: seller.company.name, logo: seller.company.logo } : undefined}
          />
        </>
      ) : (
        <span>No available bids</span>
      )}
    </div>
  )
}
