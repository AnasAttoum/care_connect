import { configureStore } from '@reduxjs/toolkit'
import departmentSlice from './slices/departmentSlice'

export const store = configureStore({
  reducer: {
    department: departmentSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch