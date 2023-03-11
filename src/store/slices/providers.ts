import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Provider } from 'shared/types/providers'

export type ProvidersState = {
  providers: Provider[]
  idList: number[]
}

const initialState: ProvidersState = {
  providers: [],
  idList: [],
}

export const provider = createSlice({
  name: 'providers',
  initialState,
  reducers: {
    setProvidersStore: (
      state: ProvidersState,
      action: PayloadAction<Provider[]>
    ) => {
      const newPayload = action.payload.filter(
        item => !state.idList.includes(item.id)
      )
      const newPayloadIdList = newPayload.map(item => item.id)

      state.providers = state.providers.concat(newPayload)
      state.idList = state.idList.concat(newPayloadIdList)
    },
  },
})

export const { setProvidersStore } = provider.actions

export default provider.reducer
