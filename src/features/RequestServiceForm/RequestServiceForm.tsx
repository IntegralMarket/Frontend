import { FC, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import cn from 'classnames'

import {
  Button,
  Calendar,
  CheckboxGroup,
  Dropdown,
  Icon,
  Input,
  InputLabel,
  Select,
  Title,
} from 'components'

import { RequestService } from 'shared/types/requestService'
// import { metaToOptions, stringToOption } from 'shared/helpers/select'
import { capitalize } from 'shared/helpers/capitalize'
import { isEmailValid, isPhoneValid } from 'shared/helpers/validate'
import { associatedList } from 'shared/mocks/radiogroup'

import s from './RequestServiceForm.module.scss'
import { postRequestSpQuote } from 'shared/api/routes/forms'

interface RequestServiceFormProps { }

const requestServiceInitial: RequestService = {
  product: '',
  packing: null,
  product_weight: '',
  delivery_from: null,
  delivery_to: null,
  ready_to_load: '',
  addition_information: '',
  associated: [],
  name: '',
  contacts: {
    email: '',
    phone: '',
    telegram: '',
    whatsapp: '',
  },
}

//TODO!!! Add styles and missing fields

export const RequestServiceForm: FC<RequestServiceFormProps> = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<RequestService>({
    defaultValues: requestServiceInitial,
  })

  const onSubmit: SubmitHandler<RequestService> = async formData => {
    console.log(formData)
    // @ts-ignore
    postRequestSpQuote(formData)
  }

  const contacts = getValues('contacts')
  const [activeInput, setActiveInput] =
    useState<keyof RequestService['contacts']>('email')
  const handleActiveInput = (field: keyof RequestService['contacts']) => {
    setActiveInput(field)
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <Title className={s.title}>Ask for Quote</Title>
      <div className={s.grid}>
        <InputLabel className={cn(s.label, s.longItem)} label='Product'>
          <Controller
            name='product'
            control={control}
            rules={{ required: 'Product is required' }}
            render={({ field: { onChange, value } }) => (
              <Input
                className={cn(s.input, {
                  [s.errorInput]: errors.product,
                })}
                initValue={value}
                onChange={onChange}
                placeholder='Enter commodity type or HS code'
              />
            )}
          />
          {errors.product && (
            <span className={s.error}>
              <Icon variant='error' className={s.errorIcon} />
              <p>{errors.product.message}</p>
            </span>
          )}
        </InputLabel>
        <InputLabel className={s.label} label='Packing'>
          <Controller
            name='packing'
            control={control}
            // rules={{ required: 'Packing is required' }}
            render={({ field }) => (
              <Select
                isMulti
                {...field}
                className={s.select}
                value={null}
                options={[]}
                placeholder='Not selected'
                ref={null}
              />
            )}
          />
          {errors.packing && (
            <span className={s.error}>{errors.packing.message}</span>
          )}
        </InputLabel>

        <InputLabel className={s.label} label='Product weight (kg)'>
          <Controller
            name='product_weight'
            control={control}
            rules={{ required: 'Product weight is required' }}
            render={({ field: { onChange, value } }) => (
              <Input
                className={cn(s.input, {
                  [s.errorInput]: errors.product_weight,
                })}
                initValue={value}
                type='number'
                onChange={onChange}
                placeholder='10 000'
              />
            )}
          />
          {errors.product_weight && (
            <span className={s.error}>
              <Icon variant='error' className={s.errorIcon} />
              <p>{errors.product_weight.message}</p>
            </span>
          )}
        </InputLabel>
        <InputLabel className={s.label} label='From'>
          <Controller
            name='delivery_from'
            control={control}
            // rules={{ required: 'Shipping port is required' }}
            render={({ field }) => (
              <Select
                isMulti
                {...field}
                className={s.select}
                value={null}
                options={[]}
                placeholder='City, port'
                ref={null}
              />
            )}
          />
          {errors.delivery_from && (
            <span className={s.error}>{errors.delivery_from.message}</span>
          )}
        </InputLabel>

        <InputLabel className={s.label} label='To'>
          <Controller
            name='delivery_to'
            control={control}
            // rules={{ required: 'Delivery port is required' }}
            render={({ field }) => (
              <Select
                isMulti
                {...field}
                className={s.select}
                value={null}
                options={[]}
                placeholder='City, port'
                ref={null}
              />
            )}
          />
          {errors.delivery_to && (
            <span className={s.error}>{errors.delivery_to.message}</span>
          )}
        </InputLabel>

        <InputLabel className={s.label} label='Ready to Load'>
          <Controller
            name='ready_to_load'
            control={control}
            rules={{ required: 'Ready to Load time is required' }}
            render={({ field: { onChange, value } }) => (
              <Dropdown
                className={s.calendar}
                titleClassName={s.inputCalendar}
                isHollow
                title={
                  <>
                    <Icon variant='calendar' size={20} />
                    {value ? (
                      <span className={s.value}>{value}</span>
                    ) : (
                      <span className={s.placeholder}>Not selected</span>
                    )}
                  </>
                }
              >
                <div>
                  <Calendar onChange={onChange} value={value} />
                </div>
              </Dropdown>
            )}
          />
          {errors.ready_to_load && (
            <span className={s.error}>{errors.ready_to_load.message}</span>
          )}
        </InputLabel>

        <InputLabel
          className={cn(s.label, s.longItem)}
          label='Additional information'
        >
          <Controller
            name='addition_information'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                className={s.input}
                initValue={value}
                onChange={onChange}
                placeholder='Company name, other requirements'
              />
            )}
          />
        </InputLabel>

        <InputLabel
          className={cn(s.label, s.longItem, s.associated)}
          label='Accociated service'
        >
          <Controller
            name='associated'
            control={control}
            rules={{ required: 'At least one Service is required' }}
            render={({ field: { onChange, value } }) => (
              <CheckboxGroup
                value={value}
                onChange={onChange}
                options={associatedList}
                orientation='row'
              />
            )}
          />
          {errors.associated && (
            <span className={s.error}>{errors.associated.message}</span>
          )}
        </InputLabel>

        <InputLabel className={s.label} label='Name'>
          <Controller
            name='name'
            control={control}
            rules={{ required: 'Name is required' }}
            render={({ field: { onChange, value } }) => (
              <Input
                className={cn(s.input, {
                  [s.errorInput]: errors.name,
                })}
                initValue={value}
                onChange={onChange}
                placeholder='John Smith'
              />
            )}
          />
          {errors.name && (
            <span className={s.error}>
              <Icon variant='error' className={s.errorIcon} />
              <p>{errors.name.message}</p>
            </span>
          )}
        </InputLabel>

        <div className={s.contactsWrapper}>
          <InputLabel className={s.label} label={capitalize(activeInput)}>
            <Controller
              name={`contacts.email`}
              control={control}
              rules={{
                required: 'Email is required',
                validate: value => isEmailValid(value) || 'Enter a valid email',
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  className={cn(s.input, {
                    [s.hidden]: activeInput !== 'email',
                  })}
                  initValue={value}
                  onChange={onChange}
                  placeholder='Work email address'
                  required
                />
              )}
            />
            <Controller
              name={`contacts.phone`}
              control={control}
              rules={{
                validate: value => isPhoneValid(value) || 'Enter a valid phone',
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  className={cn(s.input, {
                    [s.hidden]: activeInput !== 'phone',
                  })}
                  initValue={value}
                  placeholder='Phone'
                  onChange={onChange}
                />
              )}
            />
            <Controller
              name={`contacts.telegram`}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  className={cn(s.input, {
                    [s.hidden]: activeInput !== 'telegram',
                  })}
                  initValue={value}
                  placeholder='Telegram'
                  onChange={onChange}
                />
              )}
            />
            <Controller
              name={`contacts.whatsapp`}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  className={cn(s.input, {
                    [s.hidden]: activeInput !== 'whatsapp',
                  })}
                  initValue={value}
                  placeholder='Whatsapp'
                  onChange={onChange}
                />
              )}
            />
            {errors.contacts?.email && (
              <span className={s.error}>{errors.contacts.email.message}</span>
            )}
            {errors.contacts?.phone && (
              <span className={s.error}>{errors.contacts.phone.message}</span>
            )}
          </InputLabel>

          <div className={s.contacts}>
            <div
              className={cn(s.icon, s.iconEmail, {
                [s.active]: contacts['email'] !== '' || activeInput === 'email',
              })}
              onClick={() => {
                handleActiveInput('email')
              }}
            >
              <Icon variant='email' size={24} />
            </div>
            <div
              className={cn(s.icon, s.iconPhone, {
                [s.active]: contacts.phone !== '' || activeInput === 'phone',
              })}
              onClick={() => {
                handleActiveInput('phone')
              }}
            >
              <Icon variant='phone' size={24} />
            </div>
            <div
              className={cn(s.icon, s.iconTelegram, {
                [s.active]:
                  contacts.telegram !== '' || activeInput === 'telegram',
              })}
              onClick={() => {
                handleActiveInput('telegram')
              }}
            >
              <Icon variant='telegram' size={24} />
            </div>
            <div
              className={cn(s.icon, s.iconWhatsapp, {
                [s.active]:
                  contacts.whatsapp !== '' || activeInput === 'whatsapp',
              })}
              onClick={() => {
                handleActiveInput('whatsapp')
              }}
            >
              <Icon variant='whatsapp' size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className={s.footer}>
        <Button className={s.sendButton} type='submit'>
          Send
        </Button>

        <p className={s.agreementInfo}>
          By clicking Send, you agree with our{' '}
          <a className={s.link}>Terms &amp;&nbsp;conditions</a>
        </p>
      </div>
    </form>
  )
}
