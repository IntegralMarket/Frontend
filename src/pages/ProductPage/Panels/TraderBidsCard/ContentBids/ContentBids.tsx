import { Button, Modal } from 'components'
import { SendOfferModal, SendOfferModalProps } from 'features/SendOfferModal'

import s from '../../TraderOffersCard/TraderOffersCard.module.scss'

interface ContentOffersProps {
  form: SendOfferModalProps
  price: string
  deadline: string
  isOpen: { isOpen: boolean; modal: string }
  onClose: () => void
  onOpen: (modal: string) => void
}

const ContentBids = ({
  form,
  price,
  deadline,
  isOpen,
  onClose,
  onOpen,
}: ContentOffersProps) => {
  // TODO code below
  const preparedForm: SendOfferModalProps = {
    buyers: form.buyers,
    category: form.category,
    bid: form.bid
  }
  return (
    <>
      <div className={s.wrapperPrice}>
        Target Price:{' '}
        <span className={s.price}>{price && price !== '0' ? `${price}$` : '-'}</span>
      </div>
      <div className={s.wrapperDeadline}>
        Deadline to offer <span className={s.deadline}>{deadline}</span>
      </div>
      <Button className={s.button} onClick={() => onOpen('send offer')}>
        SEND OFFER
      </Button>

      <Modal
        isOpen={isOpen.isOpen && isOpen.modal === 'send offer'}
        onClose={onClose}
        closeButton
      >
        <SendOfferModal {...form} />
      </Modal>
    </>
  )
}

export default ContentBids
