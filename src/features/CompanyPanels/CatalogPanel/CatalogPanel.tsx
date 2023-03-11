import { FC, ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { FilterProductsModal, OfferCardSection } from 'features'
import { Roles, SortOptions, View } from 'shared/types'
import {
  useCrumbs,
  useGetCategory,
  usePagination,
  useGetProducts,
} from 'shared/hooks'
import { parseProductQuery, prepareQuery } from 'shared/helpers/parseQuery'

import s from './CatalogPanel.module.scss'
import Link from 'next/link'
import { ListItem } from '../../OfferCardSection/OfferCard/components'
import {
  Button,
  Card,
  CountBadge,
  Dropdown,
  IconButton,
  RadioGroup,
  Title,
  ToggleSwitch,
} from '../../../components'
import { sortOptions } from '../../../shared/mocks/radiogroup'
import { CatalogItem } from 'shared/types/products'
import { useGetCatalog } from 'shared/hooks/useGetCatalog'
import { renderHTML } from 'shared/helpers'

interface OffersPanelProps {
  id: number
  role: Roles
  market?: string
  catalogItems?: CatalogItem[] // RENAME TODO
  params?: unknown
}

export const CatalogPanel: FC<OffersPanelProps> = ({
  id,
  role,
  market,
  catalogItems,
  params,
}) => {
  const [viewType, setViewType] = useState<View>(View.grid)

  const [showBids, setShowBids] = useState<boolean>(false)
  const router = useRouter()
  const query = parseProductQuery(router.query)
  const [category] = useGetCategory()
  const { catalog, isLoading, handleReady, hasMore, reset } = useGetCatalog(
    id,
    query,
    {},
    role
  )
  const handleSort = (value: string) => {
    router.replace(
      prepareQuery(router.asPath, query, {
        ordering: value as SortOptions,
      }),
      undefined,
      { shallow: true }
    )
  }
  useEffect(() => handleReady(true), [router.query])

  // update crumbs
  useCrumbs(query, category)

  return (
    <div className={s.container}>
      {role === Roles.PRODUCER && (
        <div className={s.producerBlock}>
          <div>
            <Title As='h5' className={s.faqCaption}>
              How to buy:
            </Title>
            {market === 'http://www.uzex.uz' ? (
              <ul className={s.faqList}>
                <li className={s.faqListItem}>
                  Directly from the Producer through Commodities Exchange JSC
                  &quot;CERU&quot; -
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
                  See the offers from the traders for each grade
                </li>
              </ul>
            ) : (
              renderHTML(market ?? '')
            )}
          </div>
        </div>
      )}
      <div className={s.filterBlock}>
        <div className={s.toggle}>
          {viewType === View.map && (
            <>
              <span>Show bids</span>
              <ToggleSwitch
                value={showBids}
                onChange={setShowBids}
                className={s.switch}
              />
            </>
          )}
        </div>

        <div className={s.navigation}>
          <FilterProductsModal
            category={category}
            query={query}
            // @ts-ignore
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
        </div>
      </div>
      <div className={s.cardGrid}>
        {catalog?.length ? (
          <>
            {catalog.map((el, idx) => {
              // TODO create separate card component CatalogCard
              return (
                <Card
                  name={el.mark}
                  key={idx}
                  link={`/${
                    role === Roles.PRODUCER ? 'producers' : 'traders'
                  }/${id}/commodities/${el.id}/`}
                  id={id}
                  className={s.cardContainer}
                >
                  <ListItem label='Type' param={el.product_type.name} />
                  <ListItem
                    label='Processing method'
                    param={el.processing_method}
                  />

                  <ListItem
                    label={`MFR (${el.mfr.weight})`}
                    param={`${el.mfr.value}`}
                  />
                  <ListItem label='Density' param={el.density} />
                  <ListItem label='Applications' param={el.applications} />
                  {role === Roles.PRODUCER && (
                    <div className={s.seeAllOffers}>
                      <Link href={`/polymers/offers?name=${el.mark}`}>
                        See all offers
                      </Link>{' '}
                      {/*wait API todo  */}
                    </div>
                  )}
                  {role !== Roles.PRODUCER && (el.bids || el.offers) ? (
                    <div className={s.seeBids}>
                      See
                      {el.offers && (
                        <Link href={`/traders/${id}/offers?name=${el.mark}`}>
                          <a>
                            <span> offers </span>
                          </a>
                        </Link>
                      )}
                      {el.bids && el.offers && 'and'}
                      {el.bids && (
                        <Link href={`/traders/${id}/bids?name=${el.mark}`}>
                          <a>
                            <span> bids</span>
                          </a>
                        </Link>
                      )}
                    </div>
                  ) : null}
                </Card>
              )
            })}
          </>
        ) : (
          <span>No available products</span>
        )}
      </div>
      {!isLoading && hasMore && (
        <Button
          onClick={() => handleReady()}
          variant='outline'
          className={s.showMoreButton}
        >
          Show&nbsp;more...
        </Button>
      )}
    </div>
  )
}
