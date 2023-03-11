import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Producer } from 'shared/types/producers'

export type ProducersState = {
  producers: Producer[]
  idList: number[]
}

const initialState: ProducersState = {
  producers: [],
  idList: [],
}

export const producer = createSlice({
  name: 'producers',
  initialState,
  reducers: {
    setProducersStore: (
      state: ProducersState,
      action: PayloadAction<Producer[]>
    ) => {
      const newPayload = action.payload.filter(
        item => !state.idList.includes(item.id)
      )
      const newPayloadIdList = newPayload.map(item => item.id)

      state.producers = state.producers.concat(newPayload)
      state.idList = state.idList.concat(newPayloadIdList)
    },
  },
})

export const { setProducersStore } = producer.actions

export default producer.reducer
