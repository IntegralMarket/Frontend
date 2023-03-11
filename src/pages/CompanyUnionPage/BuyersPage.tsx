import { FC, useEffect, useState } from 'react'
import {
  useAppDispatch,
  useAppSelector,
  useGetCategory,
  usePagination,
} from 'shared/hooks'

import { CompaniesList } from 'features'

import { setBuyers } from 'store/slices/buyers'
import { getBuyers } from 'shared/api/routes/buyers'

import { Roles } from 'shared/types'
import { Modal } from 'components'
import { SendOfferModal } from 'features/SendOfferModal'
import { metaToOptions } from 'shared/helpers/select'

export const BuyersPage: FC = () => {
  const dispatch = useAppDispatch()
  const buyersList = useAppSelector(state => state.buyers.buyers) // TODO No need to use slice for buyers
  const [pagination, updatePaginationCount] = usePagination()
  const [categories] = useGetCategory()
  const [isSendOfferModal, setIsSendOfferModal] = useState<boolean>(false)
  const handleSendOfferModal = () => setIsSendOfferModal(prev => !prev)

  const handleSendOfferModalOpen = (isOpen: boolean) => {
    setIsSendOfferModal(isOpen)
  }

  const loadBuyers = async () => {
    try {
      const { data } = await getBuyers({
        limit: pagination.limit,
        offset: pagination.offset,
      })
      updatePaginationCount(data.count)
      dispatch(setBuyers(data.results))
    } catch (error) {
      console.error(error)
    }
  }
  const handleShowMore = () => loadBuyers()

  useEffect(() => {
    loadBuyers()
  }, [])

  return (
    <>
      <CompaniesList
        key={0}
        companyType={Roles.BUYER}
        list={buyersList}
        filters={{
          commodities: buyersList.map(item => {
            return {
              id: item.id,
              values: Object?.values(item.commodities)
                .flat()
                .map(item => item.name),
            }
          }),
          countries: buyersList.map(item => ({
            id: item.id,
            values: item.location?.country.name,
          })),
        }}
        pagination={pagination}
        onShowMore={handleShowMore}
        onClickHandler={handleSendOfferModal}
      />
      <Modal
        isOpen={isSendOfferModal}
        onClose={handleSendOfferModal}
        closeButton
      >
        <SendOfferModal
          category={categories}
          buyers={buyersList.length}
        />
      </Modal>
    </>
  )
}
