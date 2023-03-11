import { FC } from 'react'

import { Icon } from 'components'
import { CompanyCard } from './CompanyCard'

import { Provider } from 'shared/types/providers'
import { convertLink } from 'shared/helpers/convertLink'

import s from './CompanyCard.module.scss'

export const ProviderCard: FC<Provider> = data => {
  return (
    <CompanyCard
      name={data.company.name}
      link={`/providers/${data.id}`}
      place={data.location}
      image={data.company.logo}
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
        <div>
          <p className={s.caption}>Services ({data.services_offered.length})</p>
          {data.services_offered.length ? (
            <ul className={s.productsList}>
              {data.services_offered.map((item, index) => (
                <li key={index}>{item.name}</li>
              ))}
            </ul>
          ) : (
            <ul className={s.productsList}>
              <li>Nothing to show</li>
            </ul>
          )}
        </div>
      </div>
    </CompanyCard>
  )
}
