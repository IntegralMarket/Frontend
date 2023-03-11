import { FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { differenceInWeeks } from 'date-fns'
import cn from 'classnames'

import {
  Button,
  Calendar,
  Dropdown,
  Icon,
  Input,
  InputLabel,
  Select,
  Title,
} from 'components'
import UploadDocumentButton from 'components/UploadDocument/UploadDocumentButton/UploadDocumentButton'
import { AdditionalField } from 'components/AdditionalField'

import { useAuth } from 'shared/hooks/useAuth'
import { SelectOption } from 'shared/types'
import { CategoryDetail } from 'shared/types/categories'
import { RequestQuoteProduct } from 'shared/types/requestProduct'
import { postRequestSpQuote } from 'shared/api/routes/forms'
import { parseDate } from 'shared/helpers/parseDate'
import { metaToOption, metaToOptions } from 'shared/helpers/select'

import s from './AskForQuoteModal.module.scss'

interface AskForQuoteModalProps {
  services?: SelectOption[]
  category?: CategoryDetail | null
  packing?: SelectOption[] | number
  country?: SelectOption[] | string
  onCallbackSubmit?: (value: string) => void
  onClose?: () => void
}

export const AskForQuoteModal: FC<AskForQuoteModalProps> = ({
  services,
  category,
  onCallbackSubmit,
  onClose,
  country,
  packing,
}) => {
  const { control, handleSubmit } = useForm<RequestQuoteProduct>({
    defaultValues: {
      document: undefined,
      type_of_service: '',
      country: '',
      packing: 0,
      product: '',
      product_weight: undefined,
      city_from: '',
      city_to: '',
      ready_to_load: '',
      // @ts-ignore
      additional_service_required: {
        values: 'f',
      },

      addition_info: '',
    },
  })

  const { submit } = useAuth((form: RequestQuoteProduct) => {
    postRequestSpQuote(form)
    onClose?.()
  })

  const onSubmit: SubmitHandler<RequestQuoteProduct> = async formData => {
    submit(formData)
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <Title className={s.title}>ASK FOR QUOTE</Title>
      <div className={s.grid}>
        <div className={s.flex}>
          <InputLabel labelClassName={s.label} label='Type os service'>
            <Controller
              name='type_of_service'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  className={s.input}
                  initValue={value}
                  onChange={onChange}
                  placeholder='Transportation'
                />
              )}
            />
          </InputLabel>
          <InputLabel labelClassName={s.label} label='Country'>
            <Controller
              name='country'
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  className={s.select}
                  value={metaToOptions(category?.delivery_to).find(
                    item => item.value === country
                  )}
                  onChange={onChange}
                  options={metaToOptions(category?.delivery_to)}
                />
              )}
            />
          </InputLabel>
        </div>
        <div className={s.border}></div>
        <div className={s.flex}>
          <InputLabel labelClassName={s.label} label='Product'>
            <Controller
              name='product'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  className={cn(s.input, s.longItem)}
                  initValue={value}
                  onChange={onChange}
                  placeholder='Enter commodity type or HS code '
                />
              )}
            />
          </InputLabel>
          <div className={s.buttons}>
            <Controller
              name='document'
              control={control}
              render={({ field: { onChange, value } }) => (
                <UploadDocumentButton onChange={onChange} value={value} />
              )}
            />
          </div>
        </div>

        <div className={s.flex}>
          <div className={s.flex}>
            <InputLabel labelClassName={s.label} label='Packing'>
              <Controller
                name='packing'
                control={control}
                render={({ field: { onChange } }) => (
                  <Select
                    className={s.select}
                    value={metaToOption(
                      category?.packing.find(pack => pack.id === packing)
                    )}
                    onChange={onChange}
                    options={metaToOptions(category?.packing)}
                  />
                )}
              />
            </InputLabel>
            <InputLabel labelClassName={s.label} label='Product weight (kg)'>
              <Controller
                name='product_weight'
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    className={s.input}
                    initValue={value?.toString()}
                    onChange={onChange}
                    placeholder='10000'
                  />
                )}
              />
            </InputLabel>
          </div>
        </div>
        <div className={s.flex}>
          <InputLabel labelClassName={s.label} label='From'>
            <Controller
              name='city_from'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  className={s.input}
                  initValue={value}
                  onChange={onChange}
                  placeholder='City, port'
                />
              )}
            />
          </InputLabel>
          <InputLabel labelClassName={s.label} label='To'>
            <Controller
              name='city_to'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  className={s.input}
                  initValue={value}
                  onChange={onChange}
                  placeholder='City, port'
                />
              )}
            />
          </InputLabel>
          <InputLabel labelClassName={s.label} label='Ready to load'>
            <Controller
              name='ready_to_load'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Dropdown
                  className={(s.select, s.input)}
                  noArrow
                  isHollow
                  title={
                    <div className={s.calendar}>
                      <Icon variant='calendar' size={20} />
                      <span className={s.date}>
                        {value ? (
                          <>
                            {differenceInWeeks(
                              parseDate(value[1]),
                              parseDate(value[0]),
                              { roundingMethod: 'ceil' }
                            )}{' '}
                            weeks
                          </>
                        ) : (
                          <>Not selected</>
                        )}
                      </span>
                    </div>
                  }
                >
                  <div>
                    <Calendar onChange={onChange} value={value} isMulti />
                  </div>
                </Dropdown>
              )}
            />
          </InputLabel>
        </div>
        <div className={s.additionalField}>
          <Controller
            name='addition_info'
            control={control}
            render={({ field: { onChange, value } }) => (
              <AdditionalField onChange={onChange} value={value} />
            )}
          />
        </div>
        <div className={s.flex}>
          <InputLabel
            labelClassName={s.label}
            label='Additional service required'
          >
            <Controller
              name='additional_service_required'
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  className={s.select}
                  value={services?.find(s => s.value)}
                  onChange={onChange}
                  options={services ?? []}
                />
              )}
            />
          </InputLabel>
        </div>

        <div className={s.addition}>
          <div className={s.buttonBlock}>
            <Button type='submit' variant={'secondary'} className={s.button}>
              SEND
            </Button>

            <p className={s.tradersInfo}>
              to{' '}
              <span className={s.number}>
                {category?.traders?.length || 'all'}
              </span>{' '}
              companies offering services meeting you requirements
            </p>
          </div>
        </div>
      </div>
    </form>
  )
}
