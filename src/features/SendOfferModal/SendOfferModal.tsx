import { FC } from 'react'
import { differenceInWeeks } from 'date-fns'
import { Controller, useForm } from 'react-hook-form'
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
import { AdditionalField } from 'components/AdditionalField'
import UploadDocumentButton from 'components/UploadDocument/UploadDocumentButton/UploadDocumentButton'

import { RequestSendOfferModalForm } from 'shared/types/requestProduct'
import { parseDate } from 'shared/helpers/parseDate'
import { useAuth } from 'shared/hooks/useAuth'
import { postRequestSendOffer } from 'shared/api/routes/forms'
import { metaToOptions } from 'shared/helpers/select'
import { CategoryDetail } from 'shared/types/categories'

import s from './SendOfferModal.module.scss'
import { Bid } from 'shared/types/bid'

export interface SendOfferModalProps {
  category: CategoryDetail | null
  buyers: number
  bid?: Bid
  buyer?: string
}

export const SendOfferModal: FC<Partial<SendOfferModalProps>> = ({
  bid,
  category,
  buyers,
  buyer,
}) => {
  const {
    price,
    quantity_min,
    place_of_delivery,
    grade,
    mark,
    lead_time,
    incoterms,
    payment_terms,
    author,
  } = bid ?? {}
  const { control, handleSubmit } = useForm<RequestSendOfferModalForm>({
    defaultValues: {
      grade: mark,
      quantity: quantity_min?.toString(),
      place_of_delivery: place_of_delivery,
      price: price ? Number(price) : undefined,
      addition_info: '',
      // @ts-ignore
      incoterms: metaToOptions(category?.incoterms).find(
        item => item.label === incoterms?.toString()
      )?.label,
      lead_time: lead_time,
      // @ts-ignore
      terms_of_payment: metaToOptions(category?.terms_of_payments).find(
        item => item.label === payment_terms?.toString()
      )?.value,
      document: undefined,
    },
  })

  const { submit } = useAuth((formdata: RequestSendOfferModalForm) => {
    postRequestSendOffer(formdata)
  })

  const onSubmit = (data: RequestSendOfferModalForm) => {
    submit(data)
  }
  return (
    <div className={s.wrapper}>
      <Title className={s.title}>SEND OFFER</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.flexColumn}>
          <div className={s.flex}>
            <InputLabel labelClassName={s.label} label='Grade'>
              <Controller
                name='grade'
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    className={s.input}
                    initValue={value}
                    onChange={onChange}
                    placeholder='Enter commodity type or HS code '
                  />
                )}
              />
            </InputLabel>
            <div className={s.uploadDocsIcon}>
              <Controller
                name='document'
                control={control}
                render={({ field: { onChange, value } }) => (
                  <UploadDocumentButton onChange={onChange} value={value} />
                )}
              />
            </div>
          </div>
          <InputLabel labelClassName={s.label} label='Price ($)'>
            <Controller
              name='price'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  className={s.input}
                  initValue={value?.toString()}
                  placeholder='1000'
                  onChange={onChange}
                />
              )}
            />
          </InputLabel>
          <div className={s.flex}>
            <InputLabel labelClassName={s.label} label='Place of delivery'>
              <Controller
                name='place_of_delivery'
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    className={cn(s.input, s.longItem)}
                    initValue={value}
                    placeholder='Country, city, port'
                    onChange={onChange}
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
                    placeholder='5000 e.g.'
                    onChange={onChange}
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
                render={({ field: { onChange, value } }) => (
                  <Select
                    isClearable={false}
                    className={s.select}
                    onChange={onChange}
                    value={metaToOptions(category?.incoterms).find(
                      item => item.label === value?.toString()
                    )}
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
                              )}{' '}
                              weeks
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
                render={({ field: { onChange, value } }) => (
                  <Select
                    isClearable={false}
                    className={s.select}
                    value={metaToOptions(category?.terms_of_payments).find(
                      item => item.value === value?.toString()
                    )}
                    onChange={onChange}
                    options={metaToOptions(category?.terms_of_payments)}
                  />
                )}
              />
            </InputLabel>
          </div>
        </div>
        <div className={s.addition}>
          <Controller
            name='addition_info'
            control={control}
            render={({ field: { onChange, value } }) => (
              <AdditionalField onChange={onChange} value={value || ''} />
            )}
          />
        </div>
        <div className={s.buttonBlock}>
          <Button type='submit' variant={'secondary'} className={s.button}>
            SEND
          </Button>
          {!author && !buyer ? (
            <p className={s.tradersInfo}>
              to <span className={s.number}>{buyers ?? 'all'}</span>{' '}
              {buyers === 1 ? 'buyer' : 'buyers'} searching for commodity you
              offer
            </p>
          ) : (
            <div className={s.buttonBlock}>
              <span>to&nbsp;</span>
              {/* <div className={s.logo}>
                {bid?.author.logo && <Image
                  src={withDomain(bid?.author?.logo)}
                  alt='logo'
                  width={22}
                  height={22}
                />}
              </div> */}
              <span>{buyer ?? bid?.author?.name}</span>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}
