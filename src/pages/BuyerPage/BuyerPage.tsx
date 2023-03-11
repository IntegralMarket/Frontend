import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Tabs } from 'components'
import { CompanyInfo, ProfilePanel } from 'features'

import { tabBuyerButtons } from './constants'
import { setCrumbs } from 'store/slices/crumbSlice'

import { BuyerDetails } from 'shared/types/buyers'
import { useAppDispatch } from 'shared/hooks'
import { Roles } from 'shared/types'
import { getBuyerProfile } from 'shared/api/routes/buyers'

import s from './BuyerPage.module.scss'

export const BuyerPage: FC = () => {
  const dispatch = useAppDispatch()
  const [profile, setProfile] = useState<BuyerDetails | null>(null)
  const router = useRouter()
  const id = Number(router.query.id)

  useEffect(() => {
    const loadBuyer = async (id: number) => {
      if (!id) return

      try {
        const { data } = await getBuyerProfile(id)
        setProfile(data)
        dispatch(setCrumbs({ nameAsId: data.company.name }))
      } catch (error) {
        console.error(error)
      }
    }
    loadBuyer(id)
  }, [dispatch, id])

  return (
    <div>
      <div className={s.container}>
        {profile ? (
          <CompanyInfo
            role={Roles.BUYER}
            name={profile.company.name}
            logo={profile.company?.logo}
            country={profile.location?.country?.name}
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
        tabButtons={tabBuyerButtons(id)}
        tabPanels={
          profile
            ? [<ProfilePanel key={1} data={profile} role={Roles.BUYER} />]
            : [
                <p key={0} className={s.container}>
                  Loading...
                </p>,
              ]
        }
        rounded
        variant='tag'
      />
    </div>
  )
}
