import React, { useEffect, useState } from 'react'
import cn from 'classnames'

import { Button } from 'components'
import type { NextPage } from 'next'
import { ContactModal } from 'features/ContactModal'
import { GeotagPrice } from 'features'
import {
  useGetCategory,
  useGetProducts,
  useCrumbs,
  usePagination,
  useAppSelector,
} from 'shared/hooks'
import { useRouter } from 'next/router'
import { parseProductQuery } from 'shared/helpers/parseQuery'
import { offer } from 'shared/mocks/offer'

import { bid_mocks } from 'shared/mocks/bid'

import styles from 'styles/Home.module.css'

export async function getStaticProps() {
  return {
    // returns the default 404 page in production
    notFound: process.env.NODE_ENV === 'production',
    props: {},
  }
}

const Example: NextPage = () => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const router = useRouter()
  const query = parseProductQuery(router.query)
  const [category] = useGetCategory()
  const compareProductIds = useAppSelector(
    state => state.compare.comparedProducts
  )
  const handleShowMore = () => handleReady()

  const [pagination, updatePaginationCount, resetPaginationOffset] =
    usePagination()

  // make request then query changed
  useEffect(() => handleReady(true), [router.query])

  // update crumbs
  useCrumbs(query, category)

  // get products from server
  const [products, isLoading, handleReady] = useGetProducts(
    query,
    pagination,
    updatePaginationCount,
    resetPaginationOffset
  )

  const onClose = () => setIsOpenModal(prev => !prev)

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Integral</h1>
        <Button onClick={onClose}>Открыть Contact модалку</Button>
        <ContactModal isOpen={isOpenModal} onClose={onClose} />
        <div style={{ height: 300 }}>
          <div style={{ padding: 30 }}>Button</div>
          <Button>Hello</Button>
        </div>

        <GeotagPrice
          offer={offer}
          onClick={() => console.log(' hello ')}
          // @ts-ignore
          proposal={''}
        />
      </main>
    </div>
  )
}

export default Example
