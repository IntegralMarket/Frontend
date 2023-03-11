import { FC } from 'react'

import { Tabs } from 'components'
import { CompanyProfilePanel } from './CompanyProfilePanel'
import { OfficesPanel } from './OfficesPanel'
import { TrackRecordPanel } from './TrackRecordPanel'
import { KycPanel } from './KycPanel'

import { Roles } from 'shared/types'
import { TraderDetail } from 'shared/types/traders'
import { ProducerDetail } from 'shared/types/producers'
import { ProviderDetail } from 'shared/types/providers'
import { ProductionPanel } from './ProductionPanel'
import s from './ProfilePanel.module.scss'
import { BuyerDetails } from 'shared/types/buyers'

interface ProfilePanelProps {
  data: TraderDetail | ProducerDetail | ProviderDetail | BuyerDetails
  role: Roles
}

export const ProfilePanel: FC<ProfilePanelProps> = ({ data, role }) => (
  <div className={s.innerTabs}>
    <Tabs
      tabButtons={
        role === Roles.PROVIDER
          ? [{ label: 'Profile' }, { label: 'Offices & Representatives' }]
          : role === Roles.BUYER // TODO use switch for better reading
            ? [
              { label: 'Profile' },
              { label: 'Offices & Representatives' },
              { label: 'Production' },
            ]
            : [
              { label: 'Profile' },
              { label: 'Offices & Representatives' },
              { label: 'Track Record' },
              { label: 'KYC' },
            ]
      }
      tabPanels={
        role === Roles.PROVIDER
          ? [
            <CompanyProfilePanel
              key={1}
              company={data.company}
              additional={{
                key: 'Services offered',
                value: (data as ProviderDetail).services_offered.map(
                  item => item.name
                ),
              }}
            />,
            <OfficesPanel key={2} offices={data.offices} />,
          ]
          : role === Roles.BUYER
            ? [
              <CompanyProfilePanel
                key={1}
                company={data.company}
                additional={{
                  key: 'Products sought / offered',
                  value: (data as ProducerDetail | TraderDetail)
                    .products_offered,
                }}
              />,
              <OfficesPanel key={2} offices={data.offices} />,
              <ProductionPanel key={1} />,
            ]
            : [
              <CompanyProfilePanel
                key={1}
                company={data.company}
                additional={{
                  key: 'Products sought / offered',
                  value: (data as ProducerDetail | TraderDetail)
                    .products_offered,
                }}
              />,
              <OfficesPanel key={2} offices={data.offices} />,
              <TrackRecordPanel
                key={3}
                track_record={
                  (data as ProducerDetail | TraderDetail).track_record
                }
              />,
              <KycPanel
                key={4}
                kyc={(data as ProducerDetail | TraderDetail).kyc}
              />,
            ]
      }
    />
  </div>
)
