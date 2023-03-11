import { FC, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import cn from 'classnames'

import {
  Button,
  CheckboxGroup,
  Dropdown,
  Icon,
  InputLabel,
  InputRange,
  Select,
  SwitchTabs,
  Title,
} from 'components'
import { FilterProductsModal } from 'features'

import { useGetCategory } from 'shared/hooks'
import { metaToOptions, stringToOption } from 'shared/helpers/select'
import { prepareQuery, formToQuery } from 'shared/helpers/parseQuery'
import { FilterProductsForm } from 'shared/types/filterProductsForm'
import { tradeTabs } from 'shared/mocks/tabs'

import { Trade } from 'shared/types'
import { capitalize } from 'shared/helpers/capitalize'

import s from './FindPage.module.scss'

interface FindProps {
  tab: Trade
}

export const Find: FC<FindProps> = ({ tab }) => { //TODO FindPage*
  const router = useRouter()
  const [category] = useGetCategory()
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false)
  const handleFilterModal = () => setIsFilterModalOpen(prev => !prev)
  const handleFilterModalOpen = (isOpen: boolean) => {
    setIsFilterModalOpen(isOpen)
  }
  const themeClass = cn(s[`theme${capitalize(tab)}`])
  const themeTabsClass = cn(s[`themeTabs${capitalize(tab)}`])
  const themeTabClass = cn(s[`themeTab${capitalize(tab)}`])

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FilterProductsForm>({
    defaultValues: {
      delivery_to: null,
      type: null,
      method: null,
      mfr: [null, null],
    },
  })
  const onSubmit: SubmitHandler<FilterProductsForm> = formData => {
    router.push(
      prepareQuery(`/polymers/`, { trade: tab }, formToQuery(formData, category))
    )
  }

  const CountryFilterLabel = () => (
    <div className={s.deliveryTitle}>
      <span className={s.description}>Place of delivery </span>
      <span className={cn(s.countries)}>
        {getValues(['delivery_to']).join(', ') || 'All countries'}
      </span>
    </div>
  )
  const switchTabs = (name: string) => {
    router.push({ pathname: `/find/${name.toLowerCase()}` }, undefined, {
      scroll: false,
    })
  }
  return (
    <>
      <form className={cn(s.formWrapper)} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.header}>
          <Title As='h2' className={cn(s.title, themeClass)}>
            I want to find
          </Title>
          <SwitchTabs
            activeClassName={themeTabClass}
            className={cn(s.bidTabs, themeTabsClass, s.switchTabsClass)}
            tabs={tradeTabs}
            defaultTab={tab === Trade.BID ? 1 : 0}
            onClick={switchTabs}
          />
        </div>
        <div className={s.tradeType}>
          <span className={cn(s.selectedTrade, themeClass)}>
            Raw materials /{' '}
          </span>
          <span className={s.otherTrade}>Recycling</span>
        </div>
        <div className={s.filtersWrapper}>
          <Controller
            name='type'
            control={control}
            render={({ field }) => (
              <Select
                className={cn(s.select, s.firstChild)}
                isMulti
                {...field}
                placeholder='All types'
                value={stringToOption(field.value)}
                options={metaToOptions(category?.product_types)}
                ref={null}
              />
            )}
          />
          <Controller
            name='method'
            control={control}
            render={({ field }) => (
              <Select
                className={s.select}
                isMulti
                {...field}
                placeholder='All methods'
                value={stringToOption(field.value)}
                options={metaToOptions(category?.processing_methods)}
                ref={null}
              />
            )}
          />
          <Controller
            name='mfr'
            control={control}
            render={({ field }) => (
              <InputRange
                {...field}
                min={0}
                max={100}
                values={field.value}
                className={cn(s.inputRange, s.lastChild)}
                ref={null}
              />
            )}
          />
        </div>

        <div className={s.bottomPanel}>
          <Button
            className={s.filtersButton}
            variant='outline'
            onClick={handleFilterModal}
          >
            <Icon variant='filter' />
            <span className={cn(s.text, themeClass)}>More filters</span>
          </Button>

          <Controller
            name='delivery_to'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Dropdown
                title={<CountryFilterLabel />}
                className={s.delivery}
                contentClassName={s.deliveryContent}
              >
                <CheckboxGroup
                  className={s.deliveryGroup}
                  value={value}
                  onChange={onChange}
                  options={category?.delivery_to.map(item => item.name) || []}
                />
              </Dropdown>
            )}
          />
        </div>

        <Button className={s.submitButton} type='submit'>
          {tab === Trade.OFFER ? 'Find offers' : 'Find bids'}
        </Button>
      </form>

      <div className={s.hidden}>
        <FilterProductsModal
          query={{ trade: tab }}
          category={category}
          redirect={`/polymers/`}
          isOpen={isFilterModalOpen}
          handleOpen={handleFilterModalOpen}
        />
      </div>
    </>
  )
}
