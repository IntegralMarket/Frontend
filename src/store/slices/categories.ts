import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CategoryDetail } from 'shared/types/categories'

export type CategoriesState = {
  categories: CategoryDetail | null
}

const initialState: CategoriesState = {
  categories: null,
}

export const categories = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (
      state: CategoriesState,
      action: PayloadAction<CategoryDetail>
    ) => {
      state.categories = action.payload
    },
  },
})

export const { setCategories } = categories.actions

export default categories.reducer
