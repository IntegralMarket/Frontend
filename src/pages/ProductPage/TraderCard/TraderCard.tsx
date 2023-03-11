// @ts-nocheck
import { FC, useState } from 'react'

import { Icon, IconButton, Modal } from 'components'
import { OfferMapModal, RequestSampleModalProps } from 'features'

import ContentOffers from './ContentOffers/ContentOffers'
import ContentBids from './ContentBids/ContentBids'

import { ProductDetail } from 'shared/types/products'
import { SendOfferModalProps } from 'features/SendOfferModal'
import { BidDetail } from 'shared/types/bid'

import s from './TraderCard.module.scss'

interface CardProps {
  name: string
  location: string
  tender: 'offer' | 'bid'
  deadline: string
  price: string
  isShowIcon: boolean
  showIcon: () => void
  data:
  | {
    product: ProductDetail
    sample: RequestSampleModalProps
    buy: ProductDetail
  }
  | (SendOfferModalProps & BidDetail)
}

export const TraderCard: FC<CardProps> = ({
  price,
  tender,
  deadline,
  name,
  showIcon,
  isShowIcon,
  data,
}) => {
  const [isOpenModal, setIsModal] = useState({ isOpen: false, modal: '' })

  const onClose = () => setIsModal({ isOpen: false, modal: '' })
  const onOpen = (modal: string) => setIsModal({ modal, isOpen: true })

  return (
    <>
      <div className={s.wrapper}>
        <div className={s.header}>
          {name}
          <button className={s.iconButton} onClick={() => onOpen('map')}>
            <Icon variant='map' />
          </button>
        </div>
        <div className={s.content}>
          {tender === 'bid' ? (
            <ContentBids
              form={data as SendOfferModalProps}
              price={price}
              deadline={deadline}
              isOpen={isOpenModal}
              onClose={onClose}
              onOpen={onOpen}
            />
          ) : (
            <ContentOffers
              isShowIcon={isShowIcon}
              showIcon={showIcon}
              form={{
                product: {
                  ...data.product,
                  trader: data.product?.trader,
                },
                sample: data.sample,
                buy: data.buy,
              }}
              price={price}
              deadline={deadline}
              isOpen={isOpenModal}
              onClose={onClose}
              onOpen={onOpen}
            />
          )}
        </div>
      </div>

      <Modal
        onClose={onClose}
        isOpen={isOpenModal.isOpen && isOpenModal.modal === 'map'}
        closeButton={false}
      >
        {data.hasOwnProperty('product') ? (
          <OfferMapModal
            name={name}
            onClose={onClose}
            offers={[{ ...data.product }]}
            bids={[{ ...data.product }]}
          />
        ) : (
          <OfferMapModal
            name={name}
            onClose={onClose}
            offers={[{ ...data }]}
            bids={[{ ...data }]}
          />
        )}
      </Modal>
    </>
  )
}
