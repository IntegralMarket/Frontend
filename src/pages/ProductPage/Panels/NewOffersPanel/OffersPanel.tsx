import { FC, useEffect, useState } from 'react'

import { Calendar, Dropdown, Icon, Input, InputLabel, Select } from 'components'
import { RequestProductFormProps } from 'features'

import { TraderActionMenu } from '../../TraderActionMenu'
import { TraderOffersCard } from '../TraderOffersCard/TraderOffersCard'

import { Controller, useForm } from 'react-hook-form'

import { Offer } from 'shared/types/offer'

import { parseDate } from 'shared/helpers/parseDate'
import { differenceInWeeks } from 'date-fns'
import { SelectOption } from 'shared/types'
import { CategoryDetail } from 'shared/types/categories'
import { metaToOption, metaToOptions } from 'shared/helpers/select'

import s from '../BidsPanel/Bids.module.scss'
import cn from 'classnames'

import { useAppDispatch, useAppSelector } from 'shared/hooks'
import { toggleOfferCompare } from 'store/slices/compare'
import { GradeDetail } from 'shared/types/products'
import { getQuantity } from 'shared/helpers/transform'
import { getUnique } from 'shared/helpers/filter'

interface OffersPanelProps {
  filters: CategoryDetail
  offers: Offer[]
  grade: GradeDetail
  id: number // id of the offer from which we have navigated to the product page
}

interface OffersPanelsForm {
  place_of_shipment: SelectOption
  place_of_delivery: SelectOption
  incoterms: SelectOption
  lead_time: string
  quantity_min: string
  packing: SelectOption
  payment_terms: SelectOption
}

export const OffersPanel: FC<OffersPanelProps> = ({ filters, offers, grade, id }) => {
  const dispatch = useAppDispatch();
  // const isCompared = useAppSelector((state) => state.compare.comparedProducts.includes(id));
  const baseURL = typeof window !== 'undefined' ? window.location?.href : ''
  const offer = offers.find((item) => item.id === id) ?? offers[0]
  const availableDeliveryPlaces = offers.map((offer): SelectOption => ({ label: offer.place_of_delivery, value: offer.place_of_delivery }))
  const availableShipmentPlaces = getUnique(offers.reduce((prev, next: Offer) => {
    return [...prev, ...next.place_of_shipment]
  }, [] as string[])).map((place) => ({ label: place, value: place }))
  const { control, formState, watch } = useForm<OffersPanelsForm>({
    defaultValues: {
      quantity_min: getQuantity(offers[0].quantity_min, offers[0].quantity_max),
      packing: getDefaultValue(offer, 'packing'),
      incoterms: getDefaultValue(offer, 'incoterms'),
      lead_time: offer.lead_time,
      payment_terms: getDefaultValue(offer, 'terms_of_payments'),
      // @ts-ignore
      place_of_delivery: availableDeliveryPlaces.find((item) => item.label === offer.place_of_delivery),
      // @ts-ignore
      place_of_shipment: availableShipmentPlaces.find((item) => item.label === offer.place_of_shipment?.[0])
    }
  })
  const [buyForm, setBuyForm] = useState<RequestProductFormProps>({
    category: filters,
    trader: offer.trader,
    query: {},
    offer: { ...offer }
  })

  const [isShowIcon, setIsShowIcon] = useState(false)
  const showIcon = () => setIsShowIcon(true)


  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      let newValue: any;
      switch (name) {
        case 'quantity_min':
          newValue = Number(value.quantity_min)
          break;
        case 'place_of_delivery':
          newValue = availableDeliveryPlaces.find((item) => item.label === value.place_of_delivery)?.value ?? ''
          break;
        case 'lead_time':
          newValue = value.lead_time?.length ? differenceInWeeks(
            parseDate(value.lead_time[1]),
            parseDate(value.lead_time[0]),
            { roundingMethod: 'ceil' }
          ) : value.lead_time
          break;
        case 'place_of_shipment':
          newValue = availableShipmentPlaces.find((item) => item.label === value.place_of_shipment)?.value ?? ''
          break;
        case 'incoterms':
          newValue = filters['incoterms'].find((el) => el.id.toString() === value.incoterms)?.name ?? ''
          break;
        case 'payment_terms':
          newValue = filters['terms_of_payments'].find((el) => el.id.toString() === value.payment_terms)?.name ?? ''
          break;
        case 'packing':
          newValue = filters['packing'].find((el) => el.id.toString() === value.packing)?.name ?? ''
          break;
        default:
          break;
      }


      // @ts-ignore
      setBuyForm(prev => ({ ...prev, offer: { ...prev.offer, ...{ [name as string]: newValue } } }))
    });
    return () => subscription.unsubscribe();
  }, [watch]);
  useEffect(() => {
    if (formState.isDirty) showIcon()
  }, [formState.isDirty])
  useEffect(() => {
  }, [buyForm])
  function getDefaultValue(offerValue: Offer, filterKey: keyof CategoryDetail, offerKey?: keyof Offer): SelectOption {
    const offerOption = filters[filterKey]?.find((item) => item.name === offerValue[offerKey ?? filterKey as keyof Offer]);
    // @ts-ignore
    return metaToOption(offerOption ?? filters[filterKey]?.[0])
  }
  return (
    <div className={s.wrapper}>
      <div className={s.wrapperInputs}>
        <div className={s.inputs}>
          <InputLabel
            label='Place of shipment'
            labelClassName={s.label}
            className={s.inputLabel}
          >
            <Controller
              name='place_of_shipment'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  className={s.select}
                  value={value}
                  onChange={onChange}
                  options={availableShipmentPlaces}
                />
              )}
            />
          </InputLabel>
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
                  options={metaToOptions(filters.incoterms)}
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
                    <Calendar onChange={onChange} value={value} isMulti />
                  </div>
                </Dropdown>
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
                  initValue={offer.quantity_min?.toString() ?? ''}
                  placeholder={getQuantity(offer.quantity_min, offer.quantity_max)}
                  onChange={onChange}
                  type={'number'}
                />
              )}
            />
            <p className={s.labelQuantity}>{getQuantity(offer.quantity_min, offer.quantity_max, true)}</p>
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
                  options={metaToOptions(filters.packing)}
                />
              )
              }
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
                  options={metaToOptions(filters.terms_of_payments)}
                />
              )}
            />
          </InputLabel>
        </div>
      </div>
      <div>
        <TraderOffersCard
          isShowIcon={isShowIcon}
          showIcon={showIcon}
          data={{
            offer: offer,
            product: grade,
            sample: {
              grade: { name: offer.mark, id: offer.id },
              trader: offer.trader,
              buyer_types: metaToOptions(filters.buyers),
              onSubmit: form => { },
            },
            buy: buyForm,
          }}
          title='Price'
          location=''
          deadline={offer.offer_validity}
          price={offer.price}
        />
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
              onClick: () => dispatch(toggleOfferCompare(offer.id)),
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
