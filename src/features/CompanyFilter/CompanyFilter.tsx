import { FC, useState, useEffect } from 'react'
import { NextRouter } from 'next/router'
import cn from 'classnames'

import { Tag } from 'components'

import { prepareQuery } from 'shared/helpers/parseQuery'
import { ProductFilterParams } from 'shared/types/products'
import { PaginationType } from 'shared/types'
import { CategoryDetail } from 'shared/types/categories'

import s from './CompanyFilter.module.scss'
import { FilterCompany } from 'shared/types/company'

interface CompanyFilterProps {
  router: NextRouter
  query: Partial<ProductFilterParams>
  pagination: PaginationType
  category: CategoryDetail | null
  sellers?: FilterCompany[]
  producers?: FilterCompany[]
  onlyTrader?: boolean
}

export const CompanyFilter: FC<CompanyFilterProps> = ({
  router,
  query,
  pagination,
  category, // TODO remove
  sellers = [],
  producers = [],
  onlyTrader,
}) => {
  const [isVisible, setIsVisible] = useState<'trader' | 'producer' | null>(null)
  const handleVisibleTrader = () => {
    setIsVisible(prev => (prev !== 'trader' ? 'trader' : null))
  }
  const handleVisibleProducer = () => {
    setIsVisible(prev => (prev !== 'producer' ? 'producer' : null))
  }

  // TRADER
  const [traderFilter, setTraderFilter] = useState<number[]>([])
  const [isTraderToggled, setIsTraderToggled] = useState<boolean>(false)
  const handleTrader = (id: number) => {
    if (traderFilter.includes(id)) {
      setTraderFilter(prev => prev.filter(item => item !== id))
    } else {
      setTraderFilter(prev => [...prev, id])
    }
    setIsTraderToggled(true)
  }

  useEffect(() => {
    if (!isTraderToggled) {
      setTraderFilter(
        query.trader_id__in?.split(', ').map(id => Number(id)) || []
      )
      return
    }

    router.replace(
      prepareQuery(router.asPath, query, {
        ...query,
        trader_id__in: traderFilter.length
          ? traderFilter.join(', ')
          : undefined,
      }),
      undefined,
      { shallow: true }
    )
    setIsTraderToggled(false)
  }, [isTraderToggled, query.trader_id__in])

  // PRODUCER
  const [producerFilter, setProducerFilter] = useState<number[]>([])
  const [isProducerToggled, setIsProducerToggled] = useState<boolean>(false)
  const handleProducer = (id: number) => {
    if (producerFilter.includes(id)) {
      setProducerFilter(prev => prev.filter(item => item !== id))
    } else {
      setProducerFilter(prev => [...prev, id])
    }
    setIsProducerToggled(true)
  }

  useEffect(() => {
    if (!isProducerToggled) {
      setProducerFilter(
        query.producer_id__in?.split(', ').map(id => Number(id)) || []
      )
      return
    }

    router.replace(
      prepareQuery(router.asPath, query, {
        ...query,
        producer_id__in: producerFilter.length
          ? producerFilter.join(', ')
          : undefined,
      }),
      undefined,
      { shallow: true }
    )
    setIsProducerToggled(false)
  }, [isProducerToggled, query.producer_id__in])

  return (
    <div className={s.companyFilter}>
      {!Boolean(pagination.count) && <p className={s.filterHeader}>No offers found by these parameters</p>}
      {Boolean(pagination.count) && <p className={s.filterHeader}>
        Found {pagination.count} {pagination.count === 1 ? 'offer' : 'offers'}{' '}
        from{' '}
        <span
          className={cn(s.filterLink, { [s.active]: isVisible === 'trader' })}
          onClick={handleVisibleTrader}
        >
          {sellers?.length || 0} {sellers?.length === 1 ? 'seller' : 'sellers'}
        </span>
        {!onlyTrader && (
          <>
            {' & '}
            <span
              className={cn(s.filterLink, {
                [s.active]: isVisible === 'producer',
              })}
              onClick={handleVisibleProducer}
            >
              {producers?.length || 0} producers
            </span>
          </>
        )}
      </p>}

      {
        isVisible && (
          <div className={s.tagContainer}>
            {isVisible === 'trader' &&
              sellers?.map((item, index) => (
                <Tag
                  key={index}
                  onClick={handleTrader}
                  text={item.name}
                  image={item.logo}
                  value={item.id}
                  isActive={traderFilter.includes(item.id)}
                />
              ))}
            {!onlyTrader &&
              isVisible === 'producer' &&
              producers?.map((item, index) => (
                <Tag
                  key={index}
                  onClick={handleProducer}
                  text={item.name}
                  value={item.id}
                  isActive={producerFilter.includes(item.id)}
                  image={item.logo}
                />
              ))}
          </div>
        )
      }
    </div >
  )
}
