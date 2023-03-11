import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Tabs } from 'components'
import { CompanyInfo, ProfilePanel } from 'features'

import { useAppDispatch } from 'shared/hooks'
import { getProducerById } from 'shared/api/routes/producers'
import { ProducerDetail } from 'shared/types/producers'
import { Roles } from 'shared/types'
import { setCrumbs } from 'store/slices/crumbSlice'
import { tabProducerButtons } from './constants'

import s from './ProducerPage.module.scss'

export const ProducerPage: FC = () => {
  const dispatch = useAppDispatch()
  const [profile, setProfile] = useState<ProducerDetail | null>(null)
  const router = useRouter()
  const id = Number(router.query.id)

  useEffect(() => {
    const loadProducer = async (id: number) => {
      if (!id) return

      try {
        const { data } = await getProducerById(id)
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
            role={Roles.PRODUCER}
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
        tabButtons={tabProducerButtons(id)}
        tabPanels={
          profile
            ? [<ProfilePanel key={1} data={profile} role={Roles.PRODUCER} />]
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
