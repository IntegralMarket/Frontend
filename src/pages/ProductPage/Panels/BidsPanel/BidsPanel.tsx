import { FC, useEffect, useState } from 'react'
import cn from 'classnames'

import { Calendar, Dropdown, Icon, Input, InputLabel, Select } from 'components'

import { TraderActionMenu } from '../../TraderActionMenu'
import { TraderBidsCard } from '../TraderBidsCard/TraderBidsCard'

import { Controller, useForm } from 'react-hook-form'

import { Bid } from 'shared/types/bid'
import { CategoryDetail } from 'shared/types/categories'
import { metaToOption, metaToOptions } from 'shared/helpers/select'
import { SendOfferModalProps } from 'features'

import s from './Bids.module.scss'
import { getQuantity } from 'shared/helpers/transform'
import { SelectOption } from 'shared/types'
import { differenceInWeeks } from 'date-fns'
import { parseDate } from 'shared/helpers/parseDate'
import { toggleBidCompare } from 'store/slices/compare'
import { useAppDispatch } from 'shared/hooks'

interface BidsPanelProps {
  filters: CategoryDetail
  bid: Bid[]
  id: number
}

export const BidsPanel: FC<BidsPanelProps> = ({ filters, bid, id }) => {
  const baseURL = typeof window !== 'undefined' ? window.location.href : ''
  const currentBid = bid.find(item => item.id === id) ?? bid[0]
  const dispatch = useAppDispatch();
  const availableDeliveryPlaces = bid.map((item): SelectOption => ({ label: item.place_of_delivery, value: item.place_of_delivery }))
  // TODO should be shared helper availableDeliveryPlaces
  const { control, watch } = useForm({
    defaultValues: {
      buyers: [],
      grade: currentBid.mark,
      quantity_min: getQuantity(currentBid.quantity_min, currentBid.quantity_max),
      price: currentBid.price,
      addition_info: '',
      category: filters,
      lead_time: currentBid.lead_time,
      packing: getDefaultValue(currentBid, 'packing'),
      incoterms: getDefaultValue(currentBid, 'incoterms'),
      payment_terms: getDefaultValue(
        currentBid,
        'terms_of_payments',
        'payment_terms'
      ),
      place_of_delivery: availableDeliveryPlaces.find((item) => item.label === currentBid.place_of_delivery),
    },
  })
  const [data, setData] = useState<SendOfferModalProps>({
    buyers: 1,
    category: filters,
    bid: {
      // @ts-ignore
      grade: currentBid?.grade,
      mark: currentBid?.mark,
      // @ts-ignore
      quantity_min: getQuantity(currentBid.quantity_min, currentBid.quantity_max),
      price: currentBid.price,
      addition_info: '',
      lead_time: currentBid?.lead_time,
      // @ts-ignore
      packing: getDefaultValue(currentBid, 'packing'),
      // @ts-ignore
      incoterms: getDefaultValue(currentBid, 'incoterms')?.label,
      // @ts-ignore
      payment_terms: getDefaultValue(currentBid, 'terms_of_payments', 'payment_terms').label,
      place_of_delivery: availableDeliveryPlaces.find((item) => item.label === currentBid.place_of_delivery)?.label ?? '',
      author: currentBid.author
    }
  })

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      // @ts-ignore
      setData(prev => ({ ...prev, [name as string]: value[`${name}`] }))
    })

    return () => subscription.unsubscribe()
  }, [watch])
  function getDefaultValue(
    offerValue: Bid,
    filterKey: keyof CategoryDetail,
    offerKey?: keyof Bid
  ): SelectOption {
    const offerOption = filters[filterKey]?.find(
      item => item.name === offerValue[offerKey ?? (filterKey as keyof Bid)]
    )

    // @ts-ignore
    return metaToOption(offerOption ?? filters[filterKey]?.[0])
  }
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      let newValue: any
      switch (name) {
        case 'quantity_min':
          newValue = Number(value.quantity_min)
          break;
        case 'lead_time':
          newValue = value.lead_time?.length ? differenceInWeeks(
            parseDate(value.lead_time[1]),
            parseDate(value.lead_time[0]),
            { roundingMethod: 'ceil' }
          ) : value.lead_time
          break;
        case 'place_of_delivery':
          newValue = availableDeliveryPlaces.find((el) => el.label === value.place_of_delivery)?.label ?? ''
          break;
        case 'incoterms':
          newValue = filters['incoterms'].find((el) => el.id.toString() === value.incoterms)?.name ?? ''
          break;
        case 'payment_terms':
          newValue =
            filters.terms_of_payments.find(
              el => el.id.toString() === value.payment_terms
            )?.name ?? ''
          break
        case 'packing':
          newValue =
            filters['packing'].find(el => el.id.toString() === value.packing)
              ?.name ?? ''
          break
        default:
          break
      }


      // @ts-ignore
      setData(prev => ({ ...prev, bid: { ...prev.bid, ...{ [name as string]: newValue } } }))
    });
    return () => subscription.unsubscribe();
  }, [watch]);
  return (
    <div className={s.wrapper}>
      <div className={s.wrapperInputs}>
        <p className={s.title}>Bids</p>
        <p className={s.deadline}>
          Deadline to offer <span>{bid[0].deadline_of_rfp}</span>
        </p>
        <div className={s.inputs}>
          <InputLabel
            label='Place of delivery'
            labelClassName={s.label}
            className={s.inputLabel}
          >
            <Controller
              name='place_of_delivery'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  className={s.select}
                  value={value}
                  onChange={onChange}
                  options={availableDeliveryPlaces}
                />
              )}
            />
          </InputLabel>
          <InputLabel
            label='Incoterms'
            labelClassName={s.label}
            className={s.inputLabel}
          >
            <Controller
              name='incoterms'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  className={s.select}
                  value={value}
                  onChange={onChange}
                  options={metaToOptions(filters?.incoterms)}
                />
              )}
            />
          </InputLabel>
          <InputLabel
            label='Quantity (MT)'
            labelClassName={s.label}
            className={s.inputLabel}
          >
            <Controller
              name='quantity_min'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  className={s.input}
                  initValue={value}
                  onChange={onChange}
                />
              )}
            />
            <p className={s.labelQuantity}>
              {getQuantity(bid[0].quantity_min, bid[0].quantity_max, true)}
            </p>
          </InputLabel>
          <InputLabel
            label='Packing'
            labelClassName={s.label}
            className={s.inputLabel}
          >
            <Controller
              name='packing'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  className={s.select}
                  value={value}
                  onChange={onChange}
                  options={metaToOptions(filters?.packing)}
                />
              )}
            />
          </InputLabel>
          <InputLabel
            label='Terms of payment'
            labelClassName={s.label}
            className={s.inputLabel}
          >
            <Controller
              name='payment_terms'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  className={s.select}
                  value={value}
                  onChange={onChange}
                  options={metaToOptions(filters?.terms_of_payments)}
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
                  className={cn(s.select, s.input)}
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
                    {/* @ts-ignore */}
                    <Calendar onChange={onChange} value={value} isMulti />
                  </div>
                </Dropdown>
              )}
            />
          </InputLabel>
        </div>
      </div>

      <div>
        <TraderBidsCard bid={bid[0]} title='Current tender' data={data} />
        <TraderActionMenu
          menu={[
            {
              item: {
                text: 'Add to favourite',
                id: 1,
                active: false,
                icon: 'heart',
              },
              onClick: () => { },
            },
            {
              item: {
                text: 'Add to compare',
                id: 2,
                active: true,
                icon: 'compare',
              },
              onClick: () => dispatch(toggleBidCompare(bid[0]?.id)),
            },
            {
              item: {
                text: 'Share',
                id: 3,
                active: true,
                icon: 'share',
              },
              onClick: () => {
                navigator.clipboard.writeText(`${baseURL}`).then(function (x) {
                  alert('copied')
                })
              },
              // onClick: () => console.log(`${baseURL}`),
            },
          ]}
        />
      </div>
    </div>
  )
}
