import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type CrumbState = {
  nameAsId: string | null
  productNameAsId: string | null
  type: string | null
  method: string | null
}

const initialState = {
  nameAsId: null,
  productNameAsId: null,
  type: null,
  method: null,
}

export const crumbSlice = createSlice({
  name: 'crumbSlice',
  initialState,
  reducers: {
    setCrumbs: (
      state: CrumbState,
      action: PayloadAction<Partial<CrumbState>>
    ) => {
      Object.assign(state, action.payload)
    },
    resetCrumbs: (state: CrumbState) => {
      state = initialState
    },
  },
})

export const { setCrumbs, resetCrumbs } = crumbSlice.actions

export default crumbSlice.reducer
