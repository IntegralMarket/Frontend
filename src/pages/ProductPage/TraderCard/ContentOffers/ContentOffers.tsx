import { useState } from 'react'
import cn from 'classnames'

import Image from 'next/image'
import Woman from '/public/assets/img/woman.svg'

import { Button, Modal } from 'components'

import RequestSampleModal, {
  RequestSampleModalProps,
} from 'features/RequestSampleModal/RequestSampleModal'
import { RequestDocumentModal } from 'features/RequestDocumentModal'
import { ProductDetail } from 'shared/types/products'
import { formatDate } from 'shared/helpers/parseDate'

import { RequestProductForm } from 'features'
import { withDomain } from 'shared/helpers/convertLink'

import s from '../TraderCard.module.scss'

interface ContentOffersProps {
  form: {
    product: ProductDetail
    sample: RequestSampleModalProps
    buy: ProductDetail
  }
  price: string
  deadline: string
  isOpen: { isOpen: boolean; modal: string }
  onClose: () => void
  onOpen: (modal: string) => void
  isShowIcon: boolean
  showIcon: () => void
}

const ContentOffers = ({
  form,
  price,
  deadline,
  isOpen,
  onClose,
  onOpen,
  isShowIcon,
  showIcon,
}: ContentOffersProps) => {
  return (
    <>
      {isShowIcon ? (
        <div className={s.wrapperIcon}>
          <div className={s.wrapperImage}>
            <Image
              className={s.image}
              width='100%'
              height='100%'
              // @ts-ignore
              src={withDomain(form.product.grade.author.logo)}
              alt=''
            />
          </div>
          <div className={s.info}>
            <p>Sales manager</p>
            {/* @ts-ignore */}
            <p>{form.product.grade.author.name}</p>
          </div>
        </div>
      ) : (
        <div className={s.priceText}>
          <p className={s.price} onClick={showIcon}>
            {price}
          </p>
          <p className={s.validity}>
            Offer validity: {formatDate(new Date(deadline))}
          </p>
        </div>
      )}

      <Button className={s.button} onClick={() => onOpen('buy')}>
        {isShowIcon ? 'ASK FOR QUOTE' : 'BUY'}
      </Button>
      <Button
        variant='outline'
        className={cn(s.button, s.outline)}
        onClick={() => onOpen('sample')}
      >
        Ask for Sample
      </Button>
      <Button
        variant='outline'
        className={cn(s.button, s.outline)}
        onClick={() => onOpen('document')}
      >
        Ask for Document
      </Button>

      <Modal
        onClose={onClose}
        isOpen={isOpen.isOpen && isOpen.modal === 'buy'}
        contentClassName={s.requestProductFormCross}
      >
        <RequestProductForm {...form.buy} onClose={onClose} />
      </Modal>
      <Modal
        onClose={onClose}
        isOpen={isOpen.isOpen && isOpen.modal === 'sample'}
      >
        <RequestSampleModal {...form.sample} />
      </Modal>
      <Modal
        onClose={onClose}
        isOpen={isOpen.isOpen && isOpen.modal === 'document'}
        contentClassName={s.requestDocumentModalCross}
      >
        <RequestDocumentModal
          // @ts-ignore
          product={form.product}
        />
      </Modal>
    </>
  )
}

export default ContentOffers
