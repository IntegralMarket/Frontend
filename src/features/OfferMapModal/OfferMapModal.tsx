import { FC, useEffect, useState } from 'react'
import { Icon, Title } from '../../components'

import s from './OfferMapModal.module.scss'
import { Offer } from 'shared/types/offer'
import { Bid } from 'shared/types/bid'
import { TradeMap } from 'features/TradeMap'
import { Trade } from 'shared/types'
import { getGradeBids, getGradeOffers } from 'shared/api/routes/products'
import { capitalize } from 'shared/helpers/capitalize'

interface OfferMapModalProps {
  isOpen: boolean
  onClose: () => void
  onClickAskQuote?: (offer?: Partial<Offer>) => void
  onClickSendOffer?: (bid?: Partial<Bid>) => void
  type: Trade
  gradeId: number
  name: string
}

export const OfferMapModal: FC<OfferMapModalProps> = ({ // TODO rename to PriceMapModal
  isOpen,
  onClose,
  onClickAskQuote,
  onClickSendOffer,
  type = Trade.OFFER,
  gradeId,
  name
}) => {
  const isBid = type === Trade.BID
  const [otherOffers, setOtherOffers] = useState<Offer[]>([])
  const [otherBids, setOtherBids] = useState<Bid[]>([])

  const getProposals = async (gradeId: number) => {
    try {
      const request = isBid ? getGradeBids : getGradeOffers
      const { data } = await request(gradeId)
      const proposals = data.results

      isBid ? setOtherBids(proposals as Bid[]) : setOtherOffers(proposals as Offer[])
    } catch (error) {
      console.log('error :', error)
    }
  }
  useEffect(() => {
    if (isOpen) {
      getProposals(gradeId)
    }
  }, [gradeId, isOpen])


  return (
    <div>
      <div className={s.flex}>
        <Title className={s.title} size={20}>
          {`${capitalize(type)} for Grade ${name} in different destinations`}
        </Title>
        <div className={s.icon} onClick={onClose}>
          <Icon variant='cross' size={15} />
        </div>
      </div>
      <div className={s.wrapper}>
        <TradeMap
          offers={otherOffers}
          bids={otherBids}
          type={type}
          modal
          onClickAskQuote={onClickAskQuote}
          onClickSendOffer={onClickSendOffer}
        />
      </div>
    </div>
  )
}
