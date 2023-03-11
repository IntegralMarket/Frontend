import { createSlice } from '@reduxjs/toolkit'

export type ContactModalState = {
  isOpen: boolean
}

const initialState: ContactModalState = {
  isOpen: false,
}

export const contactModalSlice = createSlice({
  name: 'contactModal',
  initialState,
  reducers: {
    openContactModal: () => ({ isOpen: true }),
    closeContactModal: () => ({ isOpen: false }),
  },
})

export const { closeContactModal, openContactModal } = contactModalSlice.actions

export default contactModalSlice.reducer
