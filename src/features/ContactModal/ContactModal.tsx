import { FC, useState } from 'react'
import Image from 'next/image'

import { Button, Icon, Input, InputLabel, Modal, ModalProps } from 'components'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import CheckMark from '/public/images/icon-checkmark.svg'
import { AuthState, setAuth } from 'store/slices/auth'
import { useAppDispatch } from 'shared/hooks'

import s from './ContactModal.module.scss'
import cn from 'classnames'

const initialState: Omit<AuthState, 'isAuth'> = {
  email: '',
  businessEmail: '',
  password: '',
  contacts: {
    email: '',
    phone: '',
    telegram: '',
    whatsapp: '',
  },
}

export const ContactModal: FC<ModalProps> = ({ onClose, isOpen }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<AuthState>({ defaultValues: initialState })

  const dispatch = useAppDispatch()

  const contacts = getValues('contacts')
  const [activeInput, setActiveInput] =
    useState<keyof AuthState['contacts']>('email')

  const handleActiveInput = (field: keyof AuthState['contacts']) => {
    setActiveInput(field)
  }

  const onSubmit: SubmitHandler<AuthState> = async formData => {
    dispatch(setAuth(formData))
    onClose()
  }

  return (

    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.header}>
        <span className={s.logoExample} />
      </div>

      <div className={s.titles}>
        <div className={s.signUp}>Sign Up</div>
        <div className={s.signIn}>Sign In</div>
      </div>

      <div className={s.wrapperEmails}>
        <div className={s.businessWrapper}>
          <InputLabel labelClassName={s.F} label='Business email address'>
            <Controller
              name='businessEmail'
              control={control}
              rules={{ required: 'Bussines email address is Required' }}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder='integral@ch.com'
                  className={cn(s.input, { [s.error]: errors.businessEmail })}
                  initValue={value}
                  onChange={onChange}
                />
              )}
            />
          </InputLabel>
        </div>

        <div className={s.emailWrapper}>
          <InputLabel labelClassName={s.label} label='Email'>
            <Controller
              name='email'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  disabled
                  className={s.input}
                  initValue={value}
                  onChange={onChange}
                />
              )}
            />
          </InputLabel>
        </div>
        <div className={s.contacts}>
          <div
            className={cn(s.icon, s.iconEmail, {
              [s.active]: contacts.email !== '' || activeInput === 'email',
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
      <div className={s.assents}>
        <div className={s.text}>
          <p className={s.firstDescription}>
            We will automatically create user account and send confirmation to
            your email
          </p>
          <p className={s.secondDescription}>
            If you prefer to be contacted in another way, in addition to
            email, please leave relevant contact details as well
          </p>
        </div>
        <div className={s.password}>
          <InputLabel labelClassName={s.label} label='Password'>
            <Controller
              name='password'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  disabled
                  className={s.input}
                  initValue={value}
                  onChange={onChange}
                />
              )}
            />
          </InputLabel>
        </div>
      </div>
      <div className={s.footer}>
        <Button type='submit' variant={'secondary'} className={s.button}>
          SEND
        </Button>
        <span className={s.subscribe}>
          <Image src={CheckMark} alt='' />
          Subscribe to updates
        </span>
      </div>
    </form>
  )
}
