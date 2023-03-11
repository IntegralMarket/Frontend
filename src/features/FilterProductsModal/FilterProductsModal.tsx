import { FC, useEffect, useState } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'

import {
  Button,
  CheckboxGroup,
  CountBadge,
  Dropdown,
  Icon,
  IconButton,
  Input,
  InputLabel,
  InputRange,
  Modal,
  Select,
  SwitchTabs,
  Title,
} from 'components'

import { SortOptions } from 'shared/types'
import { metaToOptions, stringToOption } from 'shared/helpers/select'
import { formToQuery, prepareQuery } from 'shared/helpers/parseQuery'
import { switchTabs } from 'shared/mocks/tabs'
import { ProductFilterParams } from 'shared/types/products'
import { CategoryDetail } from 'shared/types/categories'
import { FilterProductsForm } from 'shared/types/filterProductsForm'

import s from './FilterProductsModal.module.scss'

interface FilterProductsModalProps {
  category?: CategoryDetail | null
  query: Partial<ProductFilterParams>
  params?: Partial<ProductFilterParams>
  redirect?: string
  isOpen?: boolean
  handleOpen?: (isOpen: boolean) => void
  heading?: string
}

export const FilterProductsModal: FC<FilterProductsModalProps> = ({
  category,
  query,
  params,
  redirect,
  isOpen = false,
  handleOpen,
}) => {
  const router = useRouter()
  const mfrPrep = query?.mfr?.split('-')
  const delivery_to = category?.delivery_to
    .filter(item => query.place_of_delivery?.includes(item.name.toString()))
    .map(item => item.name)

  const stocked_in = category?.stocked_in
    .filter(item => query.place_of_shipment?.includes(item.name.toString()))
    .map(item => item.name)

  const initialState: FilterProductsForm = {
    delivery_to: delivery_to?.length ? delivery_to : null,
    stocked_in: stocked_in && stocked_in.length ? stocked_in : null,
    type: query?.product_type_id__in?.split(', ') || null,
    method: query?.processing_method_id__in?.split(', ') || null,
    mfr: [Number(mfrPrep?.[0]) || null, Number(mfrPrep?.[1]) || null],
    origin: params?.origin || query?.origin?.split(', ') || null,
    producer:
      params?.producer_id__in || query?.producer_id__in?.split(', ') || null,
    name: params?.name || query?.name || null,
    application: query?.applications__in?.split(', ') || null,
  }

  const delivery_to_Options = category?.delivery_to.map(item => item.name)
  const stocked_in_Options = category?.stocked_in.map(item => item.name)

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FilterProductsForm>({
    defaultValues: initialState,
  })

  useEffect(() => {
    reset(initialState)
  }, [query])

  const onSubmit: SubmitHandler<FilterProductsForm> = formData => {
    setIsOpenFilterModal(false)
    const newQuery = formToQuery(formData, category)
    if (redirect) router.push(prepareQuery(redirect, query, newQuery))
    else
      router.replace(prepareQuery(router.asPath, query, newQuery), undefined, {
        shallow: true,
      })
  }

  const [isOpenFilterModal, setIsOpenFilterModal] = useState<boolean>(isOpen)
  const handleFilterModal = () =>
    setIsOpenFilterModal(prev => {
      handleOpen?.(!prev)
      return !prev
    })

  useEffect(() => {
    setIsOpenFilterModal(isOpen)
  }, [isOpen])

  const [filtersCount, setFiltersCount] = useState<number>(0)
  useEffect(() => {
    setFiltersCount(
      Object.values({ ...query, trade: undefined })
        .filter(
          // @ts-ignore
          (item: string) => !Object.values<string>(SortOptions).includes(item)
        )
        .filter(item => item !== 'true')
        .filter(item => item).length
    )
  }, [query])

  return (
    <>
      {redirect ? (
        <Button
          className={s.filtersButton}
          variant='outline'
          onClick={handleFilterModal}
        >
          <Icon variant='filter' />
          <span className={s.text}>More filters</span>
        </Button>
      ) : (
        <CountBadge count={filtersCount}>
          <IconButton
            onClick={handleFilterModal}
            icon='filter'
            tooltip='Filters'
          />
        </CountBadge>
      )}

      <Modal isOpen={isOpenFilterModal} onClose={handleFilterModal} closeButton>
        <div className={s.wrapper}>
          <Title As='h1' className={s.title}>
            Filters
          </Title>
          <form className={s.content} onSubmit={handleSubmit(onSubmit)}>
            <SwitchTabs className={s.switchTabs} tabs={switchTabs} />
            <div className={s.dropdownWrapper}>
              <Controller
                name='stocked_in'
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    title={
                      <div className={s.dropDown}>
                        <Icon variant='box-tick' size={24} />
                        Place of shipment
                        <span>
                          {value && value.length
                            ? value.join(', ')
                            : 'All countries'}
                        </span>
                      </div>
                    }
                  >
                    <CheckboxGroup
                      className={s.checkboxGroup}
                      value={value}
                      onChange={onChange}
                      options={stocked_in_Options || []}
                    />
                  </Dropdown>
                )}
              />
              <Controller
                name='delivery_to'
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    title={
                      <div className={s.dropDown}>
                        <Icon variant='delivery' size={24} />
                        Place of delivery
                        <span>
                          {value && value.length
                            ? value.join(', ')
                            : 'All countries'}
                        </span>
                      </div>
                    }
                  >
                    <CheckboxGroup
                      className={s.checkboxGroup}
                      value={value}
                      onChange={onChange}
                      options={delivery_to_Options || []}
                    />
                  </Dropdown>
                )}
              />
            </div>

            <div className={s.fieldsTable}>
              <InputLabel label='Type' className={s.label}>
                <Controller
                  name='type'
                  control={control}
                  render={({ field }) => (
                    <Select
                      isMulti
                      className={s.select}
                      {...field}
                      value={stringToOption(field.value)}
                      options={metaToOptions(category?.product_types)}
                      placeholder='All types'
                      ref={null}
                    />
                  )}
                />
              </InputLabel>
              <InputLabel label='Processing method' className={s.label}>
                <Controller
                  name='method'
                  control={control}
                  render={({ field }) => (
                    <Select
                      isMulti
                      className={s.select}
                      {...field}
                      value={stringToOption(field.value)}
                      options={metaToOptions(category?.processing_methods)}
                      placeholder='All methods'
                      ref={null}
                    />
                  )}
                />
              </InputLabel>
              <InputLabel label='MFR' className={s.label}>
                <Controller
                  name='mfr'
                  control={control}
                  render={({ field }) => (
                    <InputRange
                      {...field}
                      min={0}
                      max={100}
                      values={field.value}
                      className={s.inputRange}
                      ref={null}
                    />
                  )}
                />
              </InputLabel>
              <InputLabel label='Origin' className={s.label}>
                <Controller
                  name='origin'
                  control={control}
                  render={({ field }) => (
                    <Select
                      isMulti
                      isDisabled={!!params?.origin}
                      className={s.select}
                      {...field}
                      value={stringToOption(field.value)}
                      options={metaToOptions(category?.origin)}
                      placeholder='All countries'
                      ref={null}
                    />
                  )}
                />
              </InputLabel>
              <InputLabel label='Producer' className={s.label}>
                <Controller
                  name='producer'
                  control={control}
                  render={({ field }) => (
                    <Select
                      isMulti
                      isDisabled={!!params?.producer_id__in}
                      className={s.select}
                      {...field}
                      value={stringToOption(field.value)}
                      options={metaToOptions(category?.producers)}
                      placeholder='All producers'
                      ref={null}
                    />
                  )}
                />
              </InputLabel>
              <InputLabel label='Grade' className={s.label}>
                <Controller
                  name='name'
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      initValue={field.value || ''}
                      className={s.input}
                      placeholder={'All grades'}
                      ref={null}
                      disabled={!!params?.name}
                    />
                  )}
                />
              </InputLabel>
              <InputLabel label='Application' className={s.label}>
                <Controller
                  name='application'
                  control={control}
                  render={({ field }) => (
                    <Select
                      isMulti
                      className={s.select}
                      {...field}
                      value={stringToOption(field.value)}
                      options={metaToOptions(category?.applications)}
                      placeholder='All applications'
                      ref={null}
                    />
                  )}
                />
              </InputLabel>
            </div>

            <Button type='submit' variant={'secondary'} className={s.button}>
              Apply
            </Button>
          </form>
        </div>
      </Modal>
    </>
  )
}
