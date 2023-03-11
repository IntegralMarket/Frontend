import { FC, useEffect, useState } from 'react'

import { CompaniesList } from 'features'

import { useAppDispatch, useAppSelector, usePagination } from 'shared/hooks'
import { getProducers } from 'shared/api/routes/producers'
import { setProducersStore } from 'store/slices/producers'
import { Roles } from 'shared/types'
import { Modal } from '../../components'
import { AskForQuoteModal } from '../../features/AskForQuoteModal'

export const ProducersPage: FC = () => {
  const dispatch = useAppDispatch()
  const producersList = useAppSelector(state => state.producers.producers)
  //TODO FIX FILTERS VIA QUERY WHEN THE BACKEND IS READY

  const [pagination, updatePaginationCount] = usePagination()
  const [isSendOfferModal, setIsSendOfferModal] = useState<boolean>(false)
  const handleSendOfferModal = () => setIsSendOfferModal(prev => !prev)
  const loadProducers = async () => {
    try {
      const { data } = await getProducers({
        limit: pagination.limit,
        offset: pagination.offset,
      })
      updatePaginationCount(data.count)
      dispatch(setProducersStore(data.results))
    } catch (error) {
      console.error(error)
    }
  }

  const handleShowMore = () => loadProducers()

  useEffect(() => {
    loadProducers()
  }, [])

  return (
    <>
      <CompaniesList
        key={0}
        companyType={Roles.PRODUCER}
        list={producersList}
        filters={{
          commodities: producersList.map(item => {
            return {
              id: item.id,
              values: Object.values(item.commodities)
                .flat()
                .map(item => item.name),
            }
          }),

          countries: producersList.map(item => ({
            id: item.id,
            values: item.location?.country.name,
          })),
        }}
        pagination={pagination}
        onShowMore={handleShowMore}
        onClickHandler={handleSendOfferModal}
      />
      <Modal isOpen={isSendOfferModal} onClose={handleSendOfferModal}>
        <AskForQuoteModal />
      </Modal>
    </>
  )
}
