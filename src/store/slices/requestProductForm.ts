// @ts-nocheck disconected slice from request form as it has too much options. Temporarily obsolete
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DAY_IN_MS } from 'shared/constants'
import { formatDate } from 'shared/helpers/parseDate'

import {
  Incoterms,
  PaymentTypes,
  RequestProduct,
} from 'shared/types/requestProduct'

export type RequestProductFormState = {
  form: RequestProduct
}

const initialState: RequestProductFormState = {
  form: {
    //product_type: null,
    //processing_method: null,
    //mfr: [null, null],
    place_of_delivery: '',
    quantity: '',
    incoterms: [Incoterms.CFR],
    terms_of_payment: [PaymentTypes.onlinePayment],
    delivery_period: [
      formatDate(new Date()),
      formatDate(new Date(Date.now() + 8 * 7 * DAY_IN_MS)),
    ],
    addition_information: '',
    preferred_grades: '',
    main_types: [],
    //upload_document: null,
  },
}

export const requestForm = createSlice({
  name: 'RequestProduct',
  initialState,
  reducers: {
    updateForm: (
      state: RequestProductFormState,
      action: PayloadAction<RequestProduct>
    ) => {
      state.form = action.payload
    },
    resetForm: (state: RequestProductFormState) => {
      state.form = initialState.form
    },
  },
})

export const { updateForm, resetForm } = requestForm.actions

export default requestForm.reducer
