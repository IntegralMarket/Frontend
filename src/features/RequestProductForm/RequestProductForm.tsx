import { FC } from 'react'
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form'
import { differenceInWeeks } from 'date-fns'
import Image from 'next/image'

import cn from 'classnames'

import {
  Button,
  Calendar,
  Dropdown,
  Icon,
  Input,
  InputLabel,
  InputRange,
  Select,
  Title,
} from 'components'
import { AdditionalField } from 'components/AdditionalField'
import UploadDocumentButton from 'components/UploadDocument/UploadDocumentButton/UploadDocumentButton'

import { useAuth } from 'shared/hooks/useAuth'

import { postRequestBuy, postRequestQuote } from 'shared/api/routes/forms'
import { Meta, MFR } from 'shared/types'
import {
  RequestAskForQuoteForm,
  RequestBuyForm,
} from 'shared/types/requestProduct'
import { ProductFilterParams, TraderBrief } from 'shared/types/products'
import { CategoryDetail } from 'shared/types/categories'
import {
  metaToOptions,
  optionToString,
  stringToOption,
} from 'shared/helpers/select'
import { parseDate } from 'shared/helpers/parseDate'
import { withDomain } from 'shared/helpers/convertLink'
import { GRADES_LIMIT, MAIN_TYPES_LIMIT } from './utils'

import s from './RequestProductForm.module.scss'
import { mock_plan_to_purchase } from 'shared/mocks/mock_packing'
import { Offer } from 'shared/types/offer'

export interface RequestProductFormProps {
  category?: CategoryDetail | null
  offer?: Offer
  query?: Partial<ProductFilterParams>
  onClose?: () => void
  onCallbackSubmit?: (value: string) => void
  grade?: Meta // All the next props should be removed
  price?: number
  lead_time?: string
  trader?: TraderBrief
  incoterm?: string
  term_of_payment?: string
  packing?: string
  place_of_delivery?: string
  quantity?: string
}

export const RequestProductForm: FC<RequestProductFormProps> = ({
  category,
  offer,
  query,
  onClose,
  trader
}) => {
  const queryMFR = (): MFR => {
    const prepMFR = query?.mfr?.split('-')
    return prepMFR !== undefined
      ? [Number(prepMFR?.[0]), Number(prepMFR?.[1])]
      : [null, null]
  }

  const { control, handleSubmit } = useForm<
    RequestAskForQuoteForm | RequestBuyForm
  >({
    defaultValues: {
      grade: offer?.grade_id?.toString(),
      preferred_grades: [{ id: 0, name: '' }],
      place_of_delivery: offer?.place_of_delivery,
      quantity: offer?.quantity_min?.toString() ?? '',
      price: offer?.price ? Number(offer.price) : undefined,
      main_types: [
        {
          mfr_value_input: queryMFR(),
          product_type: query?.product_type_id__in?.split(', ') || null,
          processing_method:
            query?.processing_method_id__in?.split(', ') || null,
        },
      ],
      document: undefined,
      incoterms: category?.incoterms?.find(
        item => item.name === offer?.incoterms
      )?.id,
      terms_of_payment: category?.terms_of_payments?.find(
        item => item.name === offer?.payment_terms
      )?.id,
      lead_time: offer?.lead_time,
      additional_info: '',
      packing: category?.packing?.find(
        item => item.name === offer?.packing
      )?.id,
      when_do_you_plan_to_purchase: '',
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'preferred_grades',
  })

  const {
    fields: mainFields,
    append: mainAppend,
    remove: mainRemove,
  } = useFieldArray({
    control,
    name: 'main_types',
  })

  const { submit } = useAuth(
    (formData: RequestAskForQuoteForm | RequestBuyForm) => {
      const preparedForm = { ...formData, preferred_grades: formData?.preferred_grades?.map((grade) => typeof grade === 'string' ? grade : grade.name ?? grade).filter((grade) => Boolean(grade)).join(', ') } // TODO use helper
      offer
        ? postRequestBuy(preparedForm as RequestBuyForm)
        : postRequestQuote(preparedForm as RequestAskForQuoteForm)
      onClose?.()
    }
  )

  const onSubmit: SubmitHandler<
    RequestAskForQuoteForm | RequestBuyForm
  > = async formData => {
    submit(formData)
    //const postData: RequestProductPrePost = {
    //  ...formData,
    //  product_id: grade?.id,
    //  incoterms: formData.incoterms.length ? formData.incoterms.join(', ') : '',
    //  terms_of_payment: formData.terms_of_payment.length
    //    ? formData.terms_of_payment.join(', ')
    //    : '',
    //  delivery_period: Array.isArray(formData.delivery_period)
    //    ? formData.delivery_period.join(' - ')
    //    : formData.delivery_period,
    //}

    // const response = await postRequestProduct(formToPost(postData))
    // if (response.status === 200 || response.status === 201) {
    //   // onCallbackSubmit?.(formData.contacts['email']) // TODO wait auth modal
    // } // TODO wait API and auth modal
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      {offer ? (
        <Title className={s.title}>PURCHASE ORDER</Title>
      ) : (
        <Title className={s.title}>ASK FOR QUOTE</Title>
      )}

      <div className={s.grid}>
        {!offer &&
          mainFields.map((field, index) => (
            <div key={field.id} className={s.flex}>
              <InputLabel labelClassName={s.label} label='Type'>
                <Controller
                  name={`main_types.${index}.product_type`}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      isMulti
                      {...field}
                      className={s.select}
                      value={stringToOption(value)}
                      options={metaToOptions(category?.product_types)}
                      placeholder='All types'
                      onChange={onChange}
                      ref={null}
                    />
                  )}
                />
              </InputLabel>

              <InputLabel labelClassName={s.label} label='Processing method'>
                <Controller
                  name={`main_types.${index}.processing_method`}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      isMulti
                      {...field}
                      className={s.select}
                      value={stringToOption(value)}
                      options={metaToOptions(category?.processing_methods)}
                      placeholder='All methods'
                      onChange={onChange}
                      ref={null}
                    />
                  )}
                />
              </InputLabel>

              <InputLabel labelClassName={s.label} label='MFR'>
                <Controller
                  name={`main_types.${index}.mfr_value_input`}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <InputRange
                      className={s.inputRange}
                      min={0}
                      max={100}
                      values={value}
                      onChange={onChange}
                      ref={null}
                    />
                  )}
                />
              </InputLabel>
              {mainFields.length === 3 ? (
                <Button
                  onClick={() => mainRemove(index)}
                  type='button'
                  className={s.deleteBtn}
                >
                  <Icon size={20} variant='trash' className={s.icon} />
                </Button>
              ) : index !== 1 ? (
                <Button
                  className={s.addBtn}
                  onClick={() =>
                    mainAppend({
                      product_type: null,
                      processing_method: null,
                      mfr_value_input: [null, null],
                    })
                  }
                >
                  <Icon size={20} variant='add' className={s.icon} />
                </Button>
              ) : (
                <Button
                  onClick={() => mainRemove(index)}
                  type='button'
                  className={s.deleteBtn}
                >
                  <Icon size={20} variant='trash' className={s.icon} />
                </Button>
              )}
            </div>
          ))}

        <div className={s.flex}>
          {fields.map((field, index) => (
            <InputLabel
              key={field.id}
              labelClassName={s.label}
              label={offer ? 'Grade' : 'Preferred grades'}
            >
              <Controller
                name={`preferred_grades.${index}`}
                control={control}
                render={({ field: { onChange, value } }) => {
                  const initValue =
                    typeof value === 'string' ? value : value.name.toString()
                  return (
                    <Input
                      className={s.input}
                      initValue={offer ? offer.mark : initValue}
                      onChange={onChange}
                      placeholder='Grade'
                    />
                  )
                }}
              />
            </InputLabel>
          ))}
          <div className={s.buttons}>
            {fields.length > 1 ? (
              <>
                {fields.length <= GRADES_LIMIT && (
                  <Button
                    onClick={() => append({ id: 0, name: '' })}
                    type='button'
                    className={s.deleteBtn}
                  >
                    <Icon size={20} variant='add' className={s.icon} />
                  </Button>
                )}
                <Button
                  onClick={() => remove(0)}
                  type='button'
                  className={s.deleteBtn}
                >
                  <Icon size={20} variant='trash' className={s.icon} />
                </Button>
              </>
            ) : (
              <Button
                onClick={() => append({ id: 0, name: '' })}
                type='button'
                className={s.addBtn}
              >
                <Icon size={20} variant='add' className={s.icon} />
              </Button>
            )}
            <Controller
              name='document'
              control={control}
              render={({ field: { onChange, value } }) => (
                <UploadDocumentButton onChange={onChange} value={value} />
              )}
            />
          </div>
        </div>

        {offer && (
          <div className={s.flex}>
            <InputLabel labelClassName={s.label} label='Price ($)'>
              <Controller
                name='price'
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    className={cn(s.input, s.longItem)}
                    initValue={value?.toString()}
                    onChange={onChange}
                    placeholder='1000'
                  />
                )}
              />
            </InputLabel>
          </div>
        )}
        <div className={s.flex}>
          <InputLabel labelClassName={s.label} label='Place of delivery'>
            <Controller
              name='place_of_delivery'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  className={cn(s.input, s.longItem)}
                  initValue={value}
                  onChange={onChange}
                  placeholder='Country, city, port'
                />
              )}
            />
          </InputLabel>

          <InputLabel labelClassName={s.label} label='Quantity (MT)'>
            <Controller
              name='quantity'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  className={s.input}
                  initValue={value}
                  onChange={onChange}
                  placeholder='5000 e.g.'
                />
              )}
            />
          </InputLabel>
        </div>

        <div className={s.flex}>
          <InputLabel labelClassName={s.label} label='Incoterms'>
            <Controller
              name='incoterms'
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  className={s.select}
                  value={metaToOptions(category?.incoterms).find(
                    item => item.label === offer?.incoterms
                  )}
                  onChange={onChange}
                  options={metaToOptions(category?.incoterms)}
                />
              )}
            />
          </InputLabel>

          <InputLabel labelClassName={s.label} label='Lead time'>
            <Controller
              name='lead_time'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Dropdown
                  className={s.select}
                  noArrow
                  isHollow
                  title={
                    <div className={s.calendar}>
                      <Icon variant='calendar' size={20} />
                      <span className={s.date}>
                        {value?.length ? (
                          <>
                            {differenceInWeeks(
                              parseDate(value[1]),
                              parseDate(value[0]),
                              { roundingMethod: 'ceil' }
                            )}
                            {' '}weeks
                          </>
                        ) : (
                          <>{value ? `${value} weeks` : 'Not selected'}</>
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

          <InputLabel labelClassName={s.label} label='Terms of payment'>
            <Controller
              name='terms_of_payment'
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  className={s.select}
                  value={metaToOptions(category?.terms_of_payments).find(
                    term => term.label === offer?.payment_terms
                  )}
                  onChange={onChange}
                  options={metaToOptions(category?.terms_of_payments)}
                />
              )}
            />
          </InputLabel>
        </div>
        <div className={s.flex}>
          <InputLabel labelClassName={s.label} label='Packing'>
            <Controller
              name='packing'
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  className={s.select}
                  value={metaToOptions(category?.packing).find(
                    pack => pack.label === offer?.packing
                  )}
                  onChange={onChange}
                  options={metaToOptions(category?.packing)}
                  placeholder='All packing'
                />
              )}
            />
          </InputLabel>

          <InputLabel
            labelClassName={s.label}
            label='When do you plan to purchase?'
          >
            <Controller
              name='when_do_you_plan_to_purchase'
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  className={cn(s.select, s.longItem)}
                  value={mock_plan_to_purchase.find(p => p.value)}
                  onChange={onChange}
                  options={mock_plan_to_purchase}
                  placeholder='1-3 months'
                />
              )}
            />
          </InputLabel>
        </div>
      </div>

      <div className={cn(s.footer, offer && s.footerGrade)}>
        <Controller
          name='additional_info'
          control={control}
          render={({ field: { onChange, value } }) => (
            <AdditionalField onChange={onChange} value={value || ''} />
          )}
        />
        <div className={s.buttonBlock}>
          <Button type='submit' variant={'secondary'} className={s.button}>
            SEND
          </Button>

          {!offer && !trader ? (
            <p className={s.tradersInfo}>
              to{' '}
              <span className={s.number}>
                {category?.traders?.length || 'all'}
              </span>{' '}
              traders offering commodity meeting you requirements
            </p>
          ) : (
            <div className={s.buttonBlock}>
              <span>to</span>
              <div className={s.logo}>
                {(offer?.trader || trader) && (
                  <Image
                    src={withDomain(offer?.trader?.logo ?? trader?.logo)}
                    alt='logo'
                    width={22}
                    height={22}
                  />
                )}
              </div>
              <span>{offer?.trader?.name ?? trader?.name}</span>
            </div>
          )}
        </div>
      </div>
    </form>
  )
}
