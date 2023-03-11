import { FC, useState } from 'react'

import { Accordion, Title } from 'components'
import { Map, MarkerProps } from 'features'
import { TrackRecord } from 'shared/types/company'

import s from './TrackRecordPanel.module.scss'

interface TrackRecordPanelProps {
  track_record: TrackRecord[]
}

export const TrackRecordPanel: FC<TrackRecordPanelProps> = ({
  track_record,
}) => {
  const [data, setData] = useState<MarkerProps[]>([])

  return (
    <div className={s.panelContainer}>
      <div className={s.panelContent}>
        <div className={s.accordionWrapper}>
          <Title As='h5' className={s.title}>
            Global Track record
          </Title>
          {track_record.length ? (
            track_record.map((item, index) => (
              <Accordion
                key={index}
                className={s.accordion}
                withProgressBar
                title={item?.name}
                subTitle={item?.supplies}
              >
                <p className={s.content}>
                  Countries: {/* TODO fix after backend */}
                  <span className={s.amount}>{item?.countries.length}</span>
                </p>
                <p className={s.content}>
                  Ports: <span className={s.amount}>{item?.ports.length}</span>
                </p>
              </Accordion>
            ))
          ) : (
            <p className={s.plugText}>
              There is currently no track records available
            </p>
          )}
        </div>
        <Map
          className={s.map}
          type='location'
          zoom={1.8}
          markers={data || undefined}
        />
      </div>
    </div>
  )
}
