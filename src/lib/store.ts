import { configureStore } from '@reduxjs/toolkit'

import departmentSlice from './slices/departmentSlice'
import roomSlice from './slices/roomSlice'
import serviceSlice from './slices/serviceSlice'
import doctorSlice from './slices/doctorSlice'

export const store = configureStore({
  reducer: {
    department: departmentSlice,
    room: roomSlice,
    service: serviceSlice,
    doctor: doctorSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch