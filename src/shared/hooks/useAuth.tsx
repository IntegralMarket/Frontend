import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from './redux'
import { openContactModal } from 'store/slices/contactModal'

export const useAuth = <T extends object>(sendRequest: (form: T) => void) => {
  const dispatch = useAppDispatch()
  const { isAuth, ...other } = useAppSelector(state => state.auth)

  const [form, setForm] = useState<T | null>(null)

  const submit = (data: T) => {
    setForm(data)
  }

  useEffect(() => {
    isAuth && form && sendRequest({ ...form, ...other })
  }, [isAuth, form])

  useEffect(() => {
    !isAuth && form && dispatch(openContactModal())
  }, [form, isAuth])

  return { submit }
}
