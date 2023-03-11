import { FC } from 'react'

import { Icon } from 'components'
import { CompanyCard } from './CompanyCard'

import { CommoditiesTypes } from './CommoditiesType'
import { Roles } from 'shared/types'
import { Trader } from 'shared/types/traders'
import { convertLink } from 'shared/helpers/convertLink'

import s from './CompanyCard.module.scss'

export const TraderCard: FC<Trader> = data => (
  <CompanyCard
    name={data.name}
    link={`/traders/${data.id}/offers`}
    place={data.location}
    image={data.logo}
    rating={data.rating}
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
      <div className={s.caption}>Products offered ({data.products_offered})</div>
      <CommoditiesTypes {...data} role={Roles.SELLER} />
    </div>
  </CompanyCard>
)
