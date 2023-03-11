import { FC } from 'react'

import { Icon } from 'components'
import { CompanyCard } from './CompanyCard'

import { CommoditiesTypes } from './CommoditiesType'
import { Roles } from 'shared/types'
import { Producer } from 'shared/types/producers'
import { convertLink } from 'shared/helpers/convertLink'

import s from './CompanyCard.module.scss'

export const ProducerCard: FC<Producer> = data => (
  <CompanyCard
    name={data.name}
    link={`/producers/${data.id}/commodities`}
    place={data.location}
    image={data.logo}
  >
    <div className={s.content}>
      <div className={s.blockIcon}>
        <span className={s.icon}>
          <Icon variant={'network'} />
        </span>
        <a
          className={s.link}
          href={convertLink(data.website)}
          target='_blank'
          rel='noreferrer'
        >
          Website
        </a>
      </div>
      <p className={s.caption}>Products ({data.products_count})</p>
      <CommoditiesTypes {...data} role={Roles.PRODUCER} />
      <p className={s.caption}>Contacts</p>
      <p>
        Tel:{' '}
        <a className={s.link} href={`tel:${data.phone}`}>
          {data.phone !== '' ? data.phone : '-'}
        </a>
      </p>
      <p>
        Email:{' '}
        <a className={s.link} href={`mailto:${data.email}`}>
          {data.email !== '' ? data.email : '-'}
        </a>
      </p>
    </div>
  </CompanyCard>
)
