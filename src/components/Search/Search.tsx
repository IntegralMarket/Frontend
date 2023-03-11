import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'

import Image from 'next/image'
import { Icon, Input, Modal } from 'components'

import { parseProductQuery, prepareQuery } from 'shared/helpers/parseQuery'

import img from '/public/assets/img/search-normal.svg'

import s from './Search.module.scss'

interface SearchProps {
  isOpen: boolean
  onClose: () => void
  className?: string
}

type SearchForm = { name: string }

export const Search: FC<SearchProps> = ({ onClose, isOpen }) => {
  const router = useRouter()

  const {
    control,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<SearchForm>({
    defaultValues: { name: '' },
  })

  const onSubmit: SubmitHandler<SearchForm> = ({ name }) => {
    const newQuery = {
      ...parseProductQuery(router.query),
      name,
    }

    router.push(prepareQuery('/polymers', {}, newQuery))
    resetField('name')
    onClose()
  }

  useEffect(() => {
    return () => {
      resetField('name')
    }
  }, [router.pathname])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      topAligned
      contentClassName={s.modalContent}
    >
      <div className={s.searchTop}>
        <span className={s.text}>Search in Polymers</span>
        <span className={s.cross} onClick={onClose}>
          <Icon variant='cross' />
        </span>
      </div>

      <form className={s.searchBottom} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.searchImg}>
          <Image src={img} alt='' />
        </div>

        <div className={s.searchSelect}>
          <span>Polymers</span>
          <span className={s.arrow}>
            <Icon variant='arrow-right' />
          </span>
        </div>

        <Controller
          name='name'
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              autoFocus={true}
              className={s.searchInput}
              placeholder='Search in Polymers'
              initValue={value}
              onChange={onChange}
            />
          )}
        />
      </form>
    </Modal>
  )
}
