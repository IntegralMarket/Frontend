import { FC, ReactNode } from 'react'

import { Breadcrumbs, Header, Footer, FooterVariant, Modal } from 'components'
import { useAppDispatch, useAppSelector, useGetCategory } from 'shared/hooks'
import { closeContactModal } from 'store/slices/contactModal'

import { ContactModal, RequestProductForm, SendOfferModal } from 'features'

import cn from 'classnames'

import s from './CommonLayout.module.scss'
import {
  closeSendOfferModal,
  resetSelectedBid,
  setSelectedBid,
} from 'store/slices/sendOffer'
import {
  closeAskQuoteModal,
  resetSelectedBidAskQuote,
  setSelectedBidAskQuote,
} from 'store/slices/askForQuote'
import { Bid } from 'shared/types/bid'

interface CommonLayoutProps {
  children: ReactNode
  withBreadCrumbs?: boolean
  withSearch?: boolean
  variant?: FooterVariant
  bright?: boolean
}

export const CommonLayout: FC<CommonLayoutProps> = ({
  children,
  variant = 'primary',
  withBreadCrumbs = false,
  withSearch = false,
  bright = false,
}) => {
  const layoutClass = cn(s.wrapper, { [s.bright]: bright })

  const dispatch = useAppDispatch()
  const isOpen = useAppSelector(state => state.contactModal.isOpen)
  const { isModalOpen: isSendOfferOpen, selectedBid } = useAppSelector(
    state => state.sendOffer
  )
  const { isModalOpen: isAskQuoteOpen, selectedBid: selectedBidAskQuote } =
    useAppSelector(state => state.askQuote)
  const closeSendOffer = () => {
    dispatch(resetSelectedBid())
    dispatch(closeSendOfferModal())
  }
  const closeAskQuote = () => {
    dispatch(resetSelectedBidAskQuote())
    dispatch(closeAskQuoteModal())
  }
  const [category] = useGetCategory()

  const onClose = () => dispatch(closeContactModal())

  return (
    <div className={layoutClass}>
      <Header />
      <main className={s.container}>
        <div className={s.content}>
          {withBreadCrumbs && <Breadcrumbs withSearch={withSearch} />}
          {children}
        </div>
      </main>

      <Footer variant={variant} />
      <Modal
        isOpen={isAskQuoteOpen}
        onClose={closeAskQuote}
        closeButton
        contentClassName={s.requestProductFormCross}
      >
        <RequestProductForm offer={selectedBidAskQuote} category={category} />
      </Modal>
      <Modal
        isOpen={isSendOfferOpen}
        onClose={closeSendOffer}
        closeButton
        contentClassName={s.requestProductFormCross}
      >
        <SendOfferModal category={category} bid={selectedBid} />
      </Modal>
      <Modal
        contentClassName={s.contactModal}
        isOpen={isOpen}
        onClose={onClose}
        closeButton
      >
        <ContactModal isOpen={isOpen} onClose={onClose} />
      </Modal>
    </div>
  )
}
