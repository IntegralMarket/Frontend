import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Tabs } from 'components'
import { CompanyInfo, ProfilePanel } from 'features'

import { useAppDispatch } from 'shared/hooks'
import { setCrumbs } from 'store/slices/crumbSlice'

import { getProviderById } from 'shared/api/routes/providers'
import { ProviderDetail } from 'shared/types/providers'
import { Roles } from 'shared/types'
import { tabProviderButtons } from './constants'

import s from './ProviderPage.module.scss'

export const ProviderPage: FC = () => {
  const dispatch = useAppDispatch()
  const [profile, setProfile] = useState<ProviderDetail | null>(null)
  const router = useRouter()
  const id = Number(router.query.id)

  useEffect(() => {
    const loadProducer = async (id: number) => {
      if (!id) return

      try {
        const { data } = await getProviderById(id)
        setProfile(data)
        dispatch(setCrumbs({ nameAsId: data.company.name }))
      } catch (error) {
        console.error(error)
      }
    }
    loadProducer(id)
  }, [dispatch, id])

  return (
    <>
      <div className={s.container}>
        {profile ? (
          <CompanyInfo
            name={profile.company.name}
            logo={profile.company?.logo}
            country={profile.location?.country?.name}
            role={Roles.PROVIDER}
            rating={0}
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
        tabButtons={tabProviderButtons(id)}
        tabPanels={
          profile
            ? [<ProfilePanel key={1} data={profile} role={Roles.PROVIDER} />]
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
