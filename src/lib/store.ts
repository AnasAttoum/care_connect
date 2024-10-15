import { configureStore } from '@reduxjs/toolkit'

import departmentSlice from './slices/departmentSlice'
import roomSlice  from './slices/roomSlice'

export const store = configureStore({
  reducer: {
    department: departmentSlice,
    room: roomSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch