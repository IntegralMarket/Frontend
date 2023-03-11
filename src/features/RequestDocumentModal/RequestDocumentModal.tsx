import { FC } from 'react'
import Image from 'next/image'
import cn from 'classnames'

import { useForm, Controller, useFieldArray } from 'react-hook-form'

import { Button, Icon, Input, InputLabel, Title } from 'components'
import { AdditionalField } from 'components/AdditionalField'
import Cross from '../../../public/assets/img/cross.svg'

import { useAuth } from 'shared/hooks/useAuth'
import { GradeDetail } from 'shared/types/products'
import { RequestAskDocument } from 'shared/types/requestProduct'
import { postRequestDocumentCreate } from 'shared/api/routes/forms'
import { withDomain } from 'shared/helpers/convertLink'
import { DOCUMENT_INPUT_LIMIT } from 'shared/constants/limit'

import s from './RequestDocumentModal.module.scss'
import { isEvenNumber } from 'shared/helpers/equal'

interface RequestDocumentModal {
  product: GradeDetail
}
export const RequestDocumentModal: FC<RequestDocumentModal> = ({ product }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestAskDocument>({
    defaultValues: {
      documents: [{ document_name: '' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'documents',
  })

  const { submit } = useAuth((form: RequestAskDocument) => {
    postRequestDocumentCreate(form)
  })

  const onSubmit = (formdata: RequestAskDocument) => {
    submit(formdata)
    console.log(formdata)
  }
  if (!product) {
    return null
  }

  return (
    <>
      <Title className={s.title}>ASK FOR DOCUMENT</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.nameWrapper}>
          <span className={s.nameLabel}>Grade</span>
          <div className={s.name}>{product.mark}</div>
        </div>
        <div className={s.documents}>
          <div className={s.fieldsContainer}>
            {fields.map((item, index) => {
              return (
                <InputLabel
                  key={item.id}
                  label="Document's name"
                  labelClassName={s.label}
                  className={s.inputLabel}
                >
                  <Controller
                    name={`documents.${index}`}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        name={`documents.${index}`}
                        initValue={value.document_name}
                        className={s.input}
                        placeholder='Product certificate'
                        onChange={onChange}
                      />
                    )}
                  />
                </InputLabel>
              )
            })}
            {fields.length !== DOCUMENT_INPUT_LIMIT &&
              (isEvenNumber(fields.length) ? (
                <div className={cn(s.withLabel)}>
                  <Button
                    type='button'
                    className={cn(s.addBtn)}
                    onClick={() => append({ document_name: '' })}
                  >
                    <Icon size={20} variant='add' className={s.icon} />
                  </Button>
                  <span>Add a document</span>
                </div>
              ) : (
                <Button
                  type='button'
                  className={cn(s.addBtn, s.shortenAddBtn)}
                  onClick={() => append({ document_name: '' })}
                >
                  <Icon size={20} variant='add' className={s.icon} />
                </Button>
              ))}
          </div>
        </div>
        <Controller
          name='additional_info'
          control={control}
          render={({ field: { onChange, value } }) => (
            <AdditionalField onChange={onChange} value={value} />
          )}
        />
        <div className={s.sendWrapper}>
          <Button type='submit' className={s.sendBtn}>
            Send
          </Button>
          <div className={s.traderWrapper}>
            {product.author && <span className={s.traderName}>to</span>}
            <div className={s.logoWrapper}>
              {product.author && (
                <Image
                  src={withDomain(product.author.logo)}
                  className={s.companyLogo}
                  width='22px'
                  height='22px'
                  alt='logo'
                />
              )}
            </div>
            <span className={s.traderName}>{product.author?.name}</span>
          </div>
        </div>
      </form>
    </>
  )
}
