import { FC, ReactElement, ReactNode, useState } from 'react'

import {
  BuyerCard,
  ProducerCard,
  ProviderCard,
  RequestProductForm,
  TraderCard,
} from 'features'
import { AskForQuoteModal } from 'features/AskForQuoteModal'
import { Button, Modal, Select, Tabs, Title } from 'components'

import { stringToOption } from 'shared/helpers/select'
import { capitalize } from 'shared/helpers/capitalize'
import { SelectType, PaginationType, Roles } from 'shared/types'
import { Producer } from 'shared/types/producers'
import { Provider } from 'shared/types/providers'
import { Buyer } from 'shared/types/buyers'
import { Trader } from 'shared/types/traders'
import { tabLinkedButtons } from 'shared/mocks/tabs'
import { mock_services } from 'shared/mocks/mock_services'
import { useGetCategory } from 'shared/hooks'
import { CompanyType, FiltersObject, StateOptionsObject } from './types'
import { filterList, filtersToOptions, filtersToState } from './utils'

import s from './CompaniesList.module.scss'

interface CompaniesListProps {
  list: CompanyType[]
  filters: FiltersObject
  companyType: Roles
  pagination: PaginationType
  onShowMore: () => void
  onClickHandler?: () => void
}

export const CompaniesList: FC<CompaniesListProps> = ({
  list,
  filters,
  companyType,
  pagination,
  onShowMore,
  onClickHandler,
}) => {
  const [activeFilter, setActiveFilter] = useState<StateOptionsObject>(
    filtersToState(filters)
  )
  const [category] = useGetCategory()
  const [isOpenQuoteModal, setIsOpenQuoteModal] = useState<boolean>(false)
  const handleQuoteModal = () => setIsOpenQuoteModal(prev => !prev)

  const [isOpenQuoteModalSeller, setIsOpenQuoteModalSeller] =
    useState<boolean>(false)
  const handleQuoteModalSeller = () => setIsOpenQuoteModalSeller(prev => !prev)

  const [isSendOfferModal, setIsSendOfferModal] = useState<boolean>(false)
  const handleSendOfferModal = () => setIsSendOfferModal(prev => !prev)

  const handleActiveFilter = (value: SelectType<string>, key?: string) => {
    setActiveFilter(prev => {
      return key ? { ...prev, [key]: value } : prev
    })
  }

  const handleIsQuoteSent = () => {
    console.log('sent')
  }

  const handleClick = () => {
    onClickHandler?.()
  }

  function getActionButton( // TODO different logic for opening modals
    companyType: Roles
  ): ReactNode {
    return null // request of the client
    switch (companyType) {
      case Roles.SELLER:
        return (
          <Button className={s.button} onClick={handleQuoteModalSeller}>
            ASK FOR QUOTE
          </Button>
        )
      case Roles.PRODUCER:
        return (
          <Button className={s.button} onClick={handleQuoteModalSeller}>
            ASK FOR QUOTE
          </Button>
        )
      case Roles.PROVIDER:
        return (
          <Button className={s.button} onClick={handleQuoteModal}>
            ASK FOR QUOTE
          </Button>
        )
      case Roles.BUYER:
        return (
          <Button className={s.button} onClick={handleClick}>
            SEND OFFER
          </Button>
        )
    }
  }
  const options = filtersToOptions(filters)
  const filteredList = filterList(filters, activeFilter, list)

  return (
    <>
      <div className={s.container}>
        <Title As='h1' className={s.title}>
          {`Buy and sell petrochemicals and order \nrelated services from verified suppliers`}
        </Title>
      </div>

      <Tabs
        tabButtons={tabLinkedButtons}
        tabPanels={[
          <div key={0} className={s.panelWrapper}>
            <div className={s.blockFilter}>
              <div className={s.filter}>
                {Object.keys(filters).map((key, index) => (
                  <Select
                    key={index}
                    placeholder={capitalize(key)}
                    id={key}
                    className={s.filterSelect}
                    value={stringToOption(activeFilter[key])}
                    onChange={handleActiveFilter}
                    options={options[key]}
                    isMulti
                  />
                ))}
              </div>
              {getActionButton(companyType)}
            </div>
            {filteredList.length ? (
              <div className={s.list}>
                {filteredList.map((data, index) => {
                  switch (companyType) {
                    case Roles.SELLER:
                      return <TraderCard key={index} {...(data as Trader)} />
                    case Roles.PRODUCER:
                      return (
                        <ProducerCard key={index} {...(data as Producer)} />
                      )
                    case Roles.PROVIDER:
                      return (
                        <ProviderCard key={index} {...(data as Provider)} />
                      )
                    case Roles.BUYER:
                      return <BuyerCard key={index} {...(data as Buyer)} />
                  }
                })}
              </div>
            ) : (
              <p className={s.plugText}>
                Nothing to show. Try to change filter parameters
              </p>
            )}
            <Modal
              isOpen={isOpenQuoteModal}
              onClose={handleQuoteModal}
              closeButton
              contentClassName={s.contentClassName}
            >
              <AskForQuoteModal // TODO!!!!
                services={mock_services}
                category={category}
                onCallbackSubmit={handleIsQuoteSent}
                onClose={handleQuoteModal}
              />
            </Modal>
            <Modal
              isOpen={isOpenQuoteModalSeller}
              onClose={handleQuoteModalSeller}
              closeButton
              contentClassName={s.requestProductFormCross}
            >
              <RequestProductForm
                onClose={handleQuoteModalSeller}
                category={category}
              />
            </Modal>
            <Modal isOpen={isSendOfferModal} onClose={handleSendOfferModal}>
              <AskForQuoteModal />
            </Modal>
            {pagination.offset < pagination.count && (
              <Button
                onClick={onShowMore}
                variant='outline'
                className={s.showMoreButton}
              >
                Show more...
              </Button>
            )}
          </div>,
        ]}
      />
    </>
  )
}
