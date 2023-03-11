import { FC, useEffect, useState } from 'react'
import s from './TraderPage.module.scss'

import { Modal, Tabs } from 'components'
import {
  CompanyInfo,
  OffersPanel,
  ProfilePanel,
  RequestProductForm,
  SendOfferModal,
} from 'features'

import { setCrumbs } from 'store/slices/crumbSlice'

import { useAppDispatch, useGetCategory } from 'shared/hooks'
import { useRouter } from 'next/router'

import { Roles } from 'shared/types'
import { TraderDetail } from 'shared/types/traders'
import {
  getSellerBids,
  getSellerCatalog,
  getSellerOffers,
  getSellerProfile,
} from 'shared/api/routes/sellers'

import { Offer } from 'shared/types/offer'
import { Bid } from 'shared/types/bid'
import { CatalogItem } from 'shared/types/products'
import { TabPassedProps } from 'components/Tabs/Tab'
import { CatalogPanel } from 'features/CompanyPanels/CatalogPanel'
import { BidsPanel } from 'features/CompanyPanels/BidsPanel'
import { useSelector } from 'react-redux'
import { getSelectedOffer } from '../../store/selectors/selectedOffer'

export const TraderPage: FC = () => {
  const dispatch = useAppDispatch()
  const [profile, setProfile] = useState<TraderDetail | null>(null)
  const [bids, setBids] = useState<Bid[]>([])
  const [offers, setOffers] = useState<Offer[]>([])
  const [catalogs, setCatalog] = useState<CatalogItem[]>([])
  const router = useRouter()
  const [category] = useGetCategory()

  const [isOpenAskQuoteModal, setIsOpenAskQuoteModal] = useState<boolean>(false)
  const handleAskQuoteModal = () => {
    setIsOpenAskQuoteModal(prev => !prev)
  }
  const [isOpenSendOfferModal, setIsOpenSendOfferModal] =
    useState<boolean>(false)
  const handleSendOfferModal = () => {
    setIsOpenSendOfferModal(prev => !prev)
  }
  const { selectedOffer } = useSelector(getSelectedOffer)

  const getIndex = () => {
    const path = router.pathname
    if (path.includes('profile')) {
      return 0 // TODO use number enum TraderTabs
    }
    if (path.includes('catalog')) {
      return 1
    }
    if (path.includes('offers')) {
      return 2
    }
    if (path.includes('bids')) {
      return 3
    }
    return 0
  }
  const getTraderTabs = (bids: Bid[], offers: Offer[]): TabPassedProps[] => {
    let tabs = [
      { label: 'Company', link: `/traders/${id}/profile` },
      { label: 'Catalog', link: `/traders/${id}/catalog` },
    ]
    if (offers.length) {
      tabs.push({ label: 'Offers', link: `/traders/${id}/offers` })
    }
    if (bids.length) {
      tabs.push({ label: 'Bids', link: `/traders/${id}/bids` })
    }
    return tabs
  }
  const id = Number(router.query.id)

  useEffect(() => {
    const loadTrader = async (id: number) => {
      if (!id) return

      try {
        const { data } = await getSellerProfile(id)
        const { data: offers } = await getSellerOffers(id)
        const { data: bids } = await getSellerBids(id)
        const { data: catalog } = await getSellerCatalog(id)

        setProfile(data)
        setOffers(offers.results)
        setBids(bids.results)
        setCatalog(catalog.results)


        dispatch(setCrumbs({ nameAsId: data.company.name }))
      } catch (error) {
        console.error(error)
      }
    }
    loadTrader(id)
  }, [dispatch, id])

  return (
    <>
      <div className={s.container}>
        {profile ? (
          <CompanyInfo
            name={profile.company.name}
            logo={profile.company?.logo}
            country={profile.location?.country?.name}
            rating={profile.rating}
            size='large'
          />
        ) : (
          <CompanyInfo
            name={'Loading...'}
            country={'Loading...'}
            size='large'
          />
        )}
      </div>

      <Tabs
        tabButtons={getTraderTabs(bids, offers)}
        tabPanels={
          profile
            ? [
              <ProfilePanel key={1} data={profile} role={Roles.SELLER} />,
              <CatalogPanel
                key={2}
                id={id}
                role={Roles.SELLER}
                catalogItems={catalogs}
                params={{
                  trader_id__in: id.toString(),
                }}
              />,
              <OffersPanel
                key={3}
                id={id}
                role={Roles.SELLER}
                modalOpenHandlers={{
                  onClickAskQuote: handleAskQuoteModal,
                  onClickSendOffer: handleSendOfferModal,
                }}
                seller={profile}
              />,
              <BidsPanel
                key={4}
                id={id}
                role={Roles.SELLER}
                modalOpenHandlers={{
                  onClickAskQuote: handleAskQuoteModal,
                  onClickSendOffer: handleSendOfferModal,
                }}
                seller={profile}
              />,
            ]
            : [
              <p key={0} className={s.container}>
                Loading...
              </p>,
            ]
        }
        rounded
        variant='tag'
        defaultIndex={getIndex()}
      />
      <Modal isOpen={isOpenAskQuoteModal} onClose={handleAskQuoteModal}>
        <RequestProductForm
          //@ts-ignore
          offer={selectedOffer}
        />
      </Modal>
      <Modal
        isOpen={isOpenSendOfferModal}
        onClose={handleSendOfferModal}
        closeButton
      >
        <SendOfferModal category={category} />
      </Modal>
    </>
  )
}
