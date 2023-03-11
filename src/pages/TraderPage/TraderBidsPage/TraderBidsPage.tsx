import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import cn from 'classnames'

import { Tabs } from 'components'
import { CompanyInfo } from 'features'
import { BidsPanel } from 'features/CompanyPanels/BidsPanel'

import { tabTraderButtons } from '../constants'
import { setCrumbs } from 'store/slices/crumbSlice'

import { Roles } from 'shared/types'
import { useAppDispatch } from 'shared/hooks'
import { TraderDetail } from 'shared/types/traders'
import { getSellerProfile } from 'shared/api/routes/sellers'

import s from './TraderBidsPage.module.scss'

export const TraderBidsPage: FC = () => {
  const dispatch = useAppDispatch()
  const [profile, setProfile] = useState<TraderDetail | null>(null)
  const router = useRouter()
  const id = Number(router.query.id)

  useEffect(() => {
    const loadTrader = async (id: number) => {
      if (!id) return

      try {
        const { data } = await getSellerProfile(id)
        setProfile(data)
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
            ? [<BidsPanel key={2} id={id} role={Roles.SELLER} />]
            : [
                <p key={0} className={s.container}>
                  Loading...
                </p>,
              ]
        }
        rounded
        variant='tag'
        className={cn({
          [s.bidsLink]: router.asPath.includes('/bids'),
        })}
      />
    </>
  )
}
