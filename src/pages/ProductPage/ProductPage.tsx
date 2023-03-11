import { FC, ReactNode, useEffect, useLayoutEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import cn from 'classnames'

import { Button, Icon, Modal, Tabs, Title } from 'components'
import { CompanyInfo, RequestProductForm } from 'features'
import {
  AnalogsPanel,
  AvailabilityPanel,
  ProductPanel,
  BidsPanel,
} from './Panels'
import { OffersPanel } from './Panels/NewOffersPanel'
import { RequestDocumentModal } from 'features/RequestDocumentModal'
import { TabPassedProps } from '../../components/Tabs/Tab'

import { setCrumbs } from 'store/slices/crumbSlice'

import { useAppDispatch, useGetCategory } from 'shared/hooks'
import {
  getProductData,
  getProductOffer,
  getProductBid,
} from 'shared/api/routes/products'
import { GradeDetail } from 'shared/types/products'
import { Roles } from 'shared/types'
import { Offer } from 'shared/types/offer'
import { Bid } from 'shared/types/bid'

import s from './ProductPage.module.scss'
import { getProducerById } from 'shared/api/routes/producers'
import { getSellerProfile } from 'shared/api/routes/sellers'

interface ProductInfo {
  role: Exclude<Roles, Roles.PROVIDER>
}

export const ProductPage: FC<ProductInfo> = ({ role = Roles.SELLER }) => {
  const dispatch = useAppDispatch()
  const [gradeData, setGradeData] = useState<GradeDetail | null>(null) //FIXME type has changed
  const [offersData, setOffersData] = useState<Offer[] | null>([])
  const [bidData, setBidData] = useState<Bid[] | null>([])
  const [tabs, setTabs] = useState<TabPassedProps[]>([])
  const [tabsPanels, setTabsPanels] = useState<ReactNode[]>([])
  const [activeTav, setActiveTav] = useState(0)
  const router = useRouter()
  const [category] = useGetCategory()
  const gradeId = Number(router.query.productId)
  const offerId = Number(router.query.offerId)
  const bidId = Number(router.query.bidId)
  const authorId = Number(router.query.id)
  const isProducerPage = role === Roles.PRODUCER
  const isSellerPage = role === Roles.SELLER
  useEffect(() => {
    const tabQuery = Number(router.query.tab)
    setActiveTav(tabQuery ? tabQuery : 0)
  }, [router.query.tab])

  const currentOffer =
    offersData?.find(offer => offer.id === offerId) ?? offersData?.[0]
  const currentBid = bidData?.find(offer => offer.id === bidId) ?? bidData?.[0]


  useEffect(() => {
    const loadProductData = async () => {
      if (!gradeId) return
      try {
        const { data } = await getProductData(gradeId)
        const { data: offerData } = await getProductOffer(gradeId)
        const { data: bidData } = await getProductBid(gradeId)

        setGradeData(data)
        setOffersData(offerData.results)
        setBidData(bidData.results)

        dispatch(
          setCrumbs({
            nameAsId: data.mark,
            productNameAsId: data.mark,
          })
        )
      } catch (error) {
        console.error(error)
      }
    }
    loadProductData()
  }, [gradeId])

  const [isOpenQuoteModal, setIsOpenQuoteModal] = useState<boolean>(false)
  const handleQuoteModal = () => setIsOpenQuoteModal(prev => !prev)
  const [isOpenDocumentModal, setIsOpenDocumentModal] = useState<boolean>(false)
  const handleRequestDocumentModal = () => setIsOpenDocumentModal(prev => !prev)
  const [isQuoteSent, setIsQuoteSent] = useState<boolean>(false)
  const handleIsQuoteSent = () => setIsQuoteSent(true)
  const [author, setAuthor] = useState<any | null>(null) // TODO
  useEffect(() => {
    const getTabs = () => {
      if (isProducerPage) {
        return [
          { label: 'Product' },
          { label: 'Analogs', disabled: true }
        ]
      }
      if (authorId) {
        return [{ label: 'Product' },
        { label: 'Analogs', disabled: true },
        { label: 'Availability', disabled: true },
        { label: 'Offers', hidden: !offersData?.find((offer) => offer.trader.id === authorId) },
        { label: 'Bids', hidden: bidData?.find((bid) => bid.author.id === authorId) }
        ];
      }
      if (offerId) {
        return [
          { label: 'Product' },
          { label: 'Analogs', disabled: true },
          { label: 'Availability', disabled: true },
          {
            label: 'Offers',
            disabled: !gradeData?.has_offers,
            hidden: !gradeData?.has_offers,
          }
        ]
      }
      if (bidId) {
        return [
          { label: 'Product' },
          { label: 'Analogs', disabled: true },
          { label: 'Availability', disabled: true },
          { label: 'Offers', hidden: true, },
          {
            label: 'Bids',
            disabled: !gradeData?.has_bids,
            hidden: !gradeData?.has_bids,
          },
        ]
      }
      return [
        { label: 'Product' },
        { label: 'Analogs', disabled: true },
        { label: 'Availability', disabled: true },
      ]
    }


    const getTabsPanels = (): ReactNode[] => {
      if (!gradeData) return []

      return [
        <ProductPanel
          key={1}
          {...gradeData}
          handleRequestDocumentModal={handleRequestDocumentModal}
        />,
        <AnalogsPanel key={2} {...gradeData} />,
        <AvailabilityPanel key={2} {...gradeData} />,
        category && offersData && gradeData.has_offers && (
          <OffersPanel
            offers={offersData}
            grade={gradeData}
            filters={category}
            id={offerId}
            key={3}
          />
        ),
        category && gradeData.has_bids && bidData && (
          <BidsPanel id={bidId} bid={bidData} filters={category} key={4} />
        ),
      ]
    }

    setTabs(getTabs())
    setTabsPanels(getTabsPanels())
  }, [gradeData, bidData, category, offersData])

  useEffect(() => { // TODO refactor
    const loadProducer = async (id: number) => {
      if (!id) return
      try {
        const { data } = await getProducerById(id)
        setAuthor({
          id: data.company.id,
          name: data.company.name,
          logo: data.company.logo,
          country: data.location?.country.name
        })
      } catch (error) {
        console.error(error)
      }
    }
    const loadSeller = async (id: number) => {
      if (!id) return

      try {
        const { data } = await getSellerProfile(id)
        setAuthor({
          id: data.company.id,
          name: data.company.name,
          logo: data.company.logo,
          country: data.location?.country.name
        })
      } catch (error) {
        console.error(error)
      }
    }
    isProducerPage && loadProducer(authorId)
    isSellerPage && loadSeller(authorId)
  }, [])
  const handleTabChange = (index: number) => {
    // router.push({ query: { ...router.query, tab: index } }, undefined, { shallow: true })
  }
  const getCompanyInfo = () => {
    switch (activeTav) {
      case 3: // offer
        return <>
          <p className={s.offered}>Offered by:</p>
          <CompanyInfo
            rating={currentOffer?.trader.rating}
            name={currentOffer?.trader.name ?? ''}
            logo={currentOffer?.trader.logo}
            country={currentOffer?.trader.country}
            link={`/traders/${currentOffer?.trader?.id}`}
          />
        </>
      case 4: // bid
        return (currentBid?.author.is_buyer ? ( // buyer info
          <>
            <p className={s.offered}>Required by:</p>
            <CompanyInfo
              name={currentBid?.author?.name ?? ''}
              logo={currentBid?.author.logo}
              country={currentBid?.author.country ?? ''}
              role={Roles.BUYER}
              link={`/buyers/${currentBid?.author?.id}`}
            />
          </>
        ) : ( // seller info
          <>
            <p className={s.offered}>Required by:</p>
            <CompanyInfo
              name={currentBid?.author?.name ?? ''}
              logo={currentBid?.author.logo}
              country={currentBid?.author.country ?? ''}
              role={Roles.SELLER}
              link={`/traders/${currentBid?.author?.id}`}
            />
          </>
        ))
      default:
        if (!author) return
        return (isProducerPage ? <>
          <p className={s.offered}>Produced by:</p>
          <CompanyInfo
            name={author.name ?? ''}
            logo={author?.logo}
            country={author?.country}
            link={`/producers/${author?.id}`}
            role={Roles.PRODUCER}
          />
        </> : <>
          <p className={s.offered}>Offered by:</p>
          <CompanyInfo
            rating={author?.rating}
            name={author.name ?? ''}
            logo={author?.logo}
            country={author?.country}
            link={`/producers/${author?.id}`}
          />
        </>)
    }
  }
  return gradeData ? (
    <>
      <div className={s.container}>
        <div className={s.headerContent}>
          <div className={s.categoryWrapper}>
            <Link
              href={`/polymers?product_type_id__in=${gradeData.product_type?.id}`}
            >
              <a className={s.link}>
                {gradeData.product_type?.name}
                <span className={s.iconWrapper}>
                  <Icon variant='arrow-right' size={16} />
                </span>
              </a>
            </Link>
            <Title As='h2'>{gradeData.mark}</Title>
          </div>
          <div className={s.companyInfoWrapper}>
            {getCompanyInfo()}
          </div>
        </div>

        <Tabs
          tabButtons={tabs}
          tabPanels={tabsPanels}
          addon={
            activeTav === 0 && <Button className={s.actionButton} onClick={() => setIsOpenQuoteModal(true)}>
              ask&nbsp;for&nbsp;quote
            </Button>
          }
          onClick={handleTabChange}
          defaultIndex={activeTav}
        />
      </div>

      <Modal
        isOpen={isOpenQuoteModal}
        onClose={handleQuoteModal}
        closeButton
        contentClassName={s.requestProductFormCross}
      >
        <RequestProductForm
          category={category}
          grade={{ id: gradeData.id, name: gradeData.mark }}
          onClose={handleQuoteModal}
          onCallbackSubmit={handleIsQuoteSent}
          trader={gradeData.author ?? offersData?.[0]?.trader}
          query={{}} // TODO maybe this props should be partial?
        />
      </Modal>

      <Modal
        isOpen={isOpenDocumentModal}
        onClose={handleRequestDocumentModal}
        closeButton
        contentClassName={cn(s.contentClassName, s.requestDocumentModalCross)}
      >
        <RequestDocumentModal product={gradeData} />
      </Modal>
    </>
  ) : (
    <div>Loading...</div>
  )
}
