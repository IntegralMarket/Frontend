import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'

import tradersReducer from './slices/traders'
import producersReducer from './slices/producers'
import providersReducer from './slices/providers'
import categoriesReducer from './slices/categories'
import requestProductFormReducer from './slices/requestProductForm'
import crumbsReducer from './slices/crumbSlice'
import compareReducer from './slices/compare'
import authReducer from './slices/auth'
import contactModalReducer from './slices/contactModal'
import buyersReducer from './slices/buyers'
import selectedOffer from './slices/selectedOffer'
import sendOffer from './slices/sendOffer'
import askQuote from './slices/askForQuote'

export const store = configureStore({
  reducer: {
    traders: tradersReducer,
    producers: producersReducer,
    providers: providersReducer,
    categories: categoriesReducer,
    requestForm: requestProductFormReducer,
    crumbs: crumbsReducer,
    auth: authReducer,
    contactModal: contactModalReducer,
    compare: compareReducer,
    buyers: buyersReducer,
    selectedOffer: selectedOffer,
    sendOffer: sendOffer,
    askQuote: askQuote
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
