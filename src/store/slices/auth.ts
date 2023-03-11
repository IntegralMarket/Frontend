import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Contacts } from 'shared/types/requestProduct'

export type AuthState = {
  email: string
  businessEmail: string
  password: string
  contacts: Contacts
  isAuth: boolean
}

const initialState: AuthState = {
  email: '',
  businessEmail: '',
  password: '',
  isAuth: false,
  contacts: {
    email: '',
    phone: '',
    telegram: '',
    whatsapp: '',
  },
}

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      return { ...action.payload, isAuth: true }
    },
  },
})

export const { setAuth } = authSlice.actions

export default authSlice.reducer
