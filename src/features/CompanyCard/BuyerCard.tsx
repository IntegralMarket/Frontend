import { FC } from 'react'

import { Icon } from 'components'
import { CompanyCard } from './CompanyCard'

import { CommoditiesTypes } from './CommoditiesType'
import { Roles } from 'shared/types'
import { convertLink } from 'shared/helpers/convertLink'

import s from './CompanyCard.module.scss'
import { Buyer } from 'shared/types/buyers'

export const BuyerCard: FC<Buyer> = data => (
  <CompanyCard
    name={data.name}
    link={`/buyers/${data.id}/profile`}
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
      <div className={s.caption}>Products required ({data.products_required})</div>
      <CommoditiesTypes {...data} role={Roles.BUYER} />
    </div>
  </CompanyCard>
)
