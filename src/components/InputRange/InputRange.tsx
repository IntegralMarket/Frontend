import { ChangeEvent, FC, useState } from 'react'
import cn from 'classnames'

import { MFR, Error } from 'shared/types'

import s from './InputRange.module.scss'

export type InputRangeProps = {
  min: number
  max: number
  onChange: ([valueStart, valueEnd]: MFR) => void
  id?: string
  values?: MFR
  className?: string
  error?: Error
  ref?: HTMLInputElement | null
}

export const InputRange: FC<InputRangeProps> = ({
  min,
  max,
  values = [null, null],
  id,
  className = '',
  error,
  onChange,
}) => {
  const [state, setState] = useState<{
    startVal?: number | null
    endVal?: number | null
  }>({
    startVal: values[0],
    endVal: values[1],
  })

  const [errorStart, setStartError] = useState<boolean>(false)
  const [errorEnd, setEndError] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string>('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name: string = e.target.name

    const value: string = e.target.value
      .replace(',', '.')
      .replace(/([^0-9.]+)/, '')
      .replace(/^\./, '0.')

    if (!value || value.match(/^\d{1,}(.\d{0,})?$/)) {
      setState({ ...state, [name]: value })
    }
  }

  const validateOnBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const name: string = e.target.name
    const validState: {
      startVal: number | null
      endVal: number | null
    } = {
      startVal: state.startVal ? Number(state.startVal) : null,
      endVal: state.endVal ? Number(state.endVal) : null,
    }

    switch (name) {
      case 'startVal':
        if (
          (validState.startVal && validState.startVal < min) ||
          (validState.startVal && validState.startVal > max)
        ) {
          setStartError(true)
          setErrorMsg(`Please enter values between ${min} and ${max}`)
          return
        } else if (
          validState.startVal &&
          validState.endVal &&
          validState.startVal > validState.endVal
        ) {
          setStartError(true)
          setErrorMsg('Minimum value cannot exceed the maximum value')
          return
        }

      case 'endVal':
        if (
          (validState.endVal && validState.endVal < min) ||
          (validState.endVal && validState.endVal > max)
        ) {
          setEndError(true)
          setErrorMsg(`Please enter values between ${min} and ${max}`)
          return
        } else if (
          validState.startVal &&
          validState.endVal &&
          validState.startVal > validState.endVal
        ) {
          setEndError(true)
          setErrorMsg('Minimum value cannot exceed the maximum value')
          return
        }
    }
    setState(validState)
    setStartError(false)
    setEndError(false)
    setErrorMsg('')
    onChange?.([validState.startVal, validState.endVal])
  }

  const containerClass = cn(s.container, className)
  const inputStartClass = cn(s.input, { [s.error]: errorStart || error })
  const inputEndClass = cn(s.input, { [s.error]: errorEnd || error })

  return (
    <div className={containerClass} id={id}>
      <div className={s.inputWrapper}>
        <input
          name='startVal'
          className={inputStartClass}
          type='text'
          value={state.startVal?.toString() ?? ''}
          onChange={handleChange}
          placeholder='from'
          onBlur={validateOnBlur}
        />
        <div className={s.divider} />
        <input
          name='endVal'
          className={inputEndClass}
          type='text'
          value={state.endVal?.toString() ?? ''}
          onChange={handleChange}
          placeholder='to'
          onBlur={validateOnBlur}
        />
      </div>
      {errorMsg && <span>{errorMsg}</span>}
    </div>
  )
}
