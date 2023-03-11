import { FC, useState } from 'react'

import { Button, Icon, Search, Tabs, Title } from 'components'
import { CategoriesList } from 'features'

import { tabLinkedButtons } from 'shared/mocks/tabs'
import { categoriesList } from 'shared/mocks/commodities'
import image from '/public/assets/img/tabs-search-icon.svg'


import s from './CommoditiesPage.module.scss'
import Image from 'next/image'

export const CommoditiesPage: FC = () => {

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const handleOpen = () => setIsOpen(prev => !prev)
  return (
    <>
      <div className={s.container}>
        <Title As='h1' className={s.title}>
          {`Buy and sell petrochemicals and order \nrelated services from verified suppliers`}
        </Title>
      </div>
      <Tabs
        tabButtons={tabLinkedButtons}
        tabPanels={[
          <div key={0} className={s.panelWrapper}>
            <CategoriesList items={categoriesList} className={s.categoriesList} />
          </div>,
        ]}
        addon={
          <div onClick={handleOpen} className={s.searchButton}>
            <Image src={image} />
          </div>
        }
      />
      <Search isOpen={isOpen} onClose={handleOpen} />
    </>
  )
}
