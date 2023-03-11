import { FC, useState, useEffect } from 'react'

import Image from 'next/image'
import { Title } from 'components'
import { EmployeeCard, Map } from 'features'

import {
  convertToCustomMarker,
  CustomMarkerProps,
  getCoordinates,
} from 'features/Map/utils'
import { Office } from 'shared/types/company'
import { flagLoader } from 'shared/helpers/convertLink'

import s from './OfficesPanel.module.scss'

interface OfficeProps extends Office, CustomMarkerProps {}

interface OfficePanelProps {
  offices: Office[]
}

export const OfficesPanel: FC<OfficePanelProps> = ({ offices }) => {
  const [data, setData] = useState<OfficeProps[]>([])
  const [mapData, setMapData] = useState<CustomMarkerProps[]>([])
  const [picked, setPicked] = useState<number>(0)
  const [activeOffice, setActiveOffice] = useState<OfficeProps | null>(null)

  useEffect(() => {
    const loadCoordinates = async (office: Office) => {
      const country = office.country?.name
      const address = [office.city?.name, country].join(' ')

      try {
        const position = await getCoordinates(address)
        const active = office.head_office
        const onClick = (id: number) => setPicked(id)
        setData(prev =>
          !prev.map(item => item.id).includes(office.id)
            ? prev.concat({ ...office, ...position, active, onClick })
            : prev
        )
      } catch (error) {
        console.error(error)
      }
    }

    offices.forEach(item => loadCoordinates(item))
  }, [offices])

  useEffect(() => {
    setPicked(data.find(item => item.active)?.id || 0)
  }, [data])

  useEffect(() => {
    setActiveOffice(data.find(item => item.id === picked) || null)
    setMapData(
      data.map(item => {
        return { ...item, active: item.id === picked }
      })
    )
  }, [data, picked])

  return (
    <div className={s.panelContainer}>
      <div className={s.panelContent}>
        <div className={s.infoBlock}>
          {activeOffice ? (
            <>
              <Title As='h5' className={s.title}>
                {activeOffice.head_office ? 'Head office' : 'Branch office'}
              </Title>
              <div className={s.country}>
                {activeOffice.country.name && (
                  <Image
                    loader={() => flagLoader(activeOffice.country.name)}
                    unoptimized
                    width={36}
                    height={27}
                    src={flagLoader(activeOffice.country.name)}
                    alt='Flag'
                    crossOrigin={''}
                  />
                )}

                <Title As='h5' className={s.countryName}>
                  {[activeOffice.city?.name, activeOffice.country?.name].join(
                    ', '
                  )}
                </Title>
              </div>

              <address className={s.addressWrapper}>
                <p className={s.address}>
                  <span>
                    {activeOffice.address || 'Address is not available'}
                  </span>
                </p>

                <ul className={s.phoneList}>
                  <li>
                    <a href={`tel:${activeOffice.phone}`}>
                      Tel: {activeOffice.phone || 'not available'}
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${activeOffice.email}`}>
                      Email: {activeOffice.email || 'not available'}
                    </a>
                  </li>
                </ul>
              </address>
            </>
          ) : (
            <>
              <Title As='h5' className={s.title}>
                Company offices
              </Title>
              <p className={s.plugText}>
                There is currently no offices information available
              </p>
            </>
          )}

          <Title As='h5' className={s.title}>
            Purchase department
          </Title>

          <div className={s.staffWrapper}>
            {activeOffice && activeOffice.employees.length ? (
              activeOffice.employees.map(items => (
                <EmployeeCard
                  key={items.id}
                  name={items.fullname}
                  avatar={items.avatar}
                  phone={items.phone}
                  position={items.position}
                  email={items.email}
                />
              ))
            ) : (
              <p className={s.plugText}>
                There is currently no staff information available
              </p>
            )}
          </div>
        </div>
        <Map
          className={s.map}
          type='location'
          zoom={1.8}
          markers={
            mapData?.map(item => convertToCustomMarker(item)) || undefined
          }
        />
      </div>
    </div>
  )
}
