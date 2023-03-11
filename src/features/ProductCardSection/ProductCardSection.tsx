import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { FilterProductsModal, RequestProductForm, ThankModal } from 'features'
import {
  CountBadge,
  Button,
  Dropdown,
  IconButton,
  Modal,
  RadioGroup,
  Title,
  ToggleSwitch,
} from 'components'
import { ProductCard } from './ProductCard'
import { ProductTable } from './ProductTable'

import { prepareQuery } from 'shared/helpers/parseQuery'
import { sortOptions } from 'shared/mocks/radiogroup'
import { splitByPrice } from './utils'

import { Product, ProductFilterParams } from 'shared/types/products'
import { CategoryDetail } from 'shared/types/categories'
import { Trade, Roles, SortOptions, View } from 'shared/types'

import s from './ProductCardSection.module.scss'

interface ProductCardSectionProps {
  products: Product[]
  category?: CategoryDetail | null
  query: Partial<ProductFilterParams>
  params?: Partial<ProductFilterParams>
  role?: Roles
  market?: string
  isLoading?: boolean
  compare?: number[]
}

export const ProductCardSection: FC<ProductCardSectionProps> = ({
  products,
  category,
  query,
  params,
  role,
  market,
  isLoading = false,
  compare = [],
}) => {
  const router = useRouter()

  const [isOpenQuoteModal, setIsOpenQuoteModal] = useState<boolean>(false)
  const [isOpenThankModal, setIsOpenThankModal] = useState<boolean>(false)

  const handleQuoteModal = () => setIsOpenQuoteModal(prev => !prev)
  const handleThankModal = () => setIsOpenThankModal(prev => !prev)

  const handleIsQuoteSent = () => {
    handleThankModal()
  }

  const [viewType, setViewType] = useState<View>(View.grid)

  const [isValid, setIsValid] = useState<boolean>(false)

  const [isToggled, setIsToggled] = useState<boolean>(false)

  // const handleValidToggled = (checked: boolean) => {
  //   setIsValid(checked)
  // }

  useEffect(() => {
    router.replace(
      prepareQuery(
        router.asPath,
        query,
        {
          valid_prices_only: isValid ? 'true' : undefined,
        },
        true
      ),
      undefined,
      { shallow: true }
    )
  }, [isValid, query.valid_prices_only])

  const handleSort = (value: string) => {
    router.replace(
      prepareQuery(router.asPath, query, {
        ordering: value as SortOptions,
      }),
      undefined,
      { shallow: true }
    )
  }
  const isOffer = () => router.asPath.includes(Trade.OFFER)

  const quoteBtn = () => (
    <Button className={s.rightButton} onClick={handleQuoteModal}>
      ASK FOR QUOTE
    </Button>
  )
  const offerBtn = () => <Button className={s.rightButton}>SEND OFFER</Button>
  // TODO delete this component

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
            {/* <span>Valid prices only</span>
            <ToggleSwitch value={isValid} onChange={handleValidToggled} /> */}
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
            {/* <IconButton // disabled by the request of customer
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
                // TODO connect map in the next iteration
                // setViewType(View.map)
                setViewType(View.grid)
              }}
              tooltip='Show as map'
              disabled={true}
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
          <div className={s.rightButton}>
            {isOffer() ? quoteBtn() : offerBtn()}
          </div>
          <Modal
            isOpen={isOpenQuoteModal}
            onClose={handleQuoteModal}
            closeButton
            contentClassName={s.requestProductFormCross}
          >
            <RequestProductForm
              // @ts-ignore
              category={category}
              onClose={handleQuoteModal}
              onCallbackSubmit={handleIsQuoteSent}
            />
          </Modal>
          <Modal
            isOpen={isOpenThankModal}
            onClose={handleThankModal}
            closeButton
          >
            <ThankModal onClose={handleThankModal} />
          </Modal>
        </div>
      )}

      {products.length ? (
        <>
          {viewType === View.grid && (
            <div className={s.cardGrid}>
              {products.map((card, index) => (
                <ProductCard key={index} {...card} role={role} />
              ))}
            </div>
          )}
          {viewType === View.list && (
            <ProductTable
              data={splitByPrice(products, query?.ordering !== '-price')}
            />
          )}
          {/* TODO connect map in the next iteration */}
          {/* {viewType === View.map && <div>Map</div>} */}
          {viewType === View.compare && (
            <div className={s.cardGrid}>
              {products
                .filter(({ id }) => compare.includes(id))
                .map((card, index) => (
                  <ProductCard key={index} {...card} role={role} />
                ))}
            </div>
          )}
        </>
      ) : (
        <div className={s.plugText}>
          Nothing to show. Try to change filter parameters
        </div>
      )}

      {isLoading && <div className={s.plugText}>Loading...</div>}
    </>
  )
}
