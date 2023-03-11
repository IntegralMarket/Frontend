import { FC, useState } from 'react'

import { Icon, Modal } from 'components'
import {
  OfferMapModal,
  RequestProductFormProps,
  RequestSampleModalProps,
} from 'features'

import ContentOffers from './ContentOffers/ContentOffers'

import { GradeDetail } from 'shared/types/products'
import { Offer } from 'shared/types/offer'

import s from './TraderOffersCard.module.scss'
import { Trade } from 'shared/types'

interface TraderOffersCardProps {
  title: string
  location: string
  deadline: string
  price: string
  isShowIcon: boolean
  showIcon: () => void
  data: {
    offer: Offer
    product: GradeDetail
    sample: RequestSampleModalProps
    buy: RequestProductFormProps
  }
}

export const TraderOffersCard: FC<TraderOffersCardProps> = ({
  price,
  deadline,
  title,
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
          {title}
          <button className={s.iconButton} onClick={() => onOpen('map')}>
            <Icon variant='map' />
          </button>
        </div>
        <div className={s.content}>
          <ContentOffers
            isShowIcon={isShowIcon}
            showIcon={showIcon}
            form={data}
            price={price}
            deadline={deadline}
            isOpen={isOpenModal}
            onClose={onClose}
            onOpen={onOpen}
          />
        </div>
      </div>

      <Modal
        onClose={onClose}
        isOpen={isOpenModal.isOpen && isOpenModal.modal === 'map'} // TODO 
        contentClassName={s.mapModal}
        closeButton={false}
      >
        <OfferMapModal
          isOpen={isOpenModal.isOpen && isOpenModal.modal === 'map'}
          gradeId={data.offer.grade_id}
          name={data.offer.mark}
          type={Trade.OFFER}
          onClose={onClose}
        />
      </Modal>
    </>
  )
}
