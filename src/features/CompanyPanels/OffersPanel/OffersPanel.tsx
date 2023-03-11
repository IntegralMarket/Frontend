import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'

import { Roles, Trade } from 'shared/types'
import {
  useCrumbs,
  useGetCategory,
  usePagination,
  useGetProducts,
} from 'shared/hooks'
import { OffersBidsSection } from 'features/OffersBidsSection'
import { parseProductQuery } from 'shared/helpers/parseQuery'

import s from './OffersPanel.module.scss'
import { Offer } from 'shared/types/offer'
import { TraderDetail } from 'shared/types/traders'

interface OffersPanelProps {
  id: number
  role: Roles
  market?: string
  modalOpenHandlers?: { // TODO use modals inside component
    onClickAskQuote: () => void,
    onClickSendOffer: () => void
  }
  seller?: TraderDetail
}

export const OffersPanel: FC<OffersPanelProps> = ({ id, role, market, modalOpenHandlers, seller }) => {
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
  // make request then query changed
  useEffect(() => handleReady(true), [router.query])

  const [pagination, updatePaginationCount, resetPaginationOffset] =
    usePagination()
  const handleShowMore = () => handleReady()

  const [offers, isLoading, handleReady] = useGetProducts(
    query,
    pagination,
    updatePaginationCount,
    resetPaginationOffset,
    roleFilterParam,
    Trade.OFFER
  )
  // update crumbs
  useCrumbs(query, category)


  return (
    <div className={s.container}>
      {offers?.length ? (
        <>
          <OffersBidsSection
            offers={offers ?? []}
            bids={[]}
            category={category}
            query={query}
            params={roleFilterParam}
            isLoading={false}
            role={role}
            market={market}
            hasMoreOffers={false}
            handlePagination={() => { }}
            type={Trade.OFFER}
            onClickAskQuote={modalOpenHandlers?.onClickAskQuote}
            onClickSendOffer={modalOpenHandlers?.onClickSendOffer}
            author={seller ? { rating: seller.rating, id: seller.id, name: seller.company.name, logo: seller.company.logo } : undefined}
          />
        </>
      ) : (
        <span>No available offers</span>
      )}
    </div>
  )
}
