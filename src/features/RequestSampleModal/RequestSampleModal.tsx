import { FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import Image from 'next/image'

import { Button, Input, InputLabel, Select, Title } from 'components'
import { AdditionalField } from 'components/AdditionalField'

import { useAuth } from 'shared/hooks/useAuth'
import { Meta, SelectOption } from 'shared/types'
import { TraderBrief } from 'shared/types/products'
import { RequestSampleModalForm } from 'shared/types/requestProduct'
import { postRequestSample } from 'shared/api/routes/forms'
import { withDomain } from 'shared/helpers/convertLink'

import s from './RequestSampleModal.module.scss'

export interface RequestSampleModalProps {
  grade?: Meta
  trader: TraderBrief
  buyer_types: SelectOption[]
  onSubmit: (form: RequestSampleModalForm) => void
}

const RequestSampleModal: FC<RequestSampleModalProps> = ({
  trader,
  grade,
  buyer_types,
}) => {
  const { control, handleSubmit } = useForm<RequestSampleModalForm>()

  const { submit } = useAuth((form: RequestSampleModalForm) => {
    postRequestSample(form)
  })

  const onSubmit: SubmitHandler<RequestSampleModalForm> = (
    formdata: RequestSampleModalForm
  ) => {
    submit(formdata)
    console.log(formdata)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <Title className={s.title}>ASK FOR SAMPLE</Title>
      <div className={s.grid}>
        <InputLabel labelClassName={s.label} label='Grade'>
          <Input className={s.input} initValue={grade?.name} disabled />
        </InputLabel>
        <InputLabel labelClassName={s.label} label='Products produced'>
          <Controller
            name='products_produced'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                className={s.input}
                type='text'
                initValue={value}
                onChange={onChange}
              />
            )}
          />
        </InputLabel>
        <InputLabel labelClassName={s.label} label='Company name'>
          <Controller
            name='company_name'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                className={s.input}
                type='text'
                initValue={value}
                onChange={onChange}
              />
            )}
          />
        </InputLabel>
        <InputLabel labelClassName={s.label} label='Number of samples'>
          <Controller
            name='number_of_samples'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                className={s.input}
                type='number'
                // @ts-ignore
                initValue={value}
                onChange={onChange}
                placeholder='3'
              />
            )}
          />
        </InputLabel>
        <InputLabel labelClassName={s.label} label='Company address'>
          <Controller
            name='company_address'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                className={s.input}
                type='text'
                initValue={value}
                onChange={onChange}
                placeholder='Country, city, street, building, office'
              />
            )}
          />
        </InputLabel>
        <InputLabel labelClassName={s.label} label='Expected annual usage'>
          <Controller
            name='expected_annual_usage'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                className={s.input}
                type='text'
                placeholder=''
                initValue={value}
                onChange={onChange}
              />
            )}
          />
        </InputLabel>
        <InputLabel labelClassName={s.label} label='Type of buyer'>
          <Controller
            name='type_user'
            control={control}
            render={({ field: { onChange } }) => (
              <Select
                className={s.input}
                value={buyer_types.find(type => type.value)}
                options={buyer_types}
                placeholder=''
                onChange={onChange}
              />
            )}
          />
        </InputLabel>
        <InputLabel
          labelClassName={s.label}
          label='When do you plan to purchase'
        >
          <Controller
            name='purchase'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                className={s.input}
                type='text'
                placeholder=''
                initValue={value}
                onChange={onChange}
              />
            )}
          />
        </InputLabel>
      </div>
      <Controller
        name='addition_info'
        control={control}
        render={({ field: { onChange, value } }) => (
          <AdditionalField onChange={onChange} value={value} />
        )}
      />
      <div className={s.buttonBlock}>
        <Button className={s.button} type='submit'>
          SEND
        </Button>
        <span className={s.companyInfo}>to</span>
        <div className={s.logo}>
          <Image
            src={withDomain(trader.logo)}
            alt='logo'
            width={22}
            height={22}
          />
        </div>
        <span className={s.companyInfo}>{trader.name}</span>
      </div>
    </form>
  )
}

export default RequestSampleModal
