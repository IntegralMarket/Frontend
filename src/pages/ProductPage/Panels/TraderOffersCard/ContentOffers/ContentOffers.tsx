import Image from 'next/image'
import { Button, Modal } from 'components'
import cn from 'classnames'

import RequestSampleModal, {
  RequestSampleModalProps,
} from 'features/RequestSampleModal/RequestSampleModal'
import { RequestDocumentModal } from 'features/RequestDocumentModal'
import { GradeDetail } from 'shared/types/products'
import { withDomain } from 'shared/helpers/convertLink'

import { RequestProductForm, RequestProductFormProps } from 'features'

import s from '../TraderOffersCard.module.scss'

interface ContentOffersProps {
  form: {
    product: GradeDetail
    sample: RequestSampleModalProps
    buy: RequestProductFormProps
  }
  price: string
  deadline: string
  isOpen: { isOpen: boolean; modal: string }
  onClose: () => void
  onOpen: (modal: string) => void
  isShowIcon: boolean
  showIcon: () => void // TODO obsolete?
}

const ContentOffers = ({
  form,
  price,
  deadline,
  isOpen,
  onClose,
  onOpen,
  isShowIcon,
}: ContentOffersProps) => {
  console.log('form :', form);

  return (
    <>
      {isShowIcon ? (
        <div className={s.wrapperIcon}>
          <div className={s.wrapperImage}>
            <Image
              className={s.image}
              width='100%'
              height='100%'
              src={withDomain(form.buy.trader?.logo)}
              alt=''
            />
          </div>
          <div className={s.info}>
            <p>Sales manager</p>
            <p>{form.buy.trader?.name}</p>
          </div>
        </div>
      ) : (
        <div className={s.priceText}>
          <p className={s.price}>{price ? `$${price}` : '-'}</p>
          <p className={s.validity}>Offer validity: {deadline}</p>
        </div>
      )}

      <Button
        className={cn(s.button, s.btn249x37)}
        onClick={() => onOpen('buy')}
      >
        {isShowIcon ? 'ASK FOR QUOTE' : 'BUY'}
      </Button>
      <Button
        variant='outline'
        className={cn(s.button, s.outline, s.btn249x37)}
        onClick={() => onOpen('sample')}
      >
        Ask for Sample
      </Button>
      <Button
        variant='outline'
        className={cn(s.button, s.outline, s.btn249x37)}
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
        <RequestDocumentModal product={form.product} />
      </Modal>
    </>
  )
}

export default ContentOffers
