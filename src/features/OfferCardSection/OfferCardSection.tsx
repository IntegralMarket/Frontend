import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { FilterProductsModal } from 'features'
import {
  Button,
  CountBadge,
  Dropdown,
  IconButton,
  RadioGroup,
  Title,
  ToggleSwitch,
} from 'components'
import { OfferCard } from './OfferCard'

import { prepareQuery } from 'shared/helpers/parseQuery'
import { Product, ProductFilterParams } from 'shared/types/products'
import { Offer } from 'shared/types/offer'
import { CategoryDetail } from 'shared/types/categories'
import { Roles, SortOptions, Trade, View } from 'shared/types'
import { sortOptions } from 'shared/mocks/radiogroup'
import { TradeMap } from 'features/TradeMap'

import s from './OfferCardSection.module.scss'
// TODO delete this component
interface ProductCardSectionProps {
  products: Offer[]
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
}

export const OfferCardSection: FC<ProductCardSectionProps> = ({
  products,
  category,
  query,
  params,
  role,
  market,
  isLoading = false,
  compare = [],
  handlePagination,
  hasMoreOffers = false,
}) => {
  const [viewType, setViewType] = useState<View>(View.grid)
  const router = useRouter()

  const [showBids, setShowBids] = useState<boolean>(false)
  const [isToggled, setIsToggled] = useState<boolean>(false)
  // const handleValidToggled = (checked: boolean) => {
  //   setIsValid(checked)
  //   setIsToggled(true)
  // }

  // useEffect(() => {
  //   if (!isToggled) {
  //     setIsValid(!!query.valid_prices_only)
  //     return
  //   }

  //   router.replace(
  //     prepareQuery(
  //       router.asPath,
  //       query,
  //       {
  //         valid_prices_only: isValid ? 'true' : undefined,
  //       },
  //       true
  //     ),
  //     undefined,
  //     { shallow: true }
  //   )
  //   setIsToggled(false)
  // }, [isToggled, query.valid_prices_only])

  const handleSort = (value: string) => {
    router.replace(
      prepareQuery(router.asPath, query, {
        ordering: value as SortOptions,
      }),
      undefined,
      { shallow: true }
    )
  }

  return (
    <>
      {role === Roles.PRODUCER ? (
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
                See the offers from the traders for each grade
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
            {/* <IconButton  // disabled by the request of client
              icon='menu'
              active={viewType === View.list}
              onClick={() => {
                setViewType(View.list)
              }}
              tooltip='Show as list'
            /> */}
            <IconButton
              icon='map'
              active={viewType === View.map}
              onClick={() => {
                setViewType(View.map)
              }}
              tooltip='Show as map'
            />
            {compare.length ? (
              <CountBadge count={compare.length}>
                <IconButton
                  icon='list' // use new icon
                  active={viewType === View.compare}
                  onClick={() => {
                    setViewType(View.compare)
                  }}
                  tooltip='Show compare'
                />
              </CountBadge>
            ) : null}
          </div>
        </div>
      )}
      {products.length ? (
        viewType === View.map && (
          // @ts-ignore
          <TradeMap offers={products} bids={[]} />
        )
      ) : (
        <div className={s.plugText}>
          Nothing to show. Try to change filter parameters
        </div>
      )}
      {products.length ? (
        viewType === View.grid && (
          <>
            <div className={s.cardGrid}>
              {products.map((card, index) => (
                <OfferCard key={index} {...card} role={role} />
              ))}
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
          </>
        )
      ) : (
        <div className={s.plugText}>
          Nothing to show. Try to change filter parameters
        </div>
      )}
      {viewType === View.compare && (
        <div className={s.cardGrid}>
          {products
            .filter(({ id }) => compare.includes(id))
            .map((card, index) => (
              <OfferCard key={index} {...card} role={role} />
            ))}
        </div>
      )}

      {isLoading && <div className={s.plugText}>Loading...</div>}
    </>
  )
}
