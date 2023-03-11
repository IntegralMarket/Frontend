import { FC, useState } from 'react'

import { Button, Input, InputLabel } from 'components'
import s from './AdditionalField.module.scss'
import { Icon } from 'components/Icon'

interface AdditionaFieldProps {
  onChange: () => void
  value: string
}

export const AdditionalField: FC<AdditionaFieldProps> = ({
  onChange,
  value,
}) => {
  const [isActive, setIsActive] = useState(false)

  const handleAdd = () => {
    setIsActive(true)
  }
  const handleDelete = () => {
    setIsActive(false)
  }

  return (
    <>
      {!isActive ? (
        <div className={s.addInfo} onClick={handleAdd}>
          <Button type='button' className={s.addBtn}>
            <Icon size={20} variant='add' className={s.icon} />
          </Button>
          <span>Add additional info</span>
        </div>
      ) : (
        <div className={s.inputWrapper}>
          <InputLabel label='Additional info' labelClassName={s.label}>
            <Input
              name='detail'
              className={s.input}
              initValue={value}
              onChange={onChange}
              placeholder='Detail specification'
            />
          </InputLabel>
          <div className={s.deleteBasket} onClick={handleDelete}>
            <Button type='button' className={s.deleteBtn}>
              <Icon size={20} variant='trash' className={s.icon} />
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
