import { FC, useState } from 'react'

import { CompanyInfo, OfferMapModal, RequestProductForm } from 'features'
import { PriceItem } from './OfferCardHeader'
import { Modal } from 'components/Modal'

import { capitalize } from 'shared/helpers/capitalize'
import { ProductCardProps } from '../OfferCard'

import s from '../OfferCard.module.scss'
import { getGradeOffers } from 'shared/api/routes/products'
import { Offer } from 'shared/types/offer'
import { getQuantity } from 'shared/helpers/transform'
import { useSelector } from 'react-redux'
import { getSelectedOffer } from 'store/selectors/selectedOffer'
import { useGetCategory } from '../../../../shared/hooks'
import { Trade } from 'shared/types'

type ListItemType = {
  label: string
  param?: string | string[] | number | number[] | null
}

export const ListItem: FC<ListItemType> = ({ label, param }) =>
  param ? (
    <li className={s.paramsItem}>
      {capitalize(label)}:{' '}
      <span className={s.paramsValue}>
        {Array.isArray(param) ? param.join(', ') : param}
      </span>
    </li>
  ) : null

export const OfferCardBody: FC<ProductCardProps> = ({ role, ...offer }) => {
  const [isPriceModalOpen, setIsPriceModalOpen] = useState<boolean>(false)
  const [category] = useGetCategory()

  const { selectedOffer } = useSelector(getSelectedOffer)

  const [isOpenAskQuoteModal, setIsOpenAskQuoteModal] = useState<boolean>(false)
  const handleAskQuoteModal = () => {
    setIsOpenAskQuoteModal(prev => !prev)
  }
  const [isOpenSendOfferModal, setIsOpenSendOfferModal] =
    useState<boolean>(false)
  const handleSendOfferModal = () => {
    setIsOpenSendOfferModal(prev => !prev)
  }

  const handleOtherPrices = async () => {
    setIsPriceModalOpen(true)
  }
  return (
    <>
      <div className={s.container}>
        <ul onClick={() => handleOtherPrices()} className={s.paramsList}>
          <PriceItem
            price={offer.price}
            country={offer.place_of_delivery}
            incoterm={offer.incoterms}
          />
          <ListItem
            label='Place of shipment'
            param={
              offer.place_of_shipment.length
                ? offer.place_of_shipment.join(',')
                : '-'
            }
          />
          <ListItem label='Place of delivery' param={offer.place_of_delivery} />
          <ListItem
            label='Quantity(MT)'
            param={getQuantity(offer.quantity_min, offer.quantity_max) || '-'}
          />
          <ListItem
            label='Lead time'
            param={`${offer.lead_time} ${
              offer.lead_time === '1' ? 'week' : 'weeks'
            }`}
          />
          <ListItem label='Payment terms' param={offer.payment_terms} />
          <ListItem label='Packing' param={offer.packing} />
          <ListItem label='Date of offer' param={offer.date_of_offer} />
          <ListItem label='Offer validity' param={offer.offer_validity} />
        </ul>

        {role ? null : (
          <CompanyInfo
            size={'small'}
            {...offer.trader}
            link={`/traders/${offer.trader.id}`}
          />
        )}
      </div>
      <Modal
        isOpen={isPriceModalOpen}
        onClose={() => setIsPriceModalOpen(false)}
        contentClassName={s.mapModal}
        closeButton={false}
      >
        <OfferMapModal
          gradeId={offer.grade_id}
          name={offer.mark}
          type={Trade.OFFER}
          isOpen={isPriceModalOpen}
          onClose={() => setIsPriceModalOpen(false)}
          onClickAskQuote={handleAskQuoteModal} // TODO use modals inside component
          onClickSendOffer={handleSendOfferModal}
        />
      </Modal>

      <Modal
        isOpen={isOpenAskQuoteModal}
        onClose={handleAskQuoteModal}
        closeButton
        contentClassName={s.requestProductFormCross}
      >
        <RequestProductForm
          onClose={handleAskQuoteModal}
          category={category}
          // @ts-ignore
          offer={selectedOffer}
        />
      </Modal>
    </>
  )
}
