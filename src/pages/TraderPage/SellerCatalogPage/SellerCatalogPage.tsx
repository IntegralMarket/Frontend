import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Tabs } from 'components'
import { CompanyInfo, OffersPanel } from 'features'

import { tabTraderButtons } from '../constants'
import { setCrumbs } from 'store/slices/crumbSlice'

import { useAppDispatch } from 'shared/hooks'
import { Roles } from 'shared/types'
import { TraderDetail } from 'shared/types/traders'
import { getSellerCatalog, getSellerProfile } from 'shared/api/routes/sellers'

import s from './SellerCatalogPage.module.scss'
import { CatalogPanel } from '../../../features/CompanyPanels/CatalogPanel'
import { CatalogItem } from 'shared/types/products'

export const SellerCatalogPage: FC = () => {
  const dispatch = useAppDispatch()
  const [profile, setProfile] = useState<TraderDetail | null>(null)
  const [catalog, setCatalog] = useState<CatalogItem[] | null>(null)

  const router = useRouter()
  const id = Number(router.query.id)
  const roleFilterParam = {
    trader_id__in: id.toString(),
  }
  useEffect(() => {
    const loadTrader = async (id: number) => {
      if (!id) return

      try {
        const { data } = await getSellerProfile(id)
        const { data: catalog } = await getSellerCatalog(id)
        setProfile(data)
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
        tabButtons={tabTraderButtons(id)}
        tabPanels={
          profile
            ? [
              <CatalogPanel
                key={2}
                id={id}
                role={Roles.SELLER}
                catalogItems={catalog ?? []}
                params={roleFilterParam}
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
      />
    </>
  )
}
