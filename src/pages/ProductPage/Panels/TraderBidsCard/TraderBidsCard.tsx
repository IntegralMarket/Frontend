import { FC, useState } from 'react'

import { Icon, Modal } from 'components'
import { OfferMapModal } from 'features'

import ContentBids from './ContentBids/ContentBids'

import { SendOfferModalProps } from 'features/SendOfferModal'
import { Bid } from 'shared/types/bid'

import s from '../TraderOffersCard/TraderOffersCard.module.scss'
import { Trade } from 'shared/types'

interface TraderBidsCardProps {
  title: string
  bid: Bid
  data: SendOfferModalProps
}

export const TraderBidsCard: FC<TraderBidsCardProps> = ({
  title,
  data,
  bid,
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
          <ContentBids
            form={data}
            price={bid.price}
            deadline={bid.deadline_of_rfp}
            isOpen={isOpenModal}
            onClose={onClose}
            onOpen={onOpen}
          />
        </div>
      </div>

      <Modal
        onClose={onClose}
        isOpen={isOpenModal.isOpen && isOpenModal.modal === 'map'}
        contentClassName={s.mapModal}
        closeButton={false}
      >
        <OfferMapModal
          isOpen={isOpenModal.isOpen && isOpenModal.modal === 'map'}
          gradeId={bid.grade_id}
          name={bid.mark}
          type={Trade.BID}
          onClose={onClose}
        />
      </Modal>
    </>
  )
}
