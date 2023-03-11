import { FC, useEffect } from 'react'
import { NextRouter } from 'next/router'

import { CompanyFilter, OfferCardSection } from 'features'

import { ProductDetail } from 'shared/types/products'
import { CategoryDetail } from 'shared/types/categories'
import { useCrumbs, useGetProducts, usePagination } from 'shared/hooks'
import { parseProductQuery } from 'shared/helpers/parseQuery'

import s from './OffersPanel.module.scss'

interface OffersPanelProps extends ProductDetail {
  router: NextRouter
  category: CategoryDetail | null
}

export const OffersPanel: FC<OffersPanelProps> = ({
  router,
  category,
  name,
  origin,
  producer,
}) => {
  const query = parseProductQuery(router.query)

  // update crumbs
  useCrumbs(query, category)

  // make request then query changed
  useEffect(() => handleReady(true), [router.query])

  const [pagination, updatePaginationCount, resetPaginationOffset] =
    usePagination()
  const handleShowMore = () => handleReady()

  const [products, isLoading, handleReady] = useGetProducts(
    query,
    pagination,
    updatePaginationCount,
    resetPaginationOffset,
    {
      name,
      producer_id__in: producer.id.toString(),
    }
  )

  return (
    <div className={s.panelContainer}>
      <div className={s.panelContent}>
        <CompanyFilter
          router={router}
          query={query}
          pagination={pagination}
          category={category}
          onlyTrader
        />

        <OfferCardSection
          // @ts-ignore
          products={products}
          category={category}
          query={query}
          params={{
            name,
            producer_id__in: producer.id.toString(),
            origin: origin?.id.toString(),
          }}
          isLoading={isLoading}
          hasMoreOffers={!isLoading && pagination.offset < pagination.count - 1}
          handlePagination={handleShowMore}
        />
      </div>
    </div>
  )
}
